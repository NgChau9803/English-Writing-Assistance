import { useState } from "react";
import "./Dashboard.css";
import "../../normal.css";
import axios from "axios";

function Dashboard() {
  const [input, setInput] = useState("");
  const [chatlog, setChatlog] = useState([]);
  const [chatboxes, setChatboxes] = useState([]);
  const [activeChatbox, setActiveChatbox] = useState(null);

  const createChatbox = () => {
    const newChatbox = { id: Date.now(), name: "New Chat", chats: [] };
    setChatboxes([...chatboxes, newChatbox]);
    setActiveChatbox(newChatbox.id);
  };

  const deleteChatbox = (id) => {
    setChatboxes(chatboxes.filter((chatbox) => chatbox.id !== id));
    if (activeChatbox === id) {
      setActiveChatbox(null);
      setChatlog([]);
    }
  };

  const renameChatbox = (id, newName) => {
    setChatboxes(
      chatboxes.map((chatbox) =>
        chatbox.id === id ? { ...chatbox, name: newName } : chatbox
      )
    );
  };

  async function handleSubmit(e) {
    e.preventDefault();
    if (!activeChatbox) return;

    const newMessage = { message: input, user: "user" };
    const updatedChatboxes = chatboxes.map((chatbox) => {
      if (chatbox.id === activeChatbox) {
        return { ...chatbox, chats: [...chatbox.chats, newMessage] };
      }
      return chatbox;
    });
    setChatboxes(updatedChatboxes);
    setInput("");

    try {
      const response = await axios.post("http://localhost:5000/process-text", {
        text: input,
      });

      // Ensure response.data is in the correct format
      const aiMessage = { message: response.data.message, user: "gemini" };

      setChatboxes(
        updatedChatboxes.map((chatbox) => {
          if (chatbox.id === activeChatbox) {
            return { ...chatbox, chats: [...chatbox.chats, aiMessage] };
          }
          return chatbox;
        })
      );
    } catch (error) {
      console.error("Error:", error);
    }
  }

  return (
    <div className="App">
      <aside className="side-menu">
        <div className="side-menu-button" onClick={createChatbox}>
          <span> + </span>
          New Chat
        </div>

        {chatboxes.map((chatbox) => (
          <div key={chatbox.id} className="chatbox">
            <input
              type="text"
              value={chatbox.name}
              onChange={(e) => renameChatbox(chatbox.id, e.target.value)}
              className="chatbox-name-input"
            />
            <div>
              <button
                className="side-box"
                onClick={() => setActiveChatbox(chatbox.id)}
              >
                Open
              </button>
              <button
                className="side-box-delete"
                onClick={() => deleteChatbox(chatbox.id)}
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </aside>
      <section className="chat-box">
        {activeChatbox && (
          <div className="chat-log">
            {chatboxes
              .find((chatbox) => chatbox.id === activeChatbox)
              .chats.map((message, index) => (
                <ChatMessage key={index} message={message} />
              ))}
          </div>
        )}
        {activeChatbox && (
          <div className="chat-input-holder">
            <form onSubmit={handleSubmit} className="form">
              <textarea
                value={input}
                onChange={(e) => setInput(e.target.value)}
                className="chat-input"
                placeholder="Type a message..."
                rows={1}
              ></textarea>
              <button type="submit" className="submit-button">
                Submit
              </button>
            </form>
          </div>
        )}
      </section>
    </div>
  );
}

const ChatMessage = ({ message }) => {
  return (
    <div className={`chat-message ${message.user}`}>
      <div className="chat-message-center">
        <div
          className={`avatar ${
            message.user === "gemini" ? "gemini-avatar" : "user-avatar"
          }`}
        >
          {message.user.charAt(0).toUpperCase()}
        </div>
        <div className="message">{message.message}</div>
      </div>
    </div>
  );
};

export default Dashboard;
