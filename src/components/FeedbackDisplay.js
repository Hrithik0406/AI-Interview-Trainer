import React, { useContext } from 'react';
import { InterviewContext } from '../context/InterviewContext';
import '../styles/FeedbackDisplay.css';

function FeedbackDisplay() {
  const { feedback } = useContext(InterviewContext);

  if (!feedback) return null;

  return (
    <div className="feedback-display">
      <h3>Feedback</h3>
      <p>Score: {feedback.score}/100</p>
      <p><strong>Strengths:</strong> {feedback.strengths.join(', ')}</p>
      <p><strong>Areas for Improvement:</strong> {feedback.improvements.join(', ')}</p>
    </div>
  );
}

export default FeedbackDisplay;