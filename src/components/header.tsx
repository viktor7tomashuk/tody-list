"use client";
import { useState } from "react";
import { useUser } from "../hooks/useUser";
import clsx from "clsx";
import { useRef } from "react";
import { useOutsideClick } from "../hooks/use-outside-click";
import { useRouter } from "next/navigation";
import { supabase } from "../lib/supabase";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const { user, error, isLoading } = useUser();
  const router = useRouter();

  useOutsideClick(menuRef, () => setMenuOpen(false), menuOpen);

  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut();

    if (error) {
      console.error("Logout error:", error.message);
    } else {
      router.push("/sign-in");
    }
  };

  if (isLoading) return <p>Loading...</p>;
  if (error || !user) return <p></p>;
  return (
    <div className="flex items-center justify-between">
      <p className="text-[40px] font-semibold">Tody-pro</p>
      <div ref={menuRef}>
        <button
          onClick={() => setMenuOpen(prev => !prev)}
          className="py-2 px-3 border rounded-[10px] cursor-pointer hover:opacity-70 duration-300"
        >
          <p className="text-lg">{user.email}</p>
        </button>

        {menuOpen && (
          <button
            onClick={handleLogout}
            className={clsx(
              "absolute right-[258px] hover:opacity-70 duration-300 cursor-pointer",
              "text-center top-[85px] border px-2 py-1 rounded-[10px] w-[140px]"
            )}
          >
            <p className="text-red-600 text-[20px]">log-out</p>
          </button>
        )}
      </div>
    </div>
  );
}
