import React from 'react';
import Page from './components/Page';
import { HashRouter } from 'react-router-dom';

function App() {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<Page />} />
       
      </Routes>
    </HashRouter>
  );
}

export default App;