
import { useLoaderData, useParams } from "react-router";
import GameList from "../components/HomeComponents/Gamelist";

export default function GenrePage() {
  const games = useLoaderData();
  const { slug } = useParams();

  return (
    <>
      <div className="py-8">
        <h1 className="font-electro text-center text-3xl md:text-4xl font-bold text-white mb-3">
          Explore by Genre
        </h1>

        <p className="text-center text-gray-400 mb-8 font-roboto">
          Selected genre:
          <span className="text-gamer-pink font-bold ml-2">
            {slug}
          </span>
        </p>

        <GameList>
          {games.map((game) => {
            return (
              <GameList.Card key={game.id} game={game} />
            );
          })}
        </GameList>
      </div>
    </>
  );
}
