import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import Header from "../header";
import * as authStore from "../../../store/authStore";
import * as useSubjectsHook from "../../../hooks/useSubjects";
import * as useAdminHook from "../../../hooks/useAdmin";

// Mock the hooks
vi.mock("../../../store/authStore");
vi.mock("../../../hooks/useSubjects");
vi.mock("../../../hooks/useAdmin");
vi.mock("../../../lib/analytics", () => ({
  trackSignOut: vi.fn()
}));

const mockSubjects = [
  {
    id: "math",
    label: "Maths",
    description: "Mathematics lessons",
    route: "/maths",
    pageBackground: "#FFF9E6"
  },
  {
    id: "hindi",
    label: "Hindi",
    description: "Hindi lessons",
    route: "/hindi",
    pageBackground: "#F0F0F0"
  }
];

const mockUser = {
  uid: "123",
  displayName: "John Doe",
  email: "john@example.com",
  photoURL: null
};

const renderHeader = () => {
  return render(
    <BrowserRouter>
      <Header />
    </BrowserRouter>
  );
};

describe("Header Component", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    (useSubjectsHook.useSubjects as any).mockReturnValue({
      subjects: mockSubjects
    });
    (useAdminHook.useAdmin as any).mockReturnValue({
      isAdmin: false
    });
  });

  it("should render the header menu button", () => {
    (authStore.useAuthStore as any).mockReturnValue({
      user: null
    });

    renderHeader();
    const menuButton = screen.getAllByRole("button")[0]; // First button is the menu
    expect(menuButton).toBeInTheDocument();
  });

  //   it("should show greeting based on current time", () => {
  //     (authStore.useAuthStore as any).mockReturnValue({
  //       user: null
  //     });

  //     const hour = new Date().getHours();
  //     let expectedGreeting = "";

  //     if (hour >= 5 && hour < 12) {
  //       expectedGreeting = "Good morning";
  //     } else if (hour >= 12 && hour < 17) {
  //       expectedGreeting = "Good afternoon";
  //     } else {
  //       expectedGreeting = "Good evening";
  //     }

  //     renderHeader();
  //     const greetingText = screen.getByText(new RegExp(expectedGreeting, "i"));
  //     expect(greetingText).toBeInTheDocument();
  //   });

  it("should display user name when logged in", () => {
    (authStore.useAuthStore as any).mockReturnValue({
      user: mockUser
    });

    renderHeader();
    // Look for the user display name in the drawer specifically
    const userFullName = screen.getByText("John Doe");
    expect(userFullName).toBeInTheDocument();
  });

  it("should toggle drawer on menu button click", async () => {
    (authStore.useAuthStore as any).mockReturnValue({
      user: null
    });

    renderHeader();
    const menuButton = screen.getAllByRole("button")[0];

    fireEvent.click(menuButton);

    // Drawer should be open - look for Home link in drawer
    await waitFor(() => {
      expect(screen.getByText("Home")).toBeInTheDocument();
    });
  });

  it("should render default header description when not on subject page", () => {
    (authStore.useAuthStore as any).mockReturnValue({
      user: null
    });

    renderHeader();
    expect(screen.getByText("What shall we learn today?")).toBeInTheDocument();
  });

  it("should render sign in link when user is not logged in", () => {
    (authStore.useAuthStore as any).mockReturnValue({
      user: null
    });

    renderHeader();
    const signInButtons = screen.getAllByText(/Sign In/i);
    expect(signInButtons.length).toBeGreaterThan(0);
  });

  it("should render user avatar when logged in", () => {
    (authStore.useAuthStore as any).mockReturnValue({
      user: mockUser
    });

    renderHeader();
    const avatar = screen.getByText("JD"); // Should show initials
    expect(avatar).toBeInTheDocument();
  });

  it("should render admin dashboard link for admin users", async () => {
    (authStore.useAuthStore as any).mockReturnValue({
      user: mockUser
    });
    (useAdminHook.useAdmin as any).mockReturnValue({
      isAdmin: true
    });

    renderHeader();
    const menuButton = screen.getAllByRole("button")[0];

    fireEvent.click(menuButton);

    await waitFor(() => {
      expect(screen.getByText("Admin Dashboard")).toBeInTheDocument();
    });
  });

  it("should not render admin dashboard link for non-admin users", async () => {
    (authStore.useAuthStore as any).mockReturnValue({
      user: mockUser
    });
    (useAdminHook.useAdmin as any).mockReturnValue({
      isAdmin: false
    });

    renderHeader();
    const menuButton = screen.getAllByRole("button")[0];

    fireEvent.click(menuButton);

    await waitFor(() => {
      expect(screen.queryByText("Admin Dashboard")).not.toBeInTheDocument();
    });
  });

  it("should render all subjects in drawer", async () => {
    (authStore.useAuthStore as any).mockReturnValue({
      user: null
    });

    renderHeader();
    const menuButton = screen.getAllByRole("button")[0];

    fireEvent.click(menuButton);

    await waitFor(() => {
      expect(screen.getByText("Maths")).toBeInTheDocument();
      expect(screen.getByText("Hindi")).toBeInTheDocument();
    });
  });
});
