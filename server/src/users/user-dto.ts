import { User } from "@prisma/client";

export interface UserDto extends Omit<User, "accessToken" | "password"> {}
