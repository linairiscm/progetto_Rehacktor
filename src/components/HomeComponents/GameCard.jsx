
import { Link } from "react-router";

export default function GameCard({ game }) {
  return (
    <>
      <div className="group h-[220px] md:h-[240px] relative rounded-2xl overflow-hidden bg-gamer-card shadow-lg">
        <Link to={`/detail/${game.id}`} className="block w-full h-full">
          <img
            src={game.background_image}
            className="w-full h-full object-cover brightness-75 group-hover:brightness-100 group-hover:scale-110 transition-all duration-300"
            alt={game.name}
          />

          <div className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-black/95 to-transparent pt-10 pb-4 px-3">
            <p className="text-center text-white font-roboto font-bold text-base md:text-lg">
              {game.name}
            </p>
          </div>
        </Link>
      </div>
    </>
  );
}
