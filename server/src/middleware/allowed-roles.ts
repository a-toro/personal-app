import { Role } from "@prisma/client";
import { NextFunction, Request, Response } from "express-serve-static-core";

export function allowedRoles(roles: Role[]): any {
  return function (req: Request, res: Response, next: NextFunction) {
    console.log(req.user);
    if (!req.user || !req.user.role || !roles.includes(req.user.role)) {
      return res.sendStatus(403);
    }
    next();
  };
}
