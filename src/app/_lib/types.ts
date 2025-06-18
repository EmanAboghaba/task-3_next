// lib/types.ts
import { z } from "zod";

export const userSchema = z.object({
  _id: z.string().optional(),
  name: z.string().min(2, "Name must be at least 2 characters long"),
  email: z.string().email("Invalid email address"),
  createdAt: z.string().datetime().optional(),
  updatedAt: z.string().datetime().optional(),
  image: z.string().url("Invalid image URL").optional().nullable(),
});

export const userCreateSchema = userSchema
  .extend({
    _id: z.never().optional(),
  })
  .omit({ image: true, createdAt: true, updatedAt: true });

export const userUpdateSchema = userSchema
  .partial()
  .omit({ _id: true, createdAt: true, updatedAt: true, email: true });

export type User = z.infer<typeof userSchema>;
export type UserCreateInput = z.infer<typeof userCreateSchema>;
export type UserUpdateInput = z.infer<typeof userUpdateSchema>;
