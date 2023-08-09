import React from 'react';
import { BrowserRouter as Router, Route, Routes, useParams } from 'react-router-dom'; // Import the necessary components from react-router-dom
import { Chat } from './components/Chat';
import './global.css';
import styles from './App.module.css';

function App() {
  return (
    <Router>
      <div className={styles.application}>
        <Routes>
          {/* Define routes */}
          <Route path="/iframe-chat/:characterId" element={<ChatWrapper />} />
        </Routes>
      </div>
    </Router>
  );
}

function ChatWrapper() {
  const { characterId } = useParams(); // Get the conversationId parameter from the URL

  return <Chat characterId={characterId} />;
}

export default App;
