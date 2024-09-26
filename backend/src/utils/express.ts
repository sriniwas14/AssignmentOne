import { NextFunction, Response } from "express";
import { AuthRequest } from "../types/express";

export async function Controller(handler: (req: AuthRequest, res: Response) => void) {
	return async (req: Request, res: Response, next: NextFunction) => {
		try {
			handler(req as unknown as AuthRequest, res)
		} catch (err) {
			next(err)
		}
	}
}
