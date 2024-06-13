import { useState } from "react";
import "./Dashboard.css";
import "../../normal.css";
import axios from "axios";

function Dashboard() {
  const [input, setInput] = useState("");
  const [chatlog, setChatlog] = useState([]);

  async function handleSubmit(e) {
    e.preventDefault();
    const newMessage = { message: input, user: "user" };
    const newChatlog = [...chatlog, newMessage];
    setChatlog(newChatlog);
    setInput("");

    try {
      const response = await axios.post("http://localhost:5000/process-text", {
        text: input,
      });
      setChatlog([...newChatlog, response.data]);
    } catch (error) {
      console.error("Error:", error);
    }
  }

  return (
    <div className="App">
      <aside className="side-menu">
        <div className="side-menu-button">
          <span> + </span>
          New Chat
        </div>
      </aside>
      <section className="chat-box">
        <div className="chat-log">
          {chatlog.map((message, index) => (
            <ChatMessage key={index} message={message} />
          ))}
        </div>
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
      </section>
    </div>
  );
}

const ChatMessage = ({ message }) => {
  return (
    <div className={`chat-message ${message.user}`}>
      <div className="chat-message-center">
        <div className={`avatar ${message.user === "gemini" ? "" : ""}`}>
          {message.user.toUpperCase()}
        </div>
        <div className="message">{message.message}</div>
      </div>
    </div>
  );
};
export default Dashboard;
