import React, { useContext } from 'react';
import { InterviewContext } from '../context/InterviewContext';
import '../styles/ProgressTracker.css';

function ProgressTracker() {
  const { sessions } = useContext(InterviewContext);

  // Defensive: Always fallback to an empty array if sessions is undefined or null.
  const safeSessions = Array.isArray(sessions) ? sessions : [];

  return (
    <div className="progress-tracker">
      <h2>Your Interview Sessions</h2>
      {safeSessions.length === 0 ? (
        <p>No sessions available.</p>
      ) : (
        safeSessions.map((session, index) => {
          if (!session) return null; // skip null sessions

          // Safely read properties, fallback if nested data missing
          const questionText =
            session.question && session.question.text
              ? session.question.text
              : "No question";
          const response =
            typeof session.response === "string"
              ? session.response
              : "No response";
          const score =
            session.feedback && typeof session.feedback.score !== "undefined"
              ? session.feedback.score
              : "No score";
          const date =
            session.date
              ? new Date(session.date).toLocaleString()
              : "Unknown date";

          return (
            <div key={index} className="session">
              <p><strong>Question:</strong> {questionText}</p>
              <p><strong>Response:</strong> {response}</p>
              <p><strong>Score:</strong> {score}</p>
              <p><strong>Date:</strong> {date}</p>
            </div>
          );
        })
      )}
    </div>
  );
}

export default ProgressTracker;