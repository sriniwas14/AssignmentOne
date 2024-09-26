import express from "express";
import cors from 'cors'
import { PORT } from "./config";
import errorHandler from "./middlewares/errorHandler";
import { initDb } from "./models";
import authRouter from "./routes/auth";
import userRouter from "./routes/user";
import authChecker from "./middlewares/authChecker";

async function main() {
	const app = express();
	app.use(express.json());
	app.use(cors());
	await initDb();

	app.use("/auth", authRouter);

	app.use(authChecker);

	app.use("/user", userRouter);

	app.use(errorHandler);

	app.listen(PORT, () => console.log("Server started on port", PORT));
}
main();
