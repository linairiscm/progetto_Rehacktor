
import { FaHeart, FaRegHeart } from "react-icons/fa6";
import { useEffect, useState } from "react";
import supabase from "../../database/supabase";

export default function BodySection({ game, profile_id }) {
  const [isFavourite, setIsFavourite] = useState(false);

  const [description, setDescription] = useState("");
  const [gameReviews, setGameReviews] = useState([]);
  const [checkReview, setCheckReview] = useState(false);

  const handle_description = (e) => {
    setDescription(e.target.value);
  };

  const get_reviews = async () => {
    let { data: reviews, error } = await supabase
      .from("reviews")
      .select()
      .eq("game_id", game.id);

    setGameReviews(reviews);
  };

  const add_review = async () => {
    const { data, error } = await supabase
      .from("reviews")
      .insert({
        profile_id,
        game_id: game.id,
        game_name: game.name,
        description,
      })
      .select();

    if (!error) {
      setDescription("");
      setCheckReview(!checkReview);
    }
  };

  const get_favourite = async () => {
    let { data: favourites, error } = await supabase
      .from("favourites")
      .select()
      .eq("profile_id", profile_id)
      .eq("game_id", game.id);

    if (favourites && favourites.length > 0) {
      setIsFavourite(true);
    }
  };

  useEffect(() => {
    get_favourite();
    get_reviews();
  }, [checkReview]);

  const add_game = async () => {
    const { data, error } = await supabase
      .from("favourites")
      .insert({
        profile_id,
        game_id: game.id,
        game_name: game.name,
      })
      .select();

    if (!error) {
      setIsFavourite(true);
    }
  };

  const remove_game = async () => {
    const { data, error } = await supabase
      .from("favourites")
      .delete()
      .eq("profile_id", profile_id)
      .eq("game_id", game.id)
      .select();

    if (!error && data?.length > 0) {
      setIsFavourite(false);
    }
  };

  return (
    <section className="max-w-6xl mx-auto mt-8 px-4 md:px-8">
      <div className="bg-gamer-card/50 backdrop-blur-sm rounded-2xl p-5 md:p-8 shadow-xl">
        <div className="flex items-center justify-between gap-4 mb-6">
          <h2 className="font-electro text-2xl font-bold text-gamer-pink">
            Reviews
          </h2>

          <div className="flex items-center gap-3">
            <span className="text-white text-sm">
              Favourite
            </span>

            {(!isFavourite && (
              <FaRegHeart
                className="text-gamer-pink cursor-pointer text-3xl hover:text-gamer-purple transition-colors"
                onClick={add_game}
              />
            )) || (
              <FaHeart
                className="text-gamer-pink cursor-pointer text-3xl hover:text-gamer-purple transition-colors"
                onClick={remove_game}
              />
            )}
          </div>
        </div>

        <textarea
          className="textarea w-full min-h-[110px] mb-4 bg-gamer-black/70 text-white placeholder:text-gray-300 border border-white/30 rounded-xl focus:outline-gamer-purple"
          placeholder="Type your review"
          onChange={handle_description}
          value={description}
        ></textarea>

        <button
          className="btn w-full sm:w-auto sm:px-10 mb-6 bg-gamer-purple hover:bg-gamer-pink text-white hover:text-gamer-black border-0 rounded-lg"
          onClick={add_review}
        >
          Review
        </button>

        <div className="bg-gamer-black/40 rounded-xl p-4 min-h-[200px] max-h-[350px] overflow-auto">
          {gameReviews &&
            gameReviews.map((review) => {
              return (
                <p
                  key={review.id}
                  className="text-white bg-gamer-card/50 rounded-lg my-3 p-4 break-words"
                >
                  {review.description}
                </p>
              );
            })}
        </div>
      </div>
    </section>
  );
}
