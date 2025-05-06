"use client";
import { useForm, SubmitHandler } from "react-hook-form";
import { useRouter } from "next/navigation";
import { supabase } from "@/src/lib/supabase";
import Link from "next/link";
import { useEffect } from "react";

interface AuthProps {
  email: string;
  password: string;
}

export default function SignIn() {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<AuthProps>();

  const onSubmit: SubmitHandler<AuthProps> = async ({ email, password }) => {
    const { error } = await supabase.auth.signUp({
      email,
      password,
    });

    if (error) {
      console.error("Sign up error:", error.message);
      alert("Failed to sign up. Try again.");
      return;
    }

    alert("Check your email to confirm registration!");
    router.push("/dashboard");
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <p className="text-[30px] font-bold font-lora">Create your account</p>
      <div className="flex items-center justify-center h-[700px] flex-col relative">
        <div className="space-y-2">
          <div>
            <p className="text-[20px] uppercase">Sign up with your email</p>
            <input
              {...register("email", { required: true })}
              type="email"
              autoComplete="off"
              placeholder="Enter your email"
              className={`border-2 rounded-md p-2 mt-3 w-full md:w-[260px] outline-none ${
                errors.email ? "border-red-500" : "border-gray-300"
              }`}
            />
            {errors.email && (
              <p className="text-red-500 mt-2">Email is required</p>
            )}
          </div>
          <input
            {...register("password", { required: true })}
            type="password"
            autoComplete="off"
            placeholder="Enter your password"
            className={`border-2 rounded-md p-2 mt-3 w-full md:w-[260px] outline-none ${
              errors.password ? "border-red-500" : "border-gray-300"
            }`}
          />
          {errors.password && (
            <p className="text-red-500">Password is required</p>
          )}
        </div>
        <button
          type="submit"
          className="bg-transparent border border-white mt-10 font-bold w-full md:w-[260px] py-2 rounded-[5px] hover:ml-1 cursor-pointer"
        >
          Sign Up
        </button>
        <Link href="/login" className="hover:underline cursor-pointer mt-2">
          If you already registered
        </Link>
      </div>
    </form>
  );
}
