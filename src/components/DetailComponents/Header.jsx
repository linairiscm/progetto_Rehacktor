
export default function Header({ game }) {
  return (
    <header className="pt-10 px-4 md:px-8 text-white">
      <h1 className="text-center text-3xl md:text-5xl font-electro mb-5 font-bold text-white drop-shadow-lg">
        {game.name}
      </h1>

      <div className="flex justify-center">
        <h2 className="text-center text-base md:text-xl font-electro text-white bg-black/70 rounded-full px-6 py-3">
          Released on:{" "}
          <span className="font-bold text-gamer-pink">
            {game.released}
          </span>
        </h2>
      </div>

      <section className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-10 max-w-6xl mx-auto">
        <article className="lg:col-span-2 bg-gamer-card/50 backdrop-blur-sm rounded-2xl p-6 md:p-8 shadow-xl">
          <h3 className="font-electro text-xl font-bold text-gamer-pink mb-5">
            About the Game
          </h3>

          <p className="text-gray-200 leading-7 whitespace-pre-line">
            {game.description_raw}
          </p>
        </article>

        <article className="bg-gamer-card/50 backdrop-blur-sm rounded-2xl p-6 md:p-8 shadow-xl">
          <h3 className="font-electro text-xl font-bold text-gamer-pink mb-6">
            Game Info
          </h3>

          <p className="text-lg mb-6">
            <span className="font-bold text-white">
              Rating:
            </span>{" "}
            <span className="text-gamer-pink font-bold">
              {game.rating}
            </span>
          </p>

          <p className="text-lg font-bold text-white mb-3">
            Genres:
          </p>

          <ul className="flex flex-wrap gap-2">
            {game.genres.map((genre) => {
              return (
                <li
                  className="bg-gamer-black/60 text-gray-200 rounded-full px-4 py-2 text-sm"
                  key={genre.id}
                >
                  {genre.name}
                </li>
              );
            })}
          </ul>
        </article>
      </section>
    </header>
  );
}
