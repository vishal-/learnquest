import Header from "./common/Header";

// Container component that serves as a wrapper with default styling
const Container: React.FC = () => {
  return (
    <div className="container mx-auto bg-background text-text min-h-screen">
      <Header />
      This is the Container component.
    </div>
  );
};

export default Container;
