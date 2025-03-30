import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import { corsOptions } from "./config/cors";
import path from "path";
import { AUTH_PATH_BASE, RoutesNames } from "./lib/constants";
import { authRouter } from "./auth/auth-routes";

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

console.log(RoutesNames.auth.root)
app.use(RoutesNames.auth.root, authRouter);

app.get("", (req, res) => {
  res.send("Hello app");
});
