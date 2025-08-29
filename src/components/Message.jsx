import React, { useState } from "react";
import { ThumbsUp, ThumbsDown } from "lucide-react";
import aiLogo from "../assets/bot-logo.png";
import userLogo from "../assets/user-logo.png";

export default function Message({ msg }) {
  const isBot = msg.sender === "bot";

  // state to store reaction
  const [reaction, setReaction] = useState(null);

  const handleReaction = (type) => {
    setReaction(type);
    console.log(`Reaction for message: ${type}`); // Here you could send it to backend if needed
  };

  // Format timestamp to a readable string
  const formatTimestamp = (timestamp) => {
  const date = timestamp ? new Date(timestamp) : new Date();
  return date.toLocaleString(undefined, {
    dateStyle: "short",
    timeStyle: "short",
  });
};

  return (
    <div
      className={`d-flex mb-2 ${
        isBot ? "justify-content-start" : "justify-content-end"
      }`}
    >
      {/* Avatar image */}
      {isBot && (
        <img
          src={aiLogo}
          alt="AI"
          className="me-2"
          style={{ width: 35, height: 35, borderRadius: "50%" }}
        />
      )}
      <div
        className={`message-bubble ${isBot ? "message-bot" : "message-user"}`}
        style={{ maxWidth: "70%" }}
      >
        {isBot && <span className="fw-bold me-1">Soul AI</span>}
        <p className="mb-1">{msg.text}</p>

        {/* Reaction buttons and time */}
        <div
          style={{
            display: "flex",
            gap: "8px",
            marginTop: "4px",
            alignItems: "center",
          }}
        >
          <ThumbsUp
            size={18}
            onClick={() => handleReaction("like")}
            color={reaction === "like" ? "green" : "gray"}
            style={{ cursor: "pointer" }}
          />
          <ThumbsDown
            size={18}
            onClick={() => handleReaction("dislike")}
            color={reaction === "dislike" ? "red" : "gray"}
            style={{ cursor: "pointer" }}
          />
          {/* Show formatted date/time */}
          <span style={{ fontSize: 12, color: "black", marginLeft: "auto" }}>
            {formatTimestamp(msg.timestamp)}
          </span>
        </div>
      </div>

      {/* User avatar */}
      {!isBot && (
        <img
          src={userLogo}
          alt="User"
          className="ms-2"
          style={{ width: 35, height: 35, borderRadius: "50%" }}
        />
      )}
    </div>
  );
}