import express from "express";
import cors from 'cors'
import { PORT, UPLOAD_DIR } from "./config";
import errorHandler from "./middlewares/errorHandler";
import { initDb } from "./models";
import authRouter from "./routes/auth";
import userRouter from "./routes/user";
import authChecker from "./middlewares/authChecker";
import fs from 'fs'
import path from 'path'

async function main() {
	// Create the `static` folder if not present
	const uploadsDir = path.join(__dirname + "/" + UPLOAD_DIR, 'static');
	if (!fs.existsSync(uploadsDir)) {
		fs.mkdirSync(uploadsDir);
	}

	const app = express();
	app.use(express.json());
	app.use(cors());
	await initDb();

	app.use('/static', express.static(uploadsDir));
	app.use("/auth", authRouter);

	app.use(authChecker);

	app.use("/user", userRouter);

	app.use(errorHandler);

	app.listen(PORT, () => console.log("Server started on port", PORT));
}
main();
