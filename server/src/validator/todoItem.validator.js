import z from "zod";

const todoItemSchemaValidator = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().min(1, "Description is required"),
  priority: z.string().min(1, "Priority is required"),
  dueDate: z.string().min(1, "Due date is required"),
});

export { todoItemSchemaValidator };
