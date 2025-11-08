import React, { useState } from 'react';
import { InterviewProvider } from '../context/InterviewContext';
import QuestionDisplay from './QuestionDisplay';
import UserInput from './UserInput';
import FeedbackDisplay from './FeedbackDisplay';
import Timer from './Timer';
import ProgressTracker from './ProgressTracker';
import FeedbackForm from './FeedbackForm';
import Header from './Header';


function Dash() {
  const [currentView, setCurrentView] = useState('interview'); // 'interview', 'progress', 'feedback'

  return (
    <InterviewProvider>
      <div className="app">
        <Header />
        <main>
          {currentView === 'interview' && (
            <>
              <QuestionDisplay />
              <UserInput />
              <FeedbackDisplay />
              <Timer />
            </>
          )}
          {currentView === 'progress' && <ProgressTracker />}
          {currentView === 'feedback' && <FeedbackForm />}
        </main>
        <nav className="bottom-nav">
          <button onClick={() => setCurrentView('interview')}>Interview</button>
          <button onClick={() => setCurrentView('progress')}>Progress</button>
          <button onClick={() => setCurrentView('feedback')}>Feedback</button>
        </nav>
      </div>
    </InterviewProvider>
  );
}

export default Dash;