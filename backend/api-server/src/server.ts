import { json, urlencoded } from "body-parser";
import express, { type Express } from "express";
import morgan from "morgan";
import cors from "cors";
import { TestMessage, generateTestMessage } from "@repo/api-model";

export const createServer = (): Express => {
  const app = express();
  app
    .disable("x-powered-by")
    .use(morgan("dev"))
    .use(urlencoded({ extended: true }))
    .use(json())
    .use(cors())
    .get("/message/:name", (req, res) => {
      const message: TestMessage = generateTestMessage();
      return res.json(message);
    })
    .get("/status", (_, res) => {
      return res.json({ ok: true });
    });

  return app;
};
