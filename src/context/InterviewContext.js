import React, { createContext, useState, useEffect } from 'react';
import questions from '../data/questions';

export const InterviewContext = createContext();

export const InterviewProvider = ({ children }) => {
  const [currentQuestion, setCurrentQuestion] = useState(null);
  const [userResponse, setUserResponse] = useState('');
  const [feedback, setFeedback] = useState(null);
  const [category, setCategory] = useState('Technical');
  const [sessions, setSessions] = useState([]);

  useEffect(() => {
    const savedSessions = JSON.parse(localStorage.getItem('interviewSessions')) || [];
    setSessions(savedSessions);
  }, []);

  const selectCategory = (cat) => {
    setCategory(cat);
    randomizeQuestion(cat);
  };

  const randomizeQuestion = (cat) => {
    const filtered = questions.filter(q => q.category === cat);
    const random = filtered[Math.floor(Math.random() * filtered.length)];
    setCurrentQuestion(random);
    setUserResponse('');
    setFeedback(null);
  };

  const submitResponse = async () => {
    try {
      const apiKey = process.env.REACT_APP_OPENAI_API_KEY;
      if (!apiKey) {
        throw new Error('API key not found. Set REACT_APP_OPENAI_API_KEY in .env');
      }

      const response = await fetch('https://api.openai.com/v1/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${apiKey}`,
        },
        body: JSON.stringify({
          model: 'text-davinci-003',
          prompt: `Analyze this interview response: "${userResponse}". Provide a score out of 100, list strengths, and list areas for improvement. Format: Score: [number], Strengths: [list], Improvements: [list].`,
          max_tokens: 300,
          temperature: 0.7,
        }),
      });

      if (!response.ok) {
        throw new Error(`API error: ${response.status}`);
      }

      const data = await response.json();
      const feedbackText = data.choices[0].text.trim();

      const scoreMatch = feedbackText.match(/Score:\s*(\d+)/);
      const score = scoreMatch ? parseInt(scoreMatch[1], 10) : 50;

      const strengthsMatch = feedbackText.match(/Strengths:\s*(.+?)(?=Improvements:|$)/s);
      const strengths = strengthsMatch ? strengthsMatch[1].trim().split(',').map(s => s.trim()) : ['Good effort'];

      const improvementsMatch = feedbackText.match(/Improvements:\s*(.+)$/s);
      const improvements = improvementsMatch ? improvementsMatch[1].trim().split(',').map(i => i.trim()) : ['Practice more'];

      const mockFeedback = {
        score,
        strengths,
        improvements,
      };

      setFeedback(mockFeedback);

      const newSession = { question: currentQuestion, response: userResponse, feedback: mockFeedback, date: new Date() };
      const updatedSessions = [...sessions, newSession];
      setSessions(updatedSessions);
      localStorage.setItem('interviewSessions', JSON.stringify(updatedSessions));
    } catch (error) {
      console.error('API call failed:', error);
      const mockFeedback = {
        score: Math.floor(Math.random() * 100),
        strengths: ['Clear response'],
        improvements: ['Add more details'],
      };
      setFeedback(mockFeedback);

      const newSession = { question: currentQuestion, response: userResponse, feedback: mockFeedback, date: new Date() };
      const updatedSessions = [...sessions, newSession];
      setSessions(updatedSessions);
      localStorage.setItem('interviewSessions', JSON.stringify(updatedSessions));
    }
  };

  return (
    <InterviewContext.Provider value={{
      currentQuestion,
      userResponse,
      setUserResponse,
      feedback,
      category,
      selectCategory,
      randomizeQuestion,
      submitResponse,
      sessions,
    }}>
      {children}
    </InterviewContext.Provider>
  );
};