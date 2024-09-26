import { z } from "zod";

export const signUpValidator = z.object({
	firstName: z.string(),
	lastName: z.string(),
	organization: z.string(),
	email: z.string(),
	password: z.string().min(6)
})

export const signInValidator = z.object({
	email: z.string(),
	password: z.string().min(6)
})

