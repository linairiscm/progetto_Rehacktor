
import { useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { UserContext } from "../../context/UserContext";
import { useNavigate } from "react-router";
import routes from "../../router/routes";
import supabase from "../../database/supabase";

export default function ProfileSettingsPage() {
  const [file, setFile] = useState();
  const [preview, setPreview] = useState();

  const { profile, getUser, updateProfile } = useContext(UserContext);

  const handleChange = (e) => {
    setFile(() => e.target.files[0]);
  };

  useEffect(() => {
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setPreview(() => imageUrl);
    }
  }, [file]);

  const handleAvatarSubmit = async (e) => {
    e.preventDefault();

    const fileExt = file.name.split(".").pop();
    const fileName = `${profile.id}/${Math.random()}.${fileExt}`;

    const { error: uploadError } = await supabase.storage
      .from("avatars")
      .upload(fileName, file);

    if (uploadError) {
      console.log("Errore upload:", uploadError.message);
      return;
    }

    const { data, error } = await supabase
      .from("profiles")
      .update({ avatar_url: fileName })
      .eq("id", profile.id)
      .select();

    if (!error) {
      await getUser();
    }
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const navigate = useNavigate();

  const onSubmit = (data) => {
    updateProfile(data);
    navigate(routes.profile);
  };

  return (
    <main className="min-h-screen bg-gamer-black px-4 py-10">
      <h1 className="font-electro text-3xl md:text-4xl font-bold text-white text-center mb-3">
        Profile Settings
      </h1>

      <p className="text-gray-400 text-center mb-10">
        Personalize your gaming profile
      </p>

      <section className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto items-start">
        <form
          className="bg-gamer-card p-6 sm:p-8 rounded-2xl border border-gamer-purple/20 shadow-xl"
          onSubmit={handleSubmit(onSubmit)}
        >
          <h2 className="font-electro text-xl font-bold text-gamer-pink mb-6">
            Edit Personal Data
          </h2>

          <label className="block text-white mb-2">
            Name
          </label>

          <input
            type="text"
            placeholder="Name"
            className="input w-full mb-3 bg-gamer-black text-white border border-gray-600 rounded-lg focus:outline-gamer-purple"
            {...register("first_name", {
              required: "This field is required",
            })}
          />

          {errors.first_name && (
            <p role="alert" className="text-red-400 mb-4 text-sm">
              {errors.first_name.message}
            </p>
          )}

          <label className="block text-white mb-2 mt-4">
            Last Name
          </label>

          <input
            type="text"
            placeholder="Last Name"
            className="input w-full mb-3 bg-gamer-black text-white border border-gray-600 rounded-lg focus:outline-gamer-purple"
            {...register("last_name", {
              required: "This field is required",
            })}
          />

          {errors.last_name && (
            <p role="alert" className="text-red-400 mb-4 text-sm">
              {errors.last_name.message}
            </p>
          )}

          <label className="block text-white mb-2 mt-4">
            Username
          </label>

          <input
            type="text"
            placeholder="Username"
            className="input w-full mb-3 bg-gamer-black text-white border border-gray-600 rounded-lg focus:outline-gamer-purple"
            {...register("username", {
              required: "This field is required",
            })}
          />

          {errors.username && (
            <p role="alert" className="text-red-400 mb-4 text-sm">
              {errors.username.message}
            </p>
          )}

          <button
            type="submit"
            className="btn w-full mt-6 bg-gamer-purple hover:bg-gamer-pink text-white hover:text-gamer-black border-0 rounded-lg"
          >
            Save Changes
          </button>
        </form>

        <form
          className="bg-gamer-card p-6 sm:p-8 rounded-2xl border border-gamer-purple/20 shadow-xl"
          onSubmit={handleAvatarSubmit}
        >
          <h2 className="font-electro text-xl font-bold text-gamer-pink mb-6">
            Change Avatar
          </h2>

          <div className="flex flex-col items-center mb-6">
            {preview && (
              <img
                src={preview}
                alt="Avatar Preview"
                className="w-[150px] h-[150px] rounded-full object-cover border-4 border-gamer-purple mb-4"
              />
            )}

            <p className="text-gray-400 text-sm text-center">
              Select a new profile image
            </p>
          </div>

          <input
            type="file"
            accept="image/*"
            className="file-input w-full bg-gamer-black text-white border border-gray-600 rounded-lg mb-6"
            onChange={handleChange}
          />

          <button
            type="submit"
            disabled={!file}
            className="btn w-full bg-gamer-purple hover:bg-gamer-pink text-white hover:text-gamer-black border-0 rounded-lg"
          >
            Change Avatar
          </button>
        </form>
      </section>
    </main>
  );
}
