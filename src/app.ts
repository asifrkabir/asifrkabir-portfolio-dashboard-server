/* eslint-disable @typescript-eslint/no-unused-vars */
import cookieParser from "cookie-parser";
import cors from "cors";
import express, { Application, NextFunction, Request, Response } from "express";
import config from "./app/config";
import globalErrorHandler from "./app/middlewares/globalErrorHandler";
import notFound from "./app/middlewares/notFound";
import router from "./app/routes";

const app: Application = express();

app.use(
  cors({
    origin: [config.client_url as string, config.portfolio_url as string],
    credentials: true,
  })
);
app.use(cookieParser());

// Parsers
app.use(express.json());

app.use("/api/v1", router);

app.get("/", (req: Request, res: Response, next: NextFunction) => {
  res.send(`Portfolio Dashboard App is listening on port ${config.port}`);
});

app.use(globalErrorHandler);

app.use(notFound);

export default app;
