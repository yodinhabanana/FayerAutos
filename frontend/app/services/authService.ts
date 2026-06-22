
import { RegisterRequest } from "@/types/RegisterRequest";
import { LoginResponse } from "@/types/LoginResponse";
import { LoginRequest } from "@/types/LoginRequest";

export async function register(
  data: RegisterRequest

): Promise<LoginResponse> {
  const response = await fetch("http://localhost:8080/api/auth/register", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    throw new Error("Erro ao registrar usuário");
  }

  return response.json();
}

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