
import { FaDiscord, FaInstagram, FaGithub } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";

export default function Footer() {
  return (
    <footer className="footer footer-center bg-gamer-black text-white border-t border-gamer-purple/30 px-4 py-10">
      <div className="flex flex-col items-center gap-4">
        <h2 className="font-electro text-2xl font-bold text-white">
          Reactor
        </h2>

        <p className="text-gray-400 text-sm text-center">
          Discover games, save your favourites and share your reviews.
        </p>

        <div className="flex items-center justify-center gap-6 text-2xl text-gamer-pink mt-3">
          <FaDiscord aria-label="Discord" />
          <FaInstagram aria-label="Instagram" />
          <FaGithub aria-label="GitHub" />
          <FaXTwitter aria-label="X" />
        </div>

        <div className="w-full border-t border-gamer-purple/20 mt-4 pt-5">
          <p className="text-gray-500 text-xs text-center">
            © 2026 Reactor. Copyright.
          </p>
        </div>
      </div>
    </footer>
  );
}
