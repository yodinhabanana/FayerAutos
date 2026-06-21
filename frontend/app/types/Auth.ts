export type MyJwtPayload = {
  userId: number;
  role: number;
  exp: number;
  iat: number;
};