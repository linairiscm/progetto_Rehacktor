
import GameCard from "./GameCard";

export default function GameList({ children }) {
  return (
    <>
      <main className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-5 px-2 md:px-5">
        {children}
      </main>
    </>
  );
}

GameList.Card = GameCard;
