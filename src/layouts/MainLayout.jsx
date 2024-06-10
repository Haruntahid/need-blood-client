import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

function MainLayout() {
  return (
    <>
      <Navbar />
      <div className="container mx-auto min-h-[calc(100vh-458px)]">
        <Outlet />
      </div>
      <Footer />
    </>
  );
}

export default MainLayout;
