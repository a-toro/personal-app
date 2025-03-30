import express from "express";
import { NextFunction, Request, Response } from "express-serve-static-core";
import prisma from "../lib/prisma";
import { UserDto } from "./user-dto";
import { RoutesNames } from "../lib/constants";
import { createResponse } from "../lib/api-response";

export const userRouter = express.Router();

userRouter.get(
  RoutesNames.user.users,
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const users: UserDto[] = await prisma.user.findMany({
        select: {
          id: true,
          name: true,
          email: true,
          role: true,
          status: true,
          createAt: true,
          password: false,
          accessToken: false,
          updateAt: true,
        },
      });

      const totalUsers = await prisma.user.count();

      res.status(200).json({
        response: {
          status: 200,
          message: "OK",
        },
        pagination: {
          total: totalUsers,
        },
        data: {
          users,
        },
      });
    } catch (error) {
      next(error);
    }
  }
);
