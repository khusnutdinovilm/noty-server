import express, { Express, Request, Response } from "express";

import dotenv from "dotenv";

dotenv.config();

const port = process.env.PORT;

const app: Express = express();

app.get("/", (req: Request, res: Response) => {
  res.send("Express + TypeScript Server");
});

const startApp = async () => {
  try {
    app.listen(port, () => {
      console.log(`[server]: Server is running at http://localhost:${port}`);
    });
  } catch (error) {
    console.error(error);
  }
};

startApp();
