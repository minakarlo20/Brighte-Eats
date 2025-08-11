import { Response } from "express";

export function handleError(err: any, res: Response) {
    
  if (err.type === "DuplicateNameError") {
    return res.status(400).json({ error: err.message });
  }

  console.error("Unhandled error:", err);
  return res.status(500).json({ error: "Internal server error" });
}