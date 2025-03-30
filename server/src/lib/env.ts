import * as dotenv from "dotenv";
import path from "path";
import { z } from "zod";

// Cargar el archivo .env desde la raiz del proyecto.
dotenv.config({ path: path.resolve(__dirname, "../../.env") });

export type EnvConfig = typeof EnvConfig;

const envEschema = z.object({
  NODE_ENV: z.string().default("development"),
  PORT: z.coerce.number().default(9000),
  API_ROOT: z.string().default("/api"),
  JWT_ACCESS_TOKEN_SECRET: z.string().min(1, "JWT_SECRET_KEY es obligatorio"),
  JWT_REFRESH_TOKEN_SECRET: z.string().min(1, "JWT_SECRET_KEY es obligatorio"),
  SALT_ROUNDS: z.coerce.number().min(1, "SALT_ROUNDS es obligatorio"),
});

const { success, error, data } = envEschema.safeParse(process.env);

if (!success) {
  console.error("Error en las variables de entorno", error.format());
  process.exit(1);
}

const {
  NODE_ENV: enviroment = "development",
  PORT: port = 5000,
  API_ROOT: apiRoot = "/api",
  JWT_ACCESS_TOKEN_SECRET: jwtAccessToken,
  JWT_REFRESH_TOKEN_SECRET: jwtRefreshToken,
  SALT_ROUNDS: saltRounds,
} = data;

export const EnvConfig = {
  enviroment,
  port,
  apiRoot,
  jwtAccessToken,
  jwtRefreshToken,
  saltRounds,
};

console.log({ EnvConfig });
