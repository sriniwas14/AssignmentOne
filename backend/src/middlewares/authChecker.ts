
import { NextFunction, Request, Response } from "express";
import { validateJwt } from "../utils/jwt";

export default async function authChecker(
	req: Request,
	res: Response,
	next: NextFunction
) {
	// Handle token validation logic
	const token = req.headers.authorization?.split(" ")?.[1];

	if (!token) {
		res.send({ success: false, message: "unauthorized" });
		return
	}

	const decodedToken = validateJwt(token);

	(req as any).user = decodedToken;

	if (!token) {
		res.send({ success: false, message: "invalid token" });
		return
	}

	next();
}
