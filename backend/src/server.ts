import express, { NextFunction, Request, Response } from 'express'
import { initDb } from './models'
import { PORT } from './config'
import userRouter from './routes/user'
import errorHandler from './middlewares/errorHandler'


async function main() {
	const app = express()
	app.use(express.json())

	await initDb()

	app.use("/auth", userRouter)

	app.use(errorHandler)

	app.listen(PORT, () => console.log("Server started on port", PORT))
}
main()
