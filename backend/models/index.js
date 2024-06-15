import User from './user.js';
import Chatbox from './chatbox.js';
import Chat from './chat.js';

// Define associations
User.hasMany(Chatbox, { foreignKey: 'userId' });
Chatbox.belongsTo(User, { foreignKey: 'userId' });

Chatbox.hasMany(Chat, { foreignKey: 'chatboxId' });
Chat.belongsTo(Chatbox, { foreignKey: 'chatboxId' });

export { User, Chatbox, Chat };
