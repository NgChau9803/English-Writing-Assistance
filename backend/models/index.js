import { Sequelize, DataTypes } from "sequelize";

const sequelize = new Sequelize("database", "username", "password", {
	host: "localhost",
	dialect: "mysql",
});

const User = sequelize.define(
	"User",
	{
		googleId: {
			type: DataTypes.STRING,
			unique: true,
			allowNull: false,
		},
		name: {
			type: DataTypes.STRING,
			allowNull: false,
		},
	},
	{}
);

const Chat = sequelize.define(
	"Chat",
	{
		message: {
			type: DataTypes.TEXT,
			allowNull: false,
		},
		response: {
			type: DataTypes.TEXT,
			allowNull: false,
		},
	},
	{}
);

User.hasMany(Chat);
Chat.belongsTo(User);

module.exports = { sequelize, User, Chat };
