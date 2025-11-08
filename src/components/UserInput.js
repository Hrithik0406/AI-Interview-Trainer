import React, { useContext, useState, useEffect } from 'react';
import { InterviewContext } from '../context/InterviewContext';
import '../styles/UserInput.css';

function UserInput() {
  const { userResponse, setUserResponse, submitResponse } = useContext(InterviewContext);
  const [isListening, setIsListening] = useState(false);
  const [recognition, setRecognition] = useState(null);

  useEffect(() => {
    if (window.location.protocol !== 'https:' && window.location.hostname !== 'localhost') {
      console.warn('Speech recognition requires HTTPS. Voice input may not work.');
    }

    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (SpeechRecognition) {
      const rec = new SpeechRecognition();
      rec.continuous = false;
      rec.interimResults = false;  // Set to true if you want real-time updates
      rec.lang = 'en-US';

      rec.onstart = () => {
        console.log('Speech recognition started');
        setIsListening(true);
      };

      rec.onresult = (event) => {
        console.log('Speech recognition result event:', event);
        const transcript = event.results[0][0].transcript;
        console.log('Transcript:', transcript);
        if (transcript) {
          setUserResponse(prev => prev + ' ' + transcript);
        } else {
          console.warn('Empty transcript received');
        }
      };

      rec.onend = () => {
        console.log('Speech recognition ended');
        setIsListening(false);
      };

      rec.onerror = (event) => {
        console.error('Speech recognition error:', event.error);
        setIsListening(false);
        let message = 'Voice input failed.';
        if (event.error === 'not-allowed') {
          message = 'Microphone access denied. Please enable permissions and try again.';
        } else if (event.error === 'no-speech') {
          message = 'No speech detected. Try speaking louder or closer to the microphone.';
        } else if (event.error === 'network') {
          message = 'Network error. Check your connection.';
        } else if (event.error === 'service-not-allowed') {
          message = 'Speech service not allowed. Try a different browser.';
        }
        alert(message);
      };

      setRecognition(rec);
    } else {
      console.error('Speech recognition not supported');
    }
  }, [setUserResponse]);

  const handleVoiceInput = () => {
    if (!recognition) {
      alert('Speech recognition is not supported in this browser. Please use Chrome on Android or desktop for best results.');
      return;
    }

    if (isListening) {
      recognition.stop();
    } else {
      try {
        recognition.start();
        console.log('Starting speech recognition');
      } catch (error) {
        console.error('Failed to start recognition:', error);
        alert('Unable to start voice input. Ensure microphone permissions are granted.');
      }
    }
  };

  return (
    <div className="user-input">
      <textarea
        value={userResponse}
        onChange={(e) => setUserResponse(e.target.value)}
        placeholder="Type your response here or use voice input..."
      />
      <div className="button-group">
        <button onClick={handleVoiceInput}>
          {isListening ? 'Stop Voice Input' : 'Start Voice Input'}
        </button>
        <button onClick={submitResponse}>Submit Response</button>
      </div>
    </div>
  );
}

export default UserInput;