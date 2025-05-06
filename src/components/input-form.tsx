"use client";
import { supabase } from "@/src/lib/supabase";
import { SubmitHandler, useForm } from "react-hook-form";
import { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import TaskList from "./task-list";
import { mutate } from "swr";

interface FormData {
  task: string;
}

export default function InputForm() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>();

  const [selectedDate, setSelectedDate] = useState<Date | null>(new Date());
  const [selectedTime, setSelectedTime] = useState<Date | null>(new Date());

  const onSubmit: SubmitHandler<FormData> = async data => {
    if (!selectedDate || !selectedTime) return;

    const date = selectedDate.toISOString().split("T")[0];
    const time = selectedTime.toTimeString().split(" ")[0];

    const { error } = await supabase.from("tasks").insert([
      {
        name: data.task,
        date,
        time,
      },
    ]);

    if (error) {
      console.error("Error saving task:", error.message);
      return;
    }
    mutate("tasks");
    reset();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="mt-10">
        <p className="text-[40px]">keep your plan</p>
      </div>
      <div className="grid grid-cols-1 md:flex items-center gap-5 mt-5">
        <input
          {...register("task", { required: true, maxLength: 20 })}
          type="text"
          autoComplete="off"
          placeholder="name task"
          className={`border-2 rounded-md p-2 mt-3 w-full md:w-[260px] outline-none ${
            errors.task ? "border-red-500" : "border-gray-300"
          }`}
        />
        <DatePicker
          selected={selectedDate}
          onChange={date => setSelectedDate(date)}
          dateFormat="yyyy-MM-dd"
          className="border-2 rounded-md p-2 mt-3 outline-none w-full md:w-[150px]"
          popperPlacement="bottom"
          withPortal
        />
        <DatePicker
          selected={selectedTime}
          onChange={time => setSelectedTime(time)}
          showTimeSelect
          showTimeSelectOnly
          timeIntervals={15}
          timeCaption="Time"
          dateFormat="HH:mm"
          className="border-2 rounded-md p-2 mt-3 outline-none w-full md:w-[100px]"
          withPortal
        />

        <button
          type="submit"
          className="border px-2 py-2 mt-3 w-full md:w-[100px] rounded-[2px] hover:ml- cursor-pointer"
        >
          add
        </button>
      </div>
      <h2 className="text-2xl mb-4 mt-10 text-[40px]">Your Tasks</h2>
      <TaskList />
    </form>
  );
}
