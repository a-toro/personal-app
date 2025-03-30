import { z } from "zod";

export const createUserSchema = z.object({
  name: z
    .string({ required_error: "Campo obligatorio" })
    .trim()
    .nonempty("El campo name es obligatorio"),
});
