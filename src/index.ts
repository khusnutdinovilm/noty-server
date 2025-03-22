import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";
import express, { Express } from "express";
import mongoose from "mongoose";

import errorMiddleware from "@middlewares/error-middleware";
import authRouter from "@modules/auth/auth.router";

dotenv.config();

const port = process.env.PORT;

const app: Express = express();

app.use(express.json());
app.use(cookieParser());
app.use(cors());
app.use("/api", authRouter);
app.use(errorMiddleware);

const startApp = async () => {
  try {
    await mongoose.connect(process.env.DB_URL as string);
    app.listen(port, () => {
      console.log(`[server]: Server is running at http://localhost:${port}`);
    });
  } catch (error) {
    console.error(error);
  }
};

startApp();
