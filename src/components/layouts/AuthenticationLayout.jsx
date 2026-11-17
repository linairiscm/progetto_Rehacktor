
import { Outlet } from "react-router";
import Navbar from "../LayoutComponents/Navbar";
import Footer from "../LayoutComponents/Footer";

export default function AuthenticationLayout() {
  return (
    <div className="min-h-screen flex flex-col bg-gamer-black">
      <Navbar />

      <main className="flex-1">
        <Outlet />
      </main>

      <Footer />
    </div>
  );
}
