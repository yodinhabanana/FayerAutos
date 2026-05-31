"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

export default function Home() {
  const [data, setData] = useState<any[]>([]);
  const [error, setError] = useState<any>(null);

  useEffect(() => {
    async function test() {
      const result = await supabase.from("user_accounts").select("*");

      setData(result.data || []);
      setError(result.error);
    }

    test();
  }, []);

  return (
    <div style={{ padding: 20 }}>
      <h1>Teste Supabase</h1>

      <h3>ERROR:</h3>
      <pre>{JSON.stringify(error, null, 2)}</pre>

      <h3>DATA:</h3>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  );
}