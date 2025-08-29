import React, { useState } from "react";
import { Link } from "react-router-dom";
import logo from "../assets/bot-logo.png";
import { Plus, History, MessageSquare } from "lucide-react";
import Message from "./Message";

export default function FeedbackList() {
  const feedbacks = JSON.parse(localStorage.getItem("feedbackData") || "[]");
  const [filter, setFilter] = useState(0);
  const [selectedFeedback, setSelectedFeedback] = useState(null);

  const filtered = filter
    ? feedbacks.filter((f) => f.rating === filter)
    : feedbacks;

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
            <Link to="/history">
              <button className="nav-link text-start mb-2 d-flex align-items-center">
                <History size={18} className="me-2" /> Past Conversations
              </button>
            </Link>
            <button className="nav-link active text-start d-flex align-items-center">
              <MessageSquare size={18} className="me-2" /> All Feedback
            </button>
          </nav>
        </div>

        {/* Main Content */}
        <div className="col p-4">
          <h5 className="fw-bold mb-3">All Feedback</h5>

          {/* Filter */}
          <select
            className="form-select w-auto mb-3"
            value={filter}
            onChange={(e) => setFilter(Number(e.target.value))}
          >
            <option value={0}>All Ratings</option>
            {[1, 2, 3, 4, 5].map((num) => (
              <option key={num} value={num}>
                {num} Stars
              </option>
            ))}
          </select>

          {/* If no conversation selected, show list */}
          {!selectedFeedback ? (
            <>
              {filtered.length === 0 && <p>No feedback found.</p>}
              {filtered.map((fb, idx) => (
                <div
                  key={idx}
                  className="border p-2 my-2 rounded bg-white shadow-sm"
                  style={{ cursor: "pointer" }}
                  onClick={() => setSelectedFeedback(fb)}
                >
                  <p className="mb-1">⭐ {fb.rating}</p>
                  <p className="mb-0 text-truncate">
                    {fb.textFeedback || "No additional feedback"}
                  </p>
                  <small className="text-muted">
                    Click to view conversation
                  </small>
                </div>
              ))}
            </>
          ) : (
            <>
              {/* Conversation View */}
              <div
                className="chat-container mb-3 d-flex flex-column"
                style={{ height: "400px", overflowY: "auto" }}
              >
                {selectedFeedback.messages.map((msg, idx) => (
                  <Message key={idx} msg={msg} />
                ))}
              </div>

              {/* Feedback details */}
              <div className="p-3 border rounded bg-light mb-3">
                <p className="mb-1">⭐ Rating: {selectedFeedback.rating}</p>
                <p className="mb-0">
                  💬 Feedback:{" "}
                  {selectedFeedback.textFeedback || "No additional comment"}
                </p>
              </div>

              <button
                className="btn btn-secondary"
                onClick={() => setSelectedFeedback(null)}
              >
                Back to Feedback List
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}