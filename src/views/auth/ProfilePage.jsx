
import { useContext, useEffect, useState } from "react";
import defaultAvatar from "../../assets/default-avatar.jpg";
import { UserContext } from "../../context/UserContext";
import { Link } from "react-router";
import routes from "../../router/routes";
import supabase from "../../database/supabase";

export default function ProfilePage() {
  const { user, profile } = useContext(UserContext);

  const [avatarUrl, setAvatarUrl] = useState();
  const [userFavourites, setUserFavourites] = useState();

  const download_avatar = async () => {
    if (profile && profile.avatar_url) {
      const { data, error } = await supabase.storage
        .from("avatars")
        .download(profile.avatar_url);

      if (data) {
        const url = URL.createObjectURL(data);
        setAvatarUrl(url);
      }
    }
  };

  const get_favourites = async () => {
    if (profile) {
      let { data: favourites, error } = await supabase
        .from("favourites")
        .select()
        .eq("profile_id", profile.id);

      if (favourites) {
        const gamesWithImages = [];

        for (const game of favourites) {
          let background_image = null;

          try {
            const promise = await fetch(
              `https://api.rawg.io/api/games/${game.game_id}?key=${import.meta.env.VITE_API_KEY}`
            );

            if (promise.ok) {
              const json = await promise.json();
              background_image = json.background_image;
            }
          } catch (error) {
            console.log("Errore immagine gioco:", error);
          }

          gamesWithImages.push({
            ...game,
            background_image,
          });
        }

        setUserFavourites(gamesWithImages);
      }
    }
  };

  useEffect(() => {
    download_avatar();
    get_favourites();
  }, [profile]);

  return (
    <main className="min-h-screen bg-gamer-black px-4 md:px-8 py-10">
      {user && profile && (
        <>
          <article className="flex flex-col items-center mb-10">
            <img
              src={avatarUrl ?? defaultAvatar}
              className="w-[120px] h-[120px] rounded-full object-cover border-4 border-gamer-purple"
              alt="Profile Image"
            />

            <h1 className="font-electro text-3xl font-bold mt-5 text-white">
              {profile.first_name}
            </h1>

            <p className="text-gamer-pink mt-2">
              My Gaming Profile
            </p>
          </article>

          <section className="grid grid-cols-1 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            <article className="bg-gamer-card rounded-2xl p-6 border border-gamer-purple/20 shadow-lg">
              <h2 className="font-electro text-xl font-bold text-gamer-pink mb-6">
                Your Data
              </h2>

              <div className="flex flex-col gap-4 text-white">
                <div>
                  <p className="text-gray-400 text-sm mb-1">
                    Name
                  </p>
                  <p>
                    {profile.first_name} {profile.last_name}
                  </p>
                </div>

                <div>
                  <p className="text-gray-400 text-sm mb-1">
                    Username
                  </p>
                  <p>{profile.username}</p>
                </div>

                <div>
                  <p className="text-gray-400 text-sm mb-1">
                    Email
                  </p>
                  <p className="break-all">{user.email}</p>
                </div>
              </div>

              <Link
                className="btn w-full mt-8 bg-gamer-purple hover:bg-gamer-pink text-white hover:text-gamer-black border-0 rounded-lg"
                to={routes.profile_settings}
              >
                Settings
              </Link>
            </article>

            <article className="lg:col-span-2 bg-gamer-card rounded-2xl p-6 border border-gamer-purple/20 shadow-lg">
              <h2 className="font-electro text-xl font-bold text-gamer-pink mb-6">
                My Favourites
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {userFavourites &&
                  userFavourites.map((game) => {
                    return (
                      <Link
                        key={game.id}
                        to={`/detail/${game.game_id}`}
                        className="group block bg-gamer-black rounded-2xl overflow-hidden shadow-lg"
                      >
                        <div className="h-[170px] overflow-hidden bg-gamer-black">
                          {game.background_image && (
                            <img
                              src={game.background_image}
                              alt={game.game_name}
                              className="w-full h-full object-cover brightness-75 group-hover:brightness-100 group-hover:scale-110 transition-all duration-300"
                            />
                          )}
                        </div>

                        <div className="p-4">
                          <h3 className="font-roboto font-bold text-white text-lg">
                            {game.game_name}
                          </h3>

                          <p className="text-gamer-pink text-sm mt-2">
                            View game details
                          </p>
                        </div>
                      </Link>
                    );
                  })}
              </div>
            </article>
          </section>
        </>
      )}
    </main>
  );
}
