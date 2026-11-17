
import { useContext } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router";
import { UserContext } from "../../context/UserContext";

export default function RegisterPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const { signUp } = useContext(UserContext);

  const navigate = useNavigate();

  const onSubmit = async (user_data) => {
    await signUp({
      email: user_data.email,
      password: user_data.password,
      options: {
        data: {
          first_name: user_data.first_name,
          last_name: user_data.last_name,
          username: user_data.username,
        },
      },
    });

    navigate("/");
  };

  return (
    <main className="min-h-[70vh] flex justify-center items-center px-4 py-12 bg-gamer-black">
      <form
        className="bg-gamer-card w-full max-w-lg p-6 sm:p-10 rounded-2xl border border-gamer-purple/30 shadow-xl"
        onSubmit={handleSubmit(onSubmit)}
      >
        <h1 className="font-electro text-3xl text-white text-center font-bold mb-3">
          Join Reactor
        </h1>

        <p className="font-roboto text-gray-400 text-center mb-8">
          Create your gaming account
        </p>

        <label className="block text-white mb-2">
          Name
        </label>

        <input
          type="text"
          placeholder="Enter your name"
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
          placeholder="Enter your last name"
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
          placeholder="Choose a username"
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

        <label className="block text-white mb-2 mt-4">
          Email
        </label>

        <input
          type="email"
          placeholder="Enter your email"
          className="input w-full mb-3 bg-gamer-black text-white border border-gray-600 rounded-lg focus:outline-gamer-purple"
          {...register("email", {
            required: "This field is required",
          })}
        />

        {errors.email && (
          <p role="alert" className="text-red-400 mb-4 text-sm">
            {errors.email.message}
          </p>
        )}

        <label className="block text-white mb-2 mt-4">
          Password
        </label>

        <input
          type="password"
          placeholder="Create a password"
          className="input w-full mb-3 bg-gamer-black text-white border border-gray-600 rounded-lg focus:outline-gamer-purple"
          {...register("password", {
            required: "This field is required",
            minLength: {
              value: 8,
              message: "Password must be at least 8 characters",
            },
          })}
        />

        {errors.password && (
          <p role="alert" className="text-red-400 mb-4 text-sm">
            {errors.password.message}
          </p>
        )}

        <button
          type="submit"
          className="btn w-full mt-6 bg-gamer-purple hover:bg-gamer-pink text-white hover:text-gamer-black border-0 rounded-lg"
        >
          Sign up
        </button>

        <p className="text-center text-gray-400 mt-6 text-sm">
          Already have an account?{" "}
          <Link
            to="/auth/login"
            className="text-gamer-pink hover:underline"
          >
            Sign in
          </Link>
        </p>
      </form>
    </main>
  );
}
