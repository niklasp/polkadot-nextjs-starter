import { z } from "zod";

export const SignupFormSchema = z.object({
  signer: z
    .string()
    .length(48, { message: "Signer must be 48 characters long." })
    .trim(),
  signature: z.string().min(1, { message: "Signature is required" }),
  signedMessage: z.object({
    statement: z.string(),
    uri: z.string().startsWith("http", {
      message: "URI must start with http or https",
    }),
    version: z.number(),
    nonce: z.number(),
  }),
  userName: z.string().optional(),
});

export type FormState =
  | {
      errors?: {
        signer?: string[];
        signature?: string[];
        signedMessage?: string[];
        userName?: string[];
      };
      error?: Error;
      message?: string;
    }
  | undefined;
