import type { Response } from "express";
import { isUniqueViolation } from "./auth.service";

export function sendError(res: Response, context: string, err: unknown, status = 500) {
  const pg = err as { code?: string; message?: string };
  let message = err instanceof Error ? err.message : String(err);
  let code = status;

  if (isUniqueViolation(err)) {
    message = "Этот email уже зарегистрирован";
    code = 409;
  }

  console.error(`[${context}]`, pg?.code ?? "", message, err);
  res.status(code).json({ error: message });
}
