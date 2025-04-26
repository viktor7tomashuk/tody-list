import { useEffect, useState } from "react";
import { supabase } from "@/src/lib/supabase";
import { User } from "@supabase/supabase-js";

export const useUser = () => {
  const [user, setUser] = useState<User | null>(null);
  const [error, setError] = useState<Error | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      const { data, error } = await supabase.auth.getUser();

      if (error) {
        setError(error);
      } else {
        setUser(data.user);
      }
      setIsLoading(false);
    };

    fetchUser();
  }, []);

  return {
    user,
    error,
    isLoading,
  };
};
