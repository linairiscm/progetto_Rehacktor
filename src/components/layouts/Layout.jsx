
import { Outlet, useLoaderData } from "react-router";
import Navbar from "../LayoutComponents/Navbar";
import Footer from "../LayoutComponents/Footer";
import Sidebar from "../LayoutComponents/Sidebar";

export default function Layout() {
  const genres = useLoaderData();

  return (
    <>
      <Navbar />

      <section className="grid grid-cols-1 lg:grid-cols-7 gap-4 min-h-screen bg-gamer-black">
        <div className="lg:col-span-1">
          <Sidebar genres={genres} />
        </div>

        <div className="lg:col-span-6 min-w-0 px-3 md:px-5">
          <Outlet />
        </div>
      </section>

      <Footer />
    </>
  );
}
