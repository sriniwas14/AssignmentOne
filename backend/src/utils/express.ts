import { NextFunction, Request, Response } from "express";
import { AuthRequest } from "../types/express";

export function Controller(handler: (req: AuthRequest, res: Response) => Promise<void>) {
	return (req: Request, res: Response, next: NextFunction) => {
		handler(req as unknown as AuthRequest, res).catch(err => next(err))
	}
}
