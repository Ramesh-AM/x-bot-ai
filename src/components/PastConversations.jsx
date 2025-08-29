import React, { useState } from "react";
import { Link } from "react-router-dom";
import logo from "../assets/bot-logo.png";
import { Plus, History, MessageSquare } from "lucide-react";
import Message from "./Message";

export default function PastConversations() {
  const history = JSON.parse(localStorage.getItem("chatHistory") || "[]");
  const [selectedChat, setSelectedChat] = useState(null);

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
            <Link to="/">
              <button className="nav-link text-start mb-2 d-flex align-items-center">
                <Plus size={18} className="me-2" /> New Chat
              </button>
            </Link>
            <button className="nav-link active text-start d-flex align-items-center">
              <History size={18} className="me-2" /> Past Conversations
            </button>
            <Link to="/feedback">
              <button className="nav-link text-start d-flex align-items-center">
                <MessageSquare size={18} className="me-2" /> All Feedback
              </button>
            </Link>
          </nav>
        </div>

        {/* Main Content */}
        <div className="col p-4">
            
            <h2 className="text-center">Conversation History</h2>
          <h5 className="fw-bold mb-3">Today's Chat</h5>

          {/* If no chat selected, show list */}
          {!selectedChat ? (
            <>
              {history.length === 0 && <p>No conversations saved.</p>}
              {history.map((conv, idx) => (
                <div
                  key={idx}
                  className="border p-2 my-2 rounded bg-white shadow-sm"
                  style={{ cursor: "pointer" }}
                  onClick={() => setSelectedChat(conv)}
                >
                  {/* Preview: First bot & user message */}
                  {conv.messages.slice(0, 2).map((m, i) => (
                    <p key={i} className="mb-1">
                      <strong>{m.sender}:</strong> {m.text}
                    </p>
                  ))}
                  <small className="text-muted">Click to view full conversation</small>
                </div>
              ))}
            </>
          ) : (
            <>
              {/* Chat window look for selected conversation */}
              <div
                className="chat-container mb-3 d-flex flex-column"
                style={{ height: "400px", overflowY: "auto" }}
              >
                {selectedChat.messages.map((msg, idx) => (
                  <Message key={idx} msg={msg} />
                ))}
              </div>
              <button
                className="btn btn-secondary"
                onClick={() => setSelectedChat(null)}
              >
                Back to Conversation List
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}