import express from "express";
import {
  createTodo,
  deleteTodo,
  getTodo,
  getTodos,
  updateTodo
} from "~/controllers/todo.controller";
import { validate } from "~/middleware/zod.middleware";
import {
  deleteTodoBody,
  deleteTodoParams,
  deleteTodoQuery,
  getTodoBody,
  getTodoParams,
  getTodoQuery,
  postTodoBody,
  postTodoParams,
  postTodoQuery,
  putTodoBody,
  putTodoParams,
  putTodoQuery
} from "~/schemas/todo.schema";

export const todoRouter = express.Router();

todoRouter.get("/", getTodos);

todoRouter.get(
  "/:id",
  validate(getTodoBody, getTodoQuery, getTodoParams),
  getTodo
);

todoRouter.post(
  "/",
  validate(postTodoBody, postTodoQuery, postTodoParams),
  createTodo
);

todoRouter.put(
  "/:id",
  validate(putTodoBody, putTodoQuery, putTodoParams),
  updateTodo
);

todoRouter.delete(
  "/:id",
  validate(deleteTodoBody, deleteTodoQuery, deleteTodoParams),
  deleteTodo
);
