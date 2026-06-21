import { LoginResponse } from "@/types/LoginResponse";

export async function login(
  username: string,
  password: string
): Promise<LoginResponse> {
  const response = await fetch(
    "http://localhost:8080/api/auth/login",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username,
        password,
      }),
    }
  );

  if (!response.ok) {
    throw new Error("Usuário ou senha inválidos");
  }

  return response.json();
}