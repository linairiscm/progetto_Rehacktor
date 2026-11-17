
import { Link } from "react-router";
import { useState } from "react";
import { FaBars, FaTimes } from "react-icons/fa";

export default function Sidebar({ genres }) {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <nav className="bg-gamer-black border-b lg:border-b-0 lg:border-r border-gamer-purple/30 p-4 lg:p-5 lg:min-h-full">

        <button
          className="lg:hidden flex items-center gap-3 text-gamer-pink font-electro text-xl font-bold cursor-pointer"
          onClick={toggleMenu}
        >
          {isOpen ? <FaTimes /> : <FaBars />}
          Genres
        </button>

        <h2 className="hidden lg:block font-electro text-gamer-pink text-xl font-bold mb-5">
          Genres
        </h2>

        <ul
          className={`${
            isOpen ? "flex" : "hidden"
          } lg:flex flex-col gap-1 mt-4 lg:mt-0`}
        >
          {genres.map((genre) => {
            return (
              <li key={genre.id}>
                <Link
                  to={`/genre/${genre.slug}`}
                  onClick={() => setIsOpen(false)}
                  className="block text-gray-300 hover:text-gamer-pink hover:bg-gamer-card rounded-lg px-3 py-2 transition-colors"
                >
                  {genre.name}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </>
  );
}
