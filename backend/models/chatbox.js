import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";

const Chatbox = sequelize.define(
	"Chatbox",
	{
		id: {
			type: DataTypes.INTEGER,
			autoIncrement: true,
			primaryKey: true,
		},
		userId: {
			type: DataTypes.INTEGER,
			references: {
				model: "Users",
				key: "id",
			},
		},
		name: {
			type: DataTypes.STRING,
			allowNull: false,
		},
	},
	{
		timestamps: true,
		createdAt: "createdAt",
		updatedAt: "updatedAt",
	}
);

export default Chatbox;
