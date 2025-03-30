import { z } from "zod";

export const createUserSchema = z.object({
  name: z
    .string({ required_error: "Campo obligatorio" })
    .trim()
    .nonempty("El campo name es obligatorio"),
  email: z.coerce
    .string()
    .email("El email no es valido")
    .min(1, "El campo email es obligatorio"),
  password: z
    .string({ required_error: "Campo obligatorio" })
    .nonempty("El campo password es obligatorio"),
});

export const loginSchema = z.object({
  email: z
    .string({ required_error: "Campo obligatorio" })
    .email("El email no es valido")
    .min(1, "El campo email es obligatorio"),
  password: z
    .string({ required_error: "Campo obligatorio" })
    .min(1, "El campo password es obligatorio"),
});
