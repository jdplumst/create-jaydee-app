import express, { type Application } from "express";
import "dotenv/config";
import { env } from "./env";
import { todoRouter } from "./routers/todo.router";

export const app: Application = express();

app.use(express.json());

app.use("/api/todo", todoRouter);

const PORT = env.PORT;

app.listen(PORT, () => {
  console.log(`Server running at: http://localhost:${PORT}`);
});
