import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import AdminLayout from "../adminLayout";
import * as authStore from "../../../store/authStore";
import * as useAdminHook from "../../../hooks/useAdmin";

// Mock the hooks
vi.mock("../../../store/authStore");
vi.mock("../../../hooks/useAdmin");
vi.mock("../../../lib/analytics", () => ({
  trackSignOut: vi.fn()
}));

const mockUser = {
  uid: "123",
  displayName: "Admin User",
  email: "admin@example.com"
};

const renderAdminLayout = (props = {}) => {
  return render(
    <BrowserRouter>
      <AdminLayout {...props}>
        <div>Test Content</div>
      </AdminLayout>
    </BrowserRouter>
  );
};

describe("AdminLayout Component", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    (authStore.useAuthStore as any).mockReturnValue({
      user: mockUser
    });
  });

  it("should return null when user is not admin", () => {
    (useAdminHook.useAdmin as any).mockReturnValue({
      isAdmin: false
    });

    const { container } = renderAdminLayout();
    expect(container.firstChild).toBeNull();
  });

  it("should render layout when user is admin", () => {
    (useAdminHook.useAdmin as any).mockReturnValue({
      isAdmin: true
    });

    renderAdminLayout();
    expect(screen.getByText("Test Content")).toBeInTheDocument();
  });

  it('should render default title "Admin Panel"', () => {
    (useAdminHook.useAdmin as any).mockReturnValue({
      isAdmin: true
    });

    renderAdminLayout();
    expect(screen.getByText("Admin Panel")).toBeInTheDocument();
  });

  it("should render custom title when provided", () => {
    (useAdminHook.useAdmin as any).mockReturnValue({
      isAdmin: true
    });

    renderAdminLayout({ title: "Dashboard" });
    expect(screen.getByText("Dashboard")).toBeInTheDocument();
  });

  it("should render subtitle when provided", () => {
    (useAdminHook.useAdmin as any).mockReturnValue({
      isAdmin: true
    });

    renderAdminLayout({ subtitle: "Manage questions" });
    expect(screen.getByText("Manage questions")).toBeInTheDocument();
  });

  it("should render user info", () => {
    (useAdminHook.useAdmin as any).mockReturnValue({
      isAdmin: true
    });

    renderAdminLayout();
    expect(screen.getByText("Admin User")).toBeInTheDocument();
    expect(screen.getByText("Admin")).toBeInTheDocument();
  });

  it("should render back button", () => {
    (useAdminHook.useAdmin as any).mockReturnValue({
      isAdmin: true
    });

    renderAdminLayout();
    const backButton = screen.getByTitle("Go back");
    expect(backButton).toBeInTheDocument();
  });

  it("should render sign out button", () => {
    (useAdminHook.useAdmin as any).mockReturnValue({
      isAdmin: true
    });

    renderAdminLayout();
    const signOutButton = screen.getByText(/Sign Out/i);
    expect(signOutButton).toBeInTheDocument();
  });

  it("should render children content", () => {
    (useAdminHook.useAdmin as any).mockReturnValue({
      isAdmin: true
    });

    renderAdminLayout();
    expect(screen.getByText("Test Content")).toBeInTheDocument();
  });

  it("should have proper layout structure", () => {
    (useAdminHook.useAdmin as any).mockReturnValue({
      isAdmin: true
    });

    const { container } = renderAdminLayout();
    const mainContent = container.querySelector("main");
    expect(mainContent).toBeInTheDocument();
    expect(mainContent?.textContent).toContain("Test Content");
  });

  it("should display user email when display name is not available", () => {
    (useAdminHook.useAdmin as any).mockReturnValue({
      isAdmin: true
    });
    (authStore.useAuthStore as any).mockReturnValue({
      user: {
        uid: "123",
        displayName: null,
        email: "admin@example.com"
      }
    });

    renderAdminLayout();
    expect(screen.getByText("admin@example.com")).toBeInTheDocument();
  });
});
