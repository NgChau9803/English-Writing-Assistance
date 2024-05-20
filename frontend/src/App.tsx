import "./App.css";
import { useState } from "react";
import "./normal.css";
import axios from "axios";

function App() {
	const [input, setInput] = useState("");
	const [chatlog, setChatlog] = useState<{ message: string; user: string }[]>(
		[]
	);

	async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
		e.preventDefault();
		setChatlog([...chatlog, { message: `${input}`, user: "user" }]);
		setInput("");
		// fetch response to the api conbining the chat log array of messages and sending it as a message to localhost:3000 as a post
		const response = await fetch("http://localhost:3000", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				messages: chatlog.map((message) => message.message).join(""),
			}),
		});
		const data = await response.json();
		console.log(data);
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
							<div className="message">I AM AI</div>
						</div>
					</div>
				</div>
				<div className="chat-input-holder">
					<form onSubmit={handleSubmit}>
						<input
							value={input}
							onChange={(e) => {
								setInput(e.target.value);
							}}
							className="chat-input"
							placeholder="Type a message..."></input>
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
		<div className="chat-message">
			<div className="chat-message-center">
				<div className="avatar">{`avatar ${message.user === "gemini"}`}</div>
				<div className="message">{message.message}</div>
			</div>
		</div>
	);
};

export default App;
