import Header from "./common/Header";

// Container component that serves as a wrapper with default styling
const Container: React.FC = () => {
  return (
    <>
      <Header />

      <div className="container mx-auto bg-background p-4 text-text min-h-screen">
        This is the Container component.
      </div>
    </>
  );
};

export default Container;
