import { z } from "zod";
import { createSchema } from "@/components/ui/formx";
import errorMessages from "./errors.json";

export const formSchema = createSchema(errorMessages, (message) => {
  return z.object({
    email: z.string().email({
      message: message?.email,
    }),
    password: z.string(),
  });
});
