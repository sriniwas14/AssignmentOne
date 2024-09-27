import { Response } from "express";
import { Controller } from "../utils/express";
import { AuthRequest } from "../types/express";
import { updateSettingsValidator } from "../validators/user";
import User from "../models/User";
import Busboy from "busboy";
import { UPLOAD_DIR } from "../config";
import path from "path";
import fs from "fs";
import crypto from "crypto";

export const GetSettings = Controller(getSettings);
async function getSettings(req: AuthRequest, res: Response) {
    const user = await User.findByPk(req.user.userId);

    res.send({
        success: true,
        data: {
            firstName: user?.firstName,
            lastName: user?.lastName,
            email: user?.email,
            avatar: user?.avatar,
        },
    });
}

export const UpdateSettings = Controller(updateSettings);
async function updateSettings(req: AuthRequest, res: Response) {
    const data = await updateSettingsValidator.parseAsync(req.body);

    const [updatedCount, [user]] = await User.update(
        {
            firstName: data.firstName,
            lastName: data.lastName,
            email: data.email,
        },
        {
            where: {
                id: req.user.userId,
            },
            returning: true,
        }
    );

    if (updatedCount === 0) {
        res.status(500).send({ success: false });
        return;
    }

    res.send({
        success: true,
        data: {
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
        },
    });
}

export const UpdateProfilePic = Controller(updateProfilePic);
async function updateProfilePic(req: AuthRequest, res: Response) {
    const busboy = Busboy({ headers: req.headers });
    const uploadsDir = path.join(__dirname + "/../" + UPLOAD_DIR, "static");
    const filename = crypto.randomUUID() + ".jpg";
    let uploadPath = "";

    busboy.on(
        "file",
        (name: string, file: NodeJS.ReadableStream, info: Busboy.Info) => {
            console.log(info.mimeType);
            if (info.mimeType !== "image/jpeg") {
                res.send({
                    success: false,
                    message: "please upload a jpg file",
                });
                return;
            }

            uploadPath = path.join(uploadsDir, filename);
            const writeStream = fs.createWriteStream(uploadPath);

            file.pipe(writeStream);
        }
    );

    busboy.on("finish", async () => {
        if (!uploadPath) {
            return res.status(400).json({ message: "No file uploaded." });
        }

        const [updatedCount] = await User.update(
            { avatar: filename },
            {
                where: {
                    id: req.user.userId,
                },
            }
        );

        if (updatedCount === 0) {
            res.status(500).send({ success: false });
            return;
        }

        res.status(200).send({
            success: true,
            message: "File uploaded successfully!",
            data: {
                avatar: filename,
            },
        });
    });

    req.pipe(busboy);
}
