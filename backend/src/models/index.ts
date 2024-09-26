import { Sequelize } from 'sequelize'
import { DB_URI } from '../config'

const sequelize = new Sequelize(DB_URI)

export async function initDb() {
	try {
		sequelize.authenticate()
		sequelize.sync()
		console.log("Database connected!")
	} catch (err) {
		console.log(err)
	}
}

export default sequelize
