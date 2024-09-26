import jwt from "jsonwebtoken";
import { JWT_KEY } from "../config";
import { JwtPayload } from "../types/express";

export function generateJwt(payload: JwtPayload) {
	return jwt.sign(payload, JWT_KEY);
}

export function validateJwt(token: string) {
	const data = jwt.verify(token, JWT_KEY);
	return data as JwtPayload;
}

