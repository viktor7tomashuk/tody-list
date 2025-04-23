"use client";
import { SubmitHandler, useForm } from "react-hook-form";
import { useRouter } from "next/navigation";

interface AuthProps {
  name: string;
}

export default function Auth() {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<AuthProps>();

  const onSubmit: SubmitHandler<AuthProps> = data => {
    console.log(data);
    router.push("/dashboard");
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <p className="text-[30px] font-bold font-lora">Welcome to the app</p>
      <div className="flex items-center justify-center h-[700px] flex-col relative">
        <p className="text-[20px] uppercase">please write your name</p>
        <input
          {...register("name", { required: true, maxLength: 20 })}
          type="text"
          placeholder="Enter your name"
          className={`border-2 rounded-md p-2 mt-3 w-full md:w-[260px] outline-none ${
            errors.name ? "border-red-500" : "border-gray-300"
          }`}
        />
        <div className="absolute text-sm text-red-500 mt-10 left-[470px]">
          {errors.name && <p>you need to enter a name</p>}
        </div>
        <button
          type="submit"
          className="bg-transparent border border-white mt-10 font-bold w-full md:w-[260px] py-2 rounded-[5px] hover:ml-1 cursor-pointer"
        >
          Next
        </button>
      </div>
    </form>
  );
}
