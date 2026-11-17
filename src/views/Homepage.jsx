
import { useLoaderData } from "react-router";
import GameList from "../components/HomeComponents/Gamelist";

export default function Homepage() {
  const games = useLoaderData();

  return (
    <>
      <div className="py-8">
        <h1 className="font-electro text-3xl md:text-4xl text-center font-bold text-white mb-3">
          Reactor
        </h1>

        <p className="text-center text-gray-400 mb-8 font-roboto">
          Discover your next gaming adventure
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
