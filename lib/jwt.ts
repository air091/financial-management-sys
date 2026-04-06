import jwt, { type SignOptions } from "jsonwebtoken";

const secret: string = process.env.JWT_SECRET as string;
const expires: string = process.env.JWT_EXPIRES_IN as string;

if (!secret) throw new Error("JWT secret not found");
if (!expires) throw new Error("JWT expires not found");

const options: SignOptions = {
  expiresIn: expires as SignOptions["expiresIn"],
  algorithm: "HS256",
};

type JwtPayload = {
  sub: string;
  email: string;
};

export function signToken(payload: JwtPayload): string {
  return jwt.sign(payload, secret, options);
}

export function verifyToken(token: string): JwtPayload {
  const decoded = jwt.verify(token, secret, { algorithms: ["HS256"] });

  if (typeof decoded === "string") throw new Error("Invalid token payload");
  return decoded as JwtPayload;
}
