import express from 'express'
import { initDb } from './models'
import { PORT } from './config'


async function main() {
	const app = express()

	await initDb()
	app.listen(PORT, () => console.log("Server started on port", PORT))
}
main()
