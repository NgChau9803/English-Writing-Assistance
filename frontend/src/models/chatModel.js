const chatModel = (sequelize, DataTypes) => {
  const Chat = sequelize.define('Chat', {
    message: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    response: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
  });

  return Chat;
};

export default chatModel;
