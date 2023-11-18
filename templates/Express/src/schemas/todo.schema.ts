import { createInsertSchema } from "drizzle-zod";
import z from "zod";
import { todo } from "~/db/schema";

export const getTodoBody = z.object({});
export const getTodoQuery = z.object({});
export const getTodoParams = z.object({
  id: z.string().refine((v) => {
    let n = Number(v);
    return !isNaN(n) && v.length > 0;
  })
});

export const postTodoBody = createInsertSchema(todo);
export const postTodoQuery = z.object({});
export const postTodoParams = z.object({});

export const putTodoBody = createInsertSchema(todo);
export const putTodoQuery = z.object({});
export const putTodoParams = z.object({
  id: z.string().refine((v) => {
    let n = Number(v);
    return !isNaN(n) && v.length > 0;
  })
});

export const deleteTodoBody = z.object({});
export const deleteTodoQuery = z.object({});
export const deleteTodoParams = z.object({
  id: z.string().refine((v) => {
    let n = Number(v);
    return !isNaN(n) && v.length > 0;
  })
});
