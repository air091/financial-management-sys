import jwt, { type SignOptions } from "jsonwebtoken";

const SECRET: string = process.env.JWT_SECRET!;
const EXPIRES: string = process.env.JWT_EXPIRES_IN as string;

if (!SECRET) throw new Error("JWT secret not found");
if (!EXPIRES) throw new Error("JWT expires not found");

const options: SignOptions = {
  expiresIn: Number(EXPIRES),
  algorithm: "HS256",
};

type JwtPayload = {
  user_id: string;
  email: string;
};

export function signToken(payload: JwtPayload) {
  return jwt.sign(payload, SECRET, options);
}
