"use client";
import { useForm, SubmitHandler } from "react-hook-form";
import { useRouter } from "next/navigation";
import { supabase } from "@/src/lib/supabase";
import Link from "next/link";

interface LoginProps {
  email: string;
  password: string;
}

export default function Login() {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginProps>();

  const onSubmit: SubmitHandler<LoginProps> = async ({ email, password }) => {
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      console.error("Login error:", error.message);
      alert("Incorrect email or password. Please try again.");
      return;
    }

    alert("Logged in successfully!");
    router.push("/dashboard");
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col items-center space-y-4 mt-[300px]"
    >
      <p className="text-2xl font-bold">Login</p>

      <div className="space-y-2">
        <div>
          <p className="text-lg">Email</p>
          <input
            {...register("email", { required: "Email is required" })}
            type="email"
            autoComplete="off"
            placeholder="Enter your email"
            className={`border-2 rounded-md p-2 w-full md:w-[260px] outline-none ${
              errors.email ? "border-red-500" : "border-gray-300"
            }`}
          />
          {errors.email && (
            <p className="text-red-500 mt-2">{errors.email.message}</p>
          )}
        </div>

        <div>
          <p className="text-lg">Password</p>
          <input
            {...register("password", { required: "Password is required" })}
            type="password"
            autoComplete="off"
            placeholder="Enter your password"
            className={`border-2 rounded-md p-2 w-full md:w-[260px] outline-none ${
              errors.password ? "border-red-500" : "border-gray-300"
            }`}
          />
          {errors.password && (
            <p className="text-red-500 mt-2">{errors.password.message}</p>
          )}
        </div>
      </div>

      <button
        type="submit"
        className="border text-white font-bold py-2 px-4 rounded-lg mt-4 w-full md:w-[260px] hover:ml-1"
      >
        Login
      </button>

      <Link href="/sign-in" className="mt-1 hover:underline">
        Dont have an account? Sign up
      </Link>
    </form>
  );
}
