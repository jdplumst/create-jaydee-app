import { eq } from "drizzle-orm";
import { Request, Response } from "express";
import z from "zod";
import { db } from "../db";
import { todo } from "../db/schema";
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
} from "../schemas/todo.schema";

export const getTodos = async (req: Request, res: Response) => {
  try {
    const todos = await db.select().from(todo);
    return res.status(200).json({ todos: todos });
  } catch (err) {
    return res.status(500).json({ error: "Internal server error" });
  }
};

export const getTodo = async (
  req: Request<
    z.infer<typeof getTodoParams>,
    {},
    z.infer<typeof getTodoBody>,
    z.infer<typeof getTodoQuery>
  >,
  res: Response
) => {
  const id = Number(req.params.id);
  try {
    const data = await db.select().from(todo).where(eq(todo.id, id));
    if (data.length === 0) {
      return res.status(404).json({ error: `Todo with id ${id} not found` });
    }
    return res.status(200).json({ todo: data[0] });
  } catch (err) {
    return res.status(500).json({ error: "Internal server error" });
  }
};

export const createTodo = async (
  req: Request<
    z.infer<typeof postTodoParams>,
    {},
    z.infer<typeof postTodoBody>,
    z.infer<typeof postTodoQuery>
  >,
  res: Response
) => {
  try {
    const data = await db.insert(todo).values(req.body).returning();
    return res.status(201).json({ todo: data[0] });
  } catch (err) {
    return res.status(500).json({ error: "Internal server error" });
  }
};

export const updateTodo = async (
  req: Request<
    z.infer<typeof putTodoParams>,
    {},
    z.infer<typeof putTodoBody>,
    z.infer<typeof putTodoQuery>
  >,
  res: Response
) => {
  const id = Number(req.params.id);
  try {
    const data = await db
      .update(todo)
      .set({
        name: req.body.name,
        description: req.body.description,
        status: req.body.status,
        priority: req.body.priority
      })
      .where(eq(todo.id, id))
      .returning();
    return res.status(200).json({ todo: data[0] });
  } catch (err) {
    return res.status(500).json({ error: "Internal server error" });
  }
};

export const deleteTodo = async (
  req: Request<
    z.infer<typeof deleteTodoParams>,
    {},
    z.infer<typeof deleteTodoBody>,
    z.infer<typeof deleteTodoQuery>
  >,
  res: Response
) => {
  const id = Number(req.params.id);
  try {
    const data = await db.delete(todo).where(eq(todo.id, id)).returning();
    if (data.length < 1) {
      return res.status(404).json({ error: `Todo with id ${id} not found` });
    }
    return res
      .status(200)
      .json({ message: `Deleted todo with id ${id} successfully` });
  } catch (err) {
    return res.status(500).json({ error: "Internal server error" });
  }
};
