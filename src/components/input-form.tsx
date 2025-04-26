"use client";
import { supabase } from "@/src/lib/supabase";
import { SubmitHandler, useForm } from "react-hook-form";

interface FormData {
  task: string;
}

export default function InputForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();

  const onSubmit: SubmitHandler<FormData> = async data => {
    const { data: task, error } = await supabase
      .from("task")
      .insert([{ text: data.task }])
      .select();
    if (error) {
      console.error("Error saving user:", error.message);
      return;
    }
    localStorage.setItem("userId", task[0].id);
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="mt-10">
        <p>keep your plan</p>
      </div>
      <input
        {...register("task", { required: true, maxLength: 20 })}
        type="text"
        autoComplete="off"
        placeholder="Enter your name"
        className={`border-2 rounded-md p-2 mt-3 w-full md:w-[260px] outline-none ${
          errors.task ? "border-red-500" : "border-gray-300"
        }`}
      />
    </form>
  );
}
