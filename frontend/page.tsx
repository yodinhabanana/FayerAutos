"use client";

import { useEffect } from "react";
import { supabase } from "./src/lib/supabase";

export default function Home() {
  useEffect(() => {
    async function test() {
      const { data, error } = await supabase.from("user_accounts").select("*");

      console.log("DATA:", data);
      console.log("ERROR:", error);
    }

    test();
  }, []);

  return <h1>Testando Supabase (ver console)</h1>;
}