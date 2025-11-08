import React, { useState } from 'react';
import { InterviewProvider } from './context/InterviewContext';
import Header from './components/Header';
import About from './components/About';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Contact from './components/Contact';
import QuestionDisplay from './components/QuestionDisplay';
import UserInput from './components/UserInput';
import FeedbackDisplay from './components/FeedbackDisplay';
import Timer from './components/Timer';
import ProgressTracker from './components/ProgressTracker';
import FeedbackForm from './components/FeedbackForm';
import './styles/App.css';

function App() {
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

export default App;