import { Response } from "express";
import { AuthRequest } from "../types/express";
import { Controller } from "../utils/express";
import {
	resetPasswordValidator,
	signInValidator,
	signUpValidator,
} from "../validators/user";
import User from "../models/User";
import { generateJwt } from "../utils/jwt";
import { hashPassword, validatePassword } from "../utils/password";

export const SignUp = Controller(signUp);
async function signUp(req: AuthRequest, res: Response) {
	const data = await signUpValidator.parseAsync(req.body);

	const userExists = await User.findOne({
		where: { email: data.email },
	});

	if (userExists) {
		res.send({
			success: false,
			message: "user exists",
		});
		return;
	}

	const hash = await hashPassword(data.password);

	const user = await User.create({
		...data,
		password: hash,
	});

	const token = generateJwt({
		userId: user.id.toString(),
		firstName: user.firstName,
		lastName: user.lastName,
		email: user.email,
		avatar: user.avatar,
	});

	res.send({ success: true, token });
}

export const SignIn = Controller(signIn);
async function signIn(req: AuthRequest, res: Response) {
	const data = await signInValidator.parseAsync(req.body);

	const user = await User.findOne({
		where: { email: data.email },
	});

	if (!user) {
		res.send({
			success: false,
			message: "invalid username or password",
		});
		return;
	}

	const matched = await validatePassword(
		data.password,
		user.getDataValue("password")
	);

	if (!matched) {
		res.send({
			success: false,
			message: "invalid username or password",
		});
		return;
	}

	const token = generateJwt({
		userId: user.id.toString(),
		firstName: user.firstName,
		lastName: user.lastName,
		email: user.email,
		avatar: user.avatar,
	});

	res.send({ success: true, token });
}

export const ResetPassword = Controller(resetPassword);
async function resetPassword(req: AuthRequest, res: Response) {
	const data = await resetPasswordValidator.parseAsync(req.body);

	const user = await User.findOne({
		where: { email: data.email },
	});

	if (!user) {
		res.send({
			success: false,
			message: "user not found",
		});
		return;
	}

	const hash = await hashPassword(data.password);

	User.update(
		{
			password: hash,
		},
		{
			where: {
				id: user.id,
			},
		}
	);

	res.send({ success: true });
}
