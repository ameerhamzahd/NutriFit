"use client";

import { ReactNode, useEffect, useState } from "react";
import { User } from "@supabase/supabase-js";
import { supabase } from "@/lib/supabaseClient";
import { useRouter } from "next/navigation";

interface PrivateRouteProps {
  children: ReactNode;
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ children }) => {
  const [user, setUser] = useState<User | null | undefined>(undefined); // undefined = checking
  const router = useRouter();

  useEffect(() => {
    const checkUser = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        router.replace("/auth/login");
        return;
      }

      setUser(user);
    };

    checkUser();
  }, [router]);

  if (user === undefined) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Checking authentication...</p>
      </div>
    );
  }

  // User is logged in
  return <>{children}</>;
};

export default PrivateRoute;
