import { User } from "@prisma/client";
export interface UserAuth
  extends Omit<User, "createAt" | "updateAt" | "password"> {
  [key: string]: any;
}

declare global {
  namespace Express {
    interface Request {
      user?: UserAuth | null;
    }
  }
}
