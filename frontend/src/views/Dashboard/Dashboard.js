import React, { useEffect, useState } from "react";
import "./Dashboard.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Dashboard() {
	const [input, setInput] = useState("");
	const [chatboxes, setChatboxes] = useState([]);
	const [activeChatbox, setActiveChatbox] = useState(null);
	const navigate = useNavigate();

	useEffect(() => {
		const query = new URLSearchParams(window.location.search);
		const token = query.get("token");

		if (token) {
			localStorage.setItem("authToken", token);
			navigate("/dashboard", { replace: true });
		} else {
			const storedToken = localStorage.getItem("authToken");
			if (!storedToken) {
				console.error("No auth token found");
				navigate("/");
				return;
			}
			fetchChatboxes(storedToken);
		}
	}, [navigate]);

	const fetchChatboxes = async (token) => {
		try {
			const response = await axios.get(
				"http://localhost:5000/processText/getChats",
				{
					headers: { Authorization: `Bearer ${token}` },
				}
			);
			setChatboxes(response.data);
		} catch (error) {
			console.error("Error fetching chatboxes:", error);
		}
	};

    const fetchChatboxById = async (id) => {
        const token = localStorage.getItem("authToken");
        try {
            const response = await axios.get(
                `http://localhost:5000/processText/getChat/${id}`,
                {
                    headers: { Authorization: `Bearer ${token}` },
                }
            );
    
            // Ensure chats array is always initialized
            return { ...response.data, chats: response.data.chats || [] };
        } catch (error) {
            console.error("Error fetching chatbox:", error);
            return { chats: [] }; // Return an empty chat array in case of error
        }
    };
	// const fetchChatboxById = async (id) => {
	// 	const token = localStorage.getItem("authToken");
	// 	try {
	// 		const response = await axios.get(
	// 			`http://localhost:5000/processText/getChat/${id}`,
	// 			{
	// 				headers: { Authorization: `Bearer ${token}` },
	// 			}
	// 		);
	// 		return response.data;
	// 	} catch (error) {
	// 		console.error("Error fetching chatbox:", error);
	// 	}
	// };

	const createChatbox = async () => {
		const token = localStorage.getItem("authToken");
		const response = await axios.post(
			"http://localhost:5000/processText/createChats",
			{ userId: 1, message: "" },
			{
				headers: { Authorization: `Bearer ${token}` },
			}
		);
		const newChatbox = { id: response.data.id, name: "New Chat", chats: [] };
		setChatboxes([...chatboxes, newChatbox]);
		setActiveChatbox(newChatbox.id);
	};

	const deleteChatbox = async (id) => {
		const token = localStorage.getItem("authToken");
		await axios.post(
			`http://localhost:5000/processText/deleteChat/${id}`,
			{},
			{
				headers: { Authorization: `Bearer ${token}` },
			}
		);
		setChatboxes(chatboxes.filter((chatbox) => chatbox.id !== id));
		if (activeChatbox === id) {
			setActiveChatbox(null);
		}
	};

	const renameChatbox = async (id, newName) => {
		const token = localStorage.getItem("authToken");
		try {
			await axios.patch(
				`http://localhost:5000/processText/renameChat/${id}`,
				{ newName },
				{
					headers: { Authorization: `Bearer ${token}` },
				}
			);
			setChatboxes(
				chatboxes.map((chatbox) =>
					chatbox.id === id ? { ...chatbox, name: newName } : chatbox
				)
			);
		} catch (error) {
			console.error("Error renaming chatbox:", error);
		}
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		if (!activeChatbox) return;

		const newMessage = { message: input, user: "user" };
		const updatedChatboxes = chatboxes.map((chatbox) => {
			if (chatbox.id === activeChatbox) {
				const chats = chatbox.chats || [];
				return { ...chatbox, chats: [...chats, newMessage] };
			}
			return chatbox;
		});
		setChatboxes(updatedChatboxes);
		setInput("");

		try {
			const token = localStorage.getItem("authToken");
			const response = await axios.post(
				"http://localhost:5000/processText",
				{
					chatboxId: activeChatbox,
					text: input,
				},
				{
					headers: { Authorization: `Bearer ${token}` },
				}
			);

			const aiMessage = { message: response.data.response, user: "gemini" };

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
	};

	// const openChatbox = async (id) => {
	// 	const token = localStorage.getItem("authToken");
	// 	const chatbox = await fetchChatboxById(id, token);
	// 	setChatboxes(
	// 		chatboxes.map((cb) =>
	// 			cb.id === id ? { ...cb, chats: chatbox.chats } : cb
	// 		)
	// 	);
	// 	setActiveChatbox(id);
	// };
    const openChatbox = async (id) => { //handle err by try catch
        try {
            const token = localStorage.getItem("authToken");
            const chatbox = await fetchChatboxById(id);
            setChatboxes(
                chatboxes.map((cb) =>
                    cb.id === id ? { ...cb, chats: chatbox.chats || [] } : cb
                )
            );
            setActiveChatbox(id);
        } catch (error) {
            console.error("Error opening chatbox:", error);
        }
    };

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
						<button onClick={() => openChatbox(chatbox.id)}>Open</button>
						<button onClick={() => deleteChatbox(chatbox.id)}>Delete</button>
					</div>
				))}
			</aside>
			<section className="chat-box">
				{activeChatbox && (
					<div className="chat-log">
						{chatboxes
							.find((chatbox) => chatbox.id === activeChatbox)
							.chats?.map((message, index) => (
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
								rows={1}></textarea>
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

// const ChatMessage = ({ message }) => {
// 	return (
// 		<div className={`chat-message ${message.user}`}>
// 			<div className="chat-message-center">
// 				<div
// 					className={`avatar ${
// 						message.user === "gemini" ? "gemini-avatar" : "user-avatar"
// 					}`}>
// 					{message.user.charAt(0).toUpperCase()}
// 				</div>
// 				<div className="message">{message.message}</div>
// 			</div>
// 		</div>
// 	);
// };
const ChatMessage = ({ message }) => {
    if (!message || !message.user || !message.message) {
        return null; // or some fallback UI
    }

    return (
        <div className={`chat-message ${message.user}`}>
            <div className="chat-message-center">
                <div
                    className={`avatar ${
                        message.user === "gemini" ? "gemini-avatar" : "user-avatar"
                    }`}>
                    {message.user.charAt(0).toUpperCase()}
                </div>
                <div className="message">{message.message}</div>
            </div>
        </div>
    );
};

export default Dashboard;
