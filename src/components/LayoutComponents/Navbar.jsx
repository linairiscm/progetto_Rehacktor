
import { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router";
import { FaSearch } from "react-icons/fa";
import routes from "../../router/routes";
import { UserContext } from "../../context/UserContext";
import supabase from "../../database/supabase";
import defaultAvatar from "../../assets/default-avatar.jpg";

export default function Navbar() {
  const [slug, setSlug] = useState("");
  const [avatarUrl, setAvatarUrl] = useState();
  const [isOpen, setIsOpen] = useState(false);

  const handleChange = (e) => {
    setSlug(e.target.value);
  };

  const navigate = useNavigate();

  const { user, profile, signOut } = useContext(UserContext);

  const handleLogout = async () => {
    setIsOpen(false);
    await navigate("/");
    signOut();
  };

  const download_avatar = async () => {
    if (profile && profile.avatar_url) {
      const { data, error } = await supabase.storage
        .from("avatars")
        .download(profile.avatar_url);

      if (data) {
        const url = URL.createObjectURL(data);
        setAvatarUrl(url);
      }
    } else {
      setAvatarUrl(null);
    }
  };

  useEffect(() => {
    download_avatar();
  }, [profile]);

  return (
    <nav className="navbar bg-gamer-black border-b border-gamer-purple/30 px-4 md:px-8 py-4 flex flex-wrap justify-between gap-4">
      <Link
        to={routes.home}
        className="font-electro text-white text-2xl font-bold"
      >
        Reactor
      </Link>

      <div className="flex items-center gap-2 order-3 w-full md:order-2 md:w-auto">
        <input
          type="text"
          placeholder="Search games..."
          className="input bg-gamer-card border border-gamer-purple/40 text-white placeholder:text-gray-400 rounded-full w-full md:w-72 focus:outline-gamer-purple"
          onChange={handleChange}
        />

        <Link
          className="btn bg-gamer-purple hover:bg-gamer-pink text-white hover:text-gamer-black border-0 rounded-full"
          to={`/search/${slug}`}
        >
          <FaSearch />
        </Link>
      </div>

      <div className="flex items-center order-2 md:order-3">
        {!user ? (
          <ul className="flex items-center gap-3">
            <li>
              <Link
                to={routes.register}
                className="text-white hover:text-gamer-pink font-medium"
              >
                Register
              </Link>
            </li>

            <li>
              <Link
                to={routes.login}
                className="btn bg-gamer-purple hover:bg-gamer-pink text-white hover:text-gamer-black border-0 rounded-full px-6"
              >
                Login
              </Link>
            </li>
          </ul>
        ) : (
          <div className="relative">
            <button
              type="button"
              onClick={() => setIsOpen(!isOpen)}
              className="cursor-pointer"
              aria-label="Open profile menu"
              aria-expanded={isOpen}
            >
              <img
                src={avatarUrl ?? defaultAvatar}
                alt="Profile avatar"
                className="w-12 h-12 rounded-full object-cover border-2 border-gamer-purple hover:border-gamer-pink transition-colors"
              />
            </button>

            {isOpen && (
              <ul className="absolute right-0 top-full mt-2 w-44 bg-gamer-card border border-gamer-purple/30 rounded-xl shadow-xl p-2 z-50">
                <li>
                  <Link
                    to={routes.profile}
                    onClick={() => setIsOpen(false)}
                    className="block px-4 py-3 text-white hover:text-gamer-pink hover:bg-gamer-black rounded-lg"
                  >
                    Profile
                  </Link>
                </li>

                <li>
                  <button
                    type="button"
                    onClick={handleLogout}
                    className="block w-full text-left px-4 py-3 text-white hover:text-gamer-pink hover:bg-gamer-black rounded-lg cursor-pointer"
                  >
                    Logout
                  </button>
                </li>
              </ul>
            )}
          </div>
        )}
      </div>
    </nav>
  );
}
