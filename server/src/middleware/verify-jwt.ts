import { NextFunction, Request, Response } from "express-serve-static-core";
import { verifyAccessToken } from "../lib/jwt";
import { JWT_SCHEMA } from "../lib/constants";
import prisma from "../lib/prisma";
import { UserAuth } from "../types/user-auth";

export async function verifyJWT(
  req: Request<UserAuth>,
  res: Response,
  next: NextFunction
): Promise<any> {
  const authHeader = req.headers["authorization"];

  if (!authHeader || !authHeader.startsWith(JWT_SCHEMA))
    return res.sendStatus(401);

  const token = authHeader?.split(" ")?.[1] as string;

  const decoded = verifyAccessToken(token);

  if (!decoded) return res.sendStatus(403);

  const findUser = await prisma.user.findUnique({
    where: { email: decoded.email },
  });

  if (!findUser) return res.sendStatus(403);

  req.user = {
    id: findUser.id,
    email: findUser.email,
    name: findUser.name,
    role: findUser.role,
    status: findUser.status,
  };

  next();
}
