import { z } from "zod";

export const loginSchema = z.object({
  email: z.string().min(1, "Email is required").email("Invalid email address"),
  password: z
    .string()
    .min(1, "Password is required")
    .min(8, "Password must be at least 8 characters"),
});

export type LoginFormData = z.infer<typeof loginSchema>;

export const registerSchema = z.object({
  username: z.string().min(1, "Username is required").max(50, "Username is too long"),
  email: z.string().min(1, "Email is required").email("Invalid email address"),
  password: z
    .string()
    .min(1, "Password is required")
    .min(8, "Password must be at least 8 characters"),
});

export type RegisterFormData = z.infer<typeof registerSchema>;

export const entrySchema = z.object({
  name: z.string().min(1, "Name is required").max(100, "Name is too long"),
  location: z.string().min(1, "Google Maps URL is required").url("Invalid URL format"),
  country: z.string().min(1, "Country is required").max(50, "Country is too long"),
  about: z.string().min(1, "About is required").max(2000, "About is too long"),
  imageUrl: z.string().min(1, "Image URL is required").url("Invalid image URL"),
});

export type EntryFormDataZod = z.infer<typeof entrySchema>;
