import jwt from "jsonwebtoken";
import { JwtPayload } from "../types/jwt-payload";
import { EnvConfig } from "./env";

export function createAccessToken({
  ...payload
}: Omit<JwtPayload, "iat" | "exp">) {
  const token = jwt.sign(payload, EnvConfig.jwtAccessToken, {
    expiresIn: "30s",
  });

  return token;
}
export function createRefreshToken({
  ...payload
}: Omit<JwtPayload, "iat" | "exp">) {
  const token = jwt.sign(payload, EnvConfig.jwtRefreshToken, {
    expiresIn: "1h",
  });

  return token;
}

export function verifyAccessToken(token: string): JwtPayload {
  return jwt.verify(token, EnvConfig.jwtAccessToken) as JwtPayload;
}

export function verifyRefreshToken(token: string): JwtPayload | null {
  try {
    return jwt.verify(token, EnvConfig.jwtRefreshToken) as JwtPayload;
  } catch (error) {
    console.error({ error });
    return null;
  }
}
