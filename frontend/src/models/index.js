import { Sequelize, DataTypes } from "sequelize";
import userModel from "./userModel.js";
import chatModel from "./chatModel.js";

const sequelize = new Sequelize("SS2", "root", "0354387203", {
	host: "localhost",
	dialect: "mysql",
});

const User = userModel(sequelize, Sequelize);
const Chat = chatModel(sequelize, Sequelize);

User.hasMany(Chat, { foreignKey: 'userId' });
Chat.belongsTo(User, { foreignKey: 'userId' });

const db = {
  sequelize,
  Sequelize,
  User,
  Chat,
};

export default db;
