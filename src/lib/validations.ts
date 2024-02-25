import { z } from "zod";

export const personSchema = z.object({
  name: z
    .string()
    .min(3, { message: "Name must be at least 3 characters long" })
    .max(255, { message: "Name cannot exceed 255 characters" }),
  email: z.string().email({ message: "Invalid email format" }),
  phone: z
    .string()
    .min(8, { message: "Phone number must be at least 8 characters long" })
    .max(12, { message: "Phone number cannot exceed 12 characters" }),
  hobbies: z.string().optional(),
  isSaved: z.boolean().optional().default(false),
  updateSaved: z.boolean().optional().default(false),
});
export const updatePersonSchema = z.object({
  name: z.string().max(255).optional(),
  email: z.string().max(0).or(z.string().email()),

  phone: z.string().max(12).optional(),
  hobbies: z.string().optional(),
  isSaved: z.boolean().optional().default(false),
  updateSaved: z.boolean().optional().default(false),
});

export type Person = z.infer<typeof personSchema>;
