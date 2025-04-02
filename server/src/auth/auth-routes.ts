import express from "express";
// import { NextFunction, Request, Response } from "express-serve-static-core";
import { NextFunction, Request, Response } from "express";
import { CookiesNames, RoutesNames } from "../lib/constants";
import { CreateUserDto } from "./aut-dto";
import { createUserSchema, loginSchema } from "./auth-schema";
import {
  createAccessToken,
  createRefreshToken,
  verifyRefreshToken,
} from "../lib/jwt";
import prisma from "../lib/prisma";
import bcryptjs from "bcryptjs";
import { EnvConfig } from "../lib/env";

export const authRouter = express.Router();

authRouter.post(
  RoutesNames.auth.login,
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { success, error, data } = loginSchema.safeParse(req.body);

      if (!success || error) {
        const errors = error.issues.map((issue) => ({
          path: issue.path.join("."),
          message: issue.message,
        }));
        res.status(400).json({
          errors,
          statusCode: 400,
        });
      }

      const findUser = await prisma.user.findUnique({
        where: {
          email: data!.email,
        },
      });

      if (!findUser) {
        res.status(400).json({
          error: true,
          message: "Email o contrasela incorrectos",
          statusCode: 400,
        });
      }

      const passwordMatch = await bcryptjs.compare(
        data!.password,
        findUser!.password
      );

      if (!passwordMatch) {
        res.status(400).json({
          error: true,
          message: "Email o contrasela incorrectos",
          statusCode: 400,
        });
      }

      const accessToken = createAccessToken({
        id: String(findUser?.id),
        email: findUser!.email,
      });

      const refreshToken = createRefreshToken({
        id: String(findUser?.id),
        email: findUser!.email,
      });

      res
        .status(200)
        .cookie(CookiesNames.RefreshToken, refreshToken, {
          httpOnly: true,
          secure: String(EnvConfig.enviroment).toLowerCase() === "production",
          sameSite: "strict",
          maxAge: 1000 * 60 * 60, // Tiempo de validez de la cookie 1h
        })
        .json({
          statusCode: 200,
          data: {
            ...findUser,
          },
          accessToken,
        });
    } catch (error) {
      next(error);
    }
  }
);

authRouter.post(
  RoutesNames.auth.register,
  async (
    req: Request<{}, {}, CreateUserDto>,
    res: Response,
    next: NextFunction
  ): Promise<any> => {
    try {
      const { success, error, data } = createUserSchema.safeParse(req.body);

      if (!success || error) {
        const errors = error.issues.map((issue) => ({
          path: issue.path.join("."),
          message: issue.message,
        }));
        return res.status(400).json({
          data: null,
          errors,
          statusCode: 400,
        });
      }

      const findUser = await prisma.user.findUnique({
        where: {
          email: data?.email,
        },
      });

      if (findUser) {
        res.status(400).json({
          error: "Usuario no disponible",
          statusCode: 400,
        });
      }

      const hashPassword = await bcryptjs.hash(
        data!.password,
        EnvConfig.saltRounds
      );

      const newUser = await prisma.user.create({
        data: {
          email: data!.email,
          name: data!.name,
          password: hashPassword,
          status: true,
        },
        select: {
          id: true,
          createAt: true,
          updateAt: true,
          name: true,
          email: true,
          status: true,
          password: false,
          role: true,
        },
      });

      const { email, id: userId } = newUser;

      res.status(201).json({
        data: {
          user: newUser,
        },
        statusCode: 201,
      });
    } catch (error) {
      next(error);
    }
  }
);

authRouter.get(
  RoutesNames.auth.logout,
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const cookies = req.cookies;

      if (!cookies?.[CookiesNames.RefreshToken]) res.sendStatus(204);

      // Limpiar cookie
      res.clearCookie(CookiesNames.RefreshToken, {
        httpOnly: true,
        sameSite: "strict",
        secure: String(EnvConfig.enviroment).toLowerCase() === "production",
      });

      res.sendStatus(204);
    } catch (error) {
      next(error);
    }
  }
);

authRouter.get(
  RoutesNames.auth.refresh,
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const cookies = req.cookies;

      if (!cookies?.[CookiesNames.RefreshToken]) res.sendStatus(401);

      const refreshToken = cookies[CookiesNames.RefreshToken];

      const decodedUser = verifyRefreshToken(refreshToken);

      if (!decodedUser) res.sendStatus(403);

      const findUser = await prisma.user.findUnique({
        where: {
          email: decodedUser!.email,
        },
      });

      if (!findUser) res.sendStatus(403);

      const accessToken = createAccessToken({
        id: String(findUser!.id),
        email: findUser!.email,
      });

      res.status(200).json({
        accessToken,
      });
    } catch (error) {
      next(error);
    }
  }
);
