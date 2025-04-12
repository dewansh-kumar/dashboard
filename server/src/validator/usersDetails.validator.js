import { z } from "zod";

const signupSchemaValidator = z.object({
  email: z.string().email("Invalid email address"),
  firstName: z
    .string()
    .min(3, "First Name must be at least 3 characters long "),
  lastName: z.string().min(3, "Last Name must be at least 3 characters long "),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters long")
    .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
    .regex(
      /[@#$%^&*(),.?":{}|<>]/,
      "Password must contain at least one special character"
    ),
});

const signinSchemaValidator = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(8, "Password must be at least 8 characters long"),
});

export { signupSchemaValidator, signinSchemaValidator };
