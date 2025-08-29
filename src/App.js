import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ChatWindow from "./components/ChatWindow";
import PastConversations from "./components/PastConversations";
import FeedbackList from "./components/FeedbackList";

export default function App() {
  return (
    <Router>
      {/* <nav className="p-4 bg-gray-200 flex gap-4">
        <Link to="/">Chat with Bot</Link>
        <Link to="/history">Past Conversations</Link>
        <Link to="/feedback">All Feedback</Link>
      </nav> */}
      <Routes>
        <Route path="/" element={<ChatWindow />} />
        <Route path="/history" element={<PastConversations />} />
        <Route path="/feedback" element={<FeedbackList />} />
      </Routes>
    </Router>
  );
}