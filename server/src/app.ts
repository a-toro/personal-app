import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import { corsOptions } from "./config/cors";
import path from "path";
import { AUTH_PATH_BASE, RoutesNames } from "./lib/constants";
import { authRouter } from "./auth/auth-routes";
import { userRouter } from "./users/user-routes";
import { verifyJWT } from "./middleware/verify-jwt";
import { allowedRoles } from "./middleware/allowed-roles";
import { Role } from "@prisma/client";
import { expenseCategoriesRouter } from "./expenses/expense-categories/expense-categories-routes";
import { expenseRouter } from "./expenses/expense-routes";

export const app = express();

// Cross Origin Resource Sharing
app.use(cors(corsOptions));

// built-in middleware to handle urlencoded form data
app.use(express.urlencoded({ extended: false }));

// built-in middleware for json
app.use(express.json());

//middleware for cookies
app.use(cookieParser());

//serve static files
app.use("/", express.static(path.join(__dirname, "/public")));

app.use(RoutesNames.auth.root, authRouter);

// Rutas protegidas
app.use(verifyJWT);
app.use(
  RoutesNames.user.root,
  allowedRoles([Role.ADMIN]),
  userRouter
);
app.use(RoutesNames.expenseCategory.root, expenseCategoriesRouter);
app.use(RoutesNames.expense.root, expenseRouter);

app.get("", (req, res) => {
  res.send("Hello app");
});
