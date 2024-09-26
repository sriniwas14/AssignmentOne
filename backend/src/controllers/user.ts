import { Response } from "express";
import { Controller } from "../utils/express";
import { AuthRequest } from "../types/express";
import { updateSettingsValidator } from "../validators/user";
import User from "../models/User";

export const UpdateSettings = Controller(updateSettings);
async function updateSettings(req: AuthRequest, res: Response) {
	const data = await updateSettingsValidator.parseAsync(req.body)

	const updatedUser = await User.update({
		firstName: data.firstName,
		lastName: data.lastName,
		email: data.email
	}, {
		where: {
			id: req.user.userId
		},
		returning: true,
	})

	console.log(updatedUser)

	res.send({ success: true });
}
