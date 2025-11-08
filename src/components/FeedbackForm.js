import React, { useState } from 'react';
import '../styles/FeedbackForm.css';

function FeedbackForm() {
  const [feedback, setFeedback] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    alert('Thank you for your feedback!');
    setFeedback('');
  };

  return (
    <div className="feedback-form">
      <h2>Provide Feedback on the App</h2>
      <form onSubmit={handleSubmit}>
        <textarea
          value={feedback}
          onChange={(e) => setFeedback(e.target.value)}
          placeholder="Share your thoughts..."
          required
        />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default FeedbackForm;