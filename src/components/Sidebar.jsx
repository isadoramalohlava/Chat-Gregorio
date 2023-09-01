import styles from './Sidebar.module.css';
import React from "react";
import { MagnifyingGlass } from "@phosphor-icons/react";
import { useEffect, useState } from 'react';

export function Sidebar({ setActiveChat }) {
    const [chats, setChats] = useState([]);

  useEffect(() => {
    // Fetch chats data from an API endpoint
    const fetchChats = async () => {
      try {
        const response = await fetch(`http://localhost:8000/api/v1/chatbot/conversations/`, {
            headers: {
                Authorization:'Basic YWRtaW46YWRtaW4=',
            },
          });
        const data = await response.json();
        setChats(data.results);
      } catch (error) {
        console.error('Error:', error);
      }
    };

    fetchChats();
  }, []);
    const handleChatSelect = (chat) => {
        console.log(chat);
        setActiveChat(chat);
      };

    return (
        <aside>
            <div className={styles.user}> 
                <img className={styles.avatar} id={styles.userImg} src='https://images.unsplash.com/photo-1510915228340-29c85a43dcfe?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=300&q=50'></img>
                <div id={styles.userName}>
                <h1>Mariana</h1>
                <h3>Minha conta</h3>
                </div>
                <span>200 Crd</span>
            </div>
           
            <div className={styles.wrapper}>
                <div className={styles.icon}><MagnifyingGlass size={32} color='#BBBBBB'/></div>
                <input type="text" name="" id="" className={styles.input} placeholder='Procurar...'/>       
            </div>

            <div>
                <h1 className={styles.myConversation}>Meus Dublês</h1>

            </div>

            <div>
            {chats.map((chat) => (
        <div key={chat.id} className={styles.chats} onClick={() => handleChatSelect({id:chat.id,prebuildMEssages:chat.prebuild_messages})}>
          <img className={styles.avatar} src={chat.character_avatar} alt="" />
          <div>
            <h1>{chat.title}</h1>
            {/* <h3>{chat.title}</h3> */}
          </div>
          <time>{chat.created_at}</time>
        </div>
      ))}
            </div>
            <button className={styles.button}>SAIR</button>

        </aside> 
        );
    }