import { DataTypes } from 'sequelize'
import sequelize from './index'

sequelize.define('users', {
	id: {
		type: DataTypes.STRING,
		autoIncrement: true,
		primaryKey: true
	},
	firstName: {
		type: DataTypes.STRING,
		allowNull: false
	},
	lastName: {
		type: DataTypes.STRING,
		allowNull: false
	},
	email: {
		type: DataTypes.STRING,
		allowNull: false
	},
	password: {
		type: DataTypes.STRING,
		allowNull: false
	},
	avatar: {
		type: DataTypes.STRING
	}
})
