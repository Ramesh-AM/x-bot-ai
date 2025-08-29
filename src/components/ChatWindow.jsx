import React, { useState } from "react";
import { Link } from "react-router-dom";
import sampleData from "../aiData/sampleData.json";
import Message from "./Message";
import FeedbackModal from "./FeedbackModal";
import logo from "../assets/bot-logo.png";
import { Plus, History, MessageSquare } from "lucide-react";

export default function ChatWindow() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [showFeedback, setShowFeedback] = useState(false);

  const handleSubmit = (e) => {
  e.preventDefault();
  if (!input.trim()) return;

  const now = new Date().toISOString();

  const userMsg = { sender: "user", text: input, timestamp: now };

  const match = sampleData.find(
    (item) => item.question.toLowerCase() === input.trim().toLowerCase()
  );

  const botReply = match
    ? match.response
    : "Sorry, Did not understand your query!";

  const aiMsg = { sender: "bot", text: botReply, timestamp: new Date().toISOString() };

  setMessages((prev) => [...prev, userMsg, aiMsg]);
  setInput("");
};

 const handleSaveConversation = () => {
  const history = JSON.parse(localStorage.getItem("chatHistory") || "[]");
  history.push({ messages });
  localStorage.setItem("chatHistory", JSON.stringify(history));
  setShowFeedback(true);
};

  return (
    <div className="container-fluid">
      <div className="row">
        {/* Sidebar */}
        <div className="col-12 col-md-3 col-lg-2 p-0 bg-light sidebar d-flex flex-column align-items-center">
          <div className="py-4 text-center">
            <img
              src={logo}
              alt="Bot AI"
              style={{ width: "40px" }}
              className="mb-2"
            />
            
          </div>
          <nav className="nav flex-column w-100 px-3">
            <Link to="/" onClick={() => setMessages([])}>
              <button className="nav-link active text-start mb-2 d-flex align-items-center">
                <Plus size={18} className="me-2" /> New Chat
              </button>
            </Link>
            <Link to="/history">
              <button className="nav-link text-start d-flex align-items-center">
                <History size={18} className="me-2" /> Past Conversations
              </button>
            </Link>
            <Link to="/feedback">
              <button className="nav-link text-start d-flex align-items-center">
                <MessageSquare size={18} className="me-2" /> All Feedback
              </button>
            </Link>
          </nav>
        </div>

        {/* Main Content */}
       
        <div className="col p-4">
             {/* Page Header */}

          {/* Chat Window */}
          <div
            className="chat-container mb-3 d-flex flex-column"
            style={{ height: "400px", overflowY: "auto" }}
          >
              <header className="mb-3">
                <h1 className="fw-bold">Bot AI</h1>
              </header>
            {/* Quick Suggestions */}
            {messages.length === 0 && (
              <div className="text-center mb-3 mt-5">
                <h1 className="mb-4">How Can I Help You Today?</h1>
                <img
                  src={logo}
                  alt="Bot"
                  style={{ width: "50px" }}
                  className="mb-4"
                />
                <div className="gap-3 d-flex mt-5">
                  {[
                    "Hi, what is the weather",
                    "Hi, what is my location",
                    "Hi, what is the temperature",
                    "Hi, how are you",
                  ].map((q, idx) => (
                    <button
                      key={idx}
                      className="btn btn-light shadow-sm text-start p-3"
                      onClick={() => setInput(q)}
                    >
                      <strong>{q}</strong>
                      <div className="text-muted small">
                        Get immediate AI generated response
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {messages.map((msg, idx) => (
              <Message key={idx} msg={msg} />
            ))}
          </div>

          {/* Input */}
          <form onSubmit={handleSubmit} className="input-group mb-2">
            <input
              type="text"
              className="form-control"
              placeholder="Message Bot AI..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
            />
            <button type="submit" className="btn btn-primary">
              Ask
            </button>
          </form>

          {messages.length > 0 && (
            <button
              type="button"
              className="btn btn-save w-100"
              onClick={handleSaveConversation}
            >
              Save
            </button>
          )}

          {showFeedback && (
            <FeedbackModal
              messages={messages}
              setShowFeedback={setShowFeedback}
            />
          )}
        </div>
      </div>
    </div>
  );
}