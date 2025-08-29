import React, { useState } from "react";

export default function FeedbackModal({ messages, setShowFeedback }) {
  const [rating, setRating] = useState(0);
  const [textFeedback, setTextFeedback] = useState("");

  const handleSubmit = () => {
    const feedbackData = JSON.parse(localStorage.getItem("feedbackData") || "[]");
    feedbackData.push({ rating, textFeedback, messages });
    localStorage.setItem("feedbackData", JSON.stringify(feedbackData));
    setShowFeedback(false);
  };

  return (
    <div className="modal fade show d-block" style={{ background: "rgba(0,0,0,0.5)" }}>
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Rate this Conversation</h5>
            <button type="button" className="btn-close" onClick={() => setShowFeedback(false)}></button>
          </div>
          <div className="modal-body">
            <div className="mb-3">
              {[1, 2, 3, 4, 5].map((num) => (
                <span
                  key={num}
                  onClick={() => setRating(num)}
                  style={{ cursor: "pointer", fontSize: "1.5rem" }}
                  className={num <= rating ? "text-warning" : "text-secondary"}
                >
                  ★
                </span>
              ))}
            </div>
            <textarea
              placeholder="Your feedback..."
              value={textFeedback}
              onChange={(e) => setTextFeedback(e.target.value)}
              className="form-control"
              rows="3"
            ></textarea>
          </div>
          <div className="modal-footer">
            <button className="btn btn-success" onClick={handleSubmit}>Submit</button>
            <button className="btn btn-secondary" onClick={() => setShowFeedback(false)}>Cancel</button>
          </div>
        </div>
      </div>
    </div>
  );
}