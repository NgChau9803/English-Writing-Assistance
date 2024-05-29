import { useState } from "react";
import "./Dashboard.css";
import "../../normal.css";
import axios from "axios";

function Dashboard() {
	const [input, setInput] = useState("");
	const [chatlog, setChatlog] = useState<{ message: string; user: string }[]>(
		[]
	);

	async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
		e.preventDefault();
		const newMessage = { message: `${input}`, user: "user" };
		const newChatlog = [...chatlog, newMessage];
		setChatlog(newChatlog);
		setInput("");

		try {
			const response = await fetch("http://localhost:3000", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					messages: newChatlog.map((message) => message.message).join(" "),
				}),
			});
			const data = await response.json();
			console.log(data);
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
					<div className="chat-message gemini">
						<div className="chat-message-center">
							<div className="avatar gemini"></div>
							<div className="message">AI will answer here</div>
						</div>
					</div>
				</div>
				<div className="chat-input-holder">
						<form onSubmit={handleSubmit} className="form">
							<textarea
								value={input}
								onChange={(e) => setInput(e.target.value)}
								className="chat-input"
								placeholder="Type a message..."
								rows={1}></textarea>
							<button type="submit" className="submit-button">
								Submit
							</button>
						</form>
				</div>
			</section>
		</div>
	);
}

const ChatMessage = ({
	message,
}: {
	message: { message: string; user: string };
}) => {
	return (
		<div className={`chat-message ${message.user}`}>
			<div className="chat-message-center">
				<div className={`avatar ${message.user === "gemini" ? "gemini" : ""}`}>
					{message.user.charAt(0).toUpperCase()}
				</div>
				<div className="message">{message.message}</div>
			</div>
		</div>
	);
};

export default Dashboard;
