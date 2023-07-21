import { Sidebar } from './components/Sidebar';
import { Chat } from './components/Chat';
import './global.css';
import styles from './App.module.css';
import { useState } from 'react';

function App() {
  const [activeChat, setActiveChat] = useState(null);

  return (

    <div className={styles.application}>
      <Sidebar setActiveChat={setActiveChat} />
      {activeChat && <Chat conversationId={activeChat} />}
      {/* <Chat chat={activeChat} /> */}
    </div>
  )
}

export default App
