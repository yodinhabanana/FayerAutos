export function isValidUsername(username: string) {
  // exemplo: só letras, números e _, 3 a 20 caracteres
  const regex = /^[a-zA-Z0-9_]{3,20}$/;
  return regex.test(username);
}

// verifica se o dominio do email está na
export function isRightEmail(email: string){
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
    return regex.test(email);
}