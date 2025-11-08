import React, { useContext } from 'react';
import { InterviewContext } from '../context/InterviewContext';
import '../styles/QuestionDisplay.css';

function QuestionDisplay() {
  const { currentQuestion, category, selectCategory, randomizeQuestion } = useContext(InterviewContext);

  return (
    <div className="question-display">
      <select value={category} onChange={(e) => selectCategory(e.target.value)}>
        <option value="Technical">Technical</option>
        <option value="Behavioral">Behavioral</option>
      </select>
      <button onClick={() => randomizeQuestion(category)}>Randomize Question</button>
      {currentQuestion && <p className="question">{currentQuestion.text}</p>}
    </div>
  );
}

export default QuestionDisplay;