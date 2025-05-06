"use client";
import useSWR, { mutate } from "swr";
import { supabase } from "@/src/lib/supabase";

type Task = {
  id: number;
  name: string;
  date: string;
  time: string;
};

const fetchTasks = async (): Promise<Task[]> => {
  const { data, error } = await supabase
    .from("tasks")
    .select("*")
    .order("id", { ascending: false });

  if (error) {
    throw new Error(error.message);
  }
  console.log(data);
  return data || [];
};

export default function TaskList() {
  const {
    data: tasks,
    error,
    isLoading,
  } = useSWR("tasks", fetchTasks, {
    revalidateOnMount: true, // Force refetch on mount
    dedupingInterval: 0, // Disable deduplication interval
  });

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p></p>;
  if (!tasks || tasks.length === 0) return <p>No tasks found.</p>;

  const Delete = async (id: number) => {
    const { error } = await supabase.from("tasks").delete().eq("id", id);
    if (error) {
      console.error("delete");
    }
    mutate("tasks");
  };

  return (
    <div className="mt-4">
      <ul className="space-y-3">
        {tasks.map(task => (
          <li
            key={task.id}
            className="border p-4 rounded-md shadow-sm hover:shadow-md transition"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="font-semibold text-[20px]">{task.name}</p>
                <p className="text- text-gray-600">
                  {task.date} — {task.time}
                </p>
              </div>
              <button
                type="button"
                onClick={() => Delete(task.id)}
                className="border border-red-500 px-3 py-1 rounded-[5px] bg-red-500/20 hover:mb-1 cursor-pointer"
              >
                delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
