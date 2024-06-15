import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";

const Chat = sequelize.define(
	"Chat",
	{
		id: {
			type: DataTypes.INTEGER,
			autoIncrement: true,
			primaryKey: true,
		},
		chatboxId: {
			type: DataTypes.INTEGER,
			references: {
				model: "Chatboxes",
				key: "id",
			},
		},
		message: {
			type: DataTypes.TEXT,
		},
		response: {
			type: DataTypes.TEXT,
		},
	},
	{
		timestamps: true,
		createdAt: "createdAt",
		updatedAt: "updatedAt",
	}
);

export default Chat;
