
import { useContext } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router";
import { UserContext } from "../../context/UserContext";

export default function LoginPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const navigate = useNavigate();

  const { login } = useContext(UserContext);

  const onSubmit = async (user_data) => {
    await login({
      email: user_data.email,
      password: user_data.password,
    });

    navigate("/");
  };

  return (
    <main className="min-h-[70vh] flex justify-center items-center px-4 py-12 bg-gamer-black">
      <form
        className="bg-gamer-card w-full max-w-md p-6 sm:p-10 rounded-2xl border border-gamer-purple/30 shadow-xl"
        onSubmit={handleSubmit(onSubmit)}
      >
        <h1 className="font-electro text-3xl text-white text-center font-bold mb-3">
          Welcome Back
        </h1>

        <p className="font-roboto text-gray-400 text-center mb-8">
          Sign in to your Reactor account
        </p>

        <label className="block text-white mb-2">
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
          placeholder="Enter your password"
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
          className="btn w-full mt-5 bg-gamer-purple hover:bg-gamer-pink text-white hover:text-gamer-black border-0 rounded-lg"
        >
          Sign in
        </button>

        <p className="text-center text-gray-400 mt-6 text-sm">
          Don't have an account?{" "}
          <Link
            to="/auth/register"
            className="text-gamer-pink hover:underline"
          >
            Register
          </Link>
        </p>
      </form>
    </main>
  );
}
