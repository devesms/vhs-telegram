import { DateTime, Str } from "chanfana";
import { z } from "zod";

export * from "./telegram.type"
export * from "./cloudflare.d1.type"

export const Task = z.object({
  name: Str({ example: "lorem" }),
  slug: Str(),
  description: Str({ required: false }),
  completed: z.boolean().default(false),
  due_date: DateTime(),
});
