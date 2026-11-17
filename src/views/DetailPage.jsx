
import { useLoaderData, useNavigate } from "react-router";
import Header from "../components/DetailComponents/Header";
import { FaCircleArrowLeft } from "react-icons/fa6";
import BodySection from "../components/DetailComponents/BodySection";
import { useContext } from "react";
import { UserContext } from "../context/UserContext";

export default function DetailPage() {
  const game = useLoaderData();
  const navigate = useNavigate();
  const { profile } = useContext(UserContext);

  return (
    <>
      <main
        style={{
          backgroundImage: `linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5)), url(${game.background_image})`,
        }}
        className="min-h-screen bg-center bg-cover bg-scroll lg:bg-fixed pb-20"
      >
        <FaCircleArrowLeft
          className="text-3xl fixed bottom-6 text-gamer-pink left-6 cursor-pointer hover:text-gamer-purple transition-colors z-10"
          onClick={() => navigate(-1)}
        />

        <Header game={game} />

        {profile && (
          <BodySection game={game} profile_id={profile.id} />
        )}
      </main>
    </>
  );
}
