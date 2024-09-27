import { Request } from "express";

export interface AuthRequest extends Request {
	user: JwtPayload
}

export type JwtPayload = {
	userId: string,
	firstName: string,
	lastName: string,
	email: string,
	avatar?: string,
}
