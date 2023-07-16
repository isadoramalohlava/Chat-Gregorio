import { Sidebar } from './components/Sidebar';
import { Chat } from './components/Chat';
import './global.css';
import styles from './App.module.css';

function App() {

  return (

    <div className={styles.application}>
      < Sidebar/>
      < Chat/>
    </div>
  )
}

export default App
