import { type NextFunction, type Request, type Response } from "express";
import { Schema, z } from "zod";

export const validate =
  (body: Schema, query: Schema, params: Schema) =>
  (req: Request, res: Response, next: NextFunction) => {
    try {
      body.parse(req.body);
      query.parse(req.query);
      params.parse(req.params);
      next();
    } catch (err) {
      if (err instanceof z.ZodError) {
        return res.status(400).json({ error: err.flatten() });
      } else if (err instanceof Error) {
        const error = err as Error & { statusCode?: number };
        return res.status(error.statusCode ?? 400).json({ error: err.message });
      }
      return res.status(500).json({ error: "Internal server error" });
    }
  };
