import styles from './Chat.module.css';
import { DotsThreeVertical, PlusCircle, PaperPlaneTilt } from "@phosphor-icons/react";
import { useState, useEffect } from 'react';

export function Chat({ conversationId }) {
    const [conversation, setConversation] = useState([]);
    const [newMessage, setNewMessage] = useState('');
    const [prebuildMEssages, setPrebuildMEssages] = useState([]);

    useEffect(() => {
      const fetchConversation = async () => {
        try {
          const response = await fetch(`http://127.0.0.1:8000/api/v1/chatbot/conversations/${conversationId.id}/messages/`, {
            headers: {
                Authorization:'Basic YWRtaW46YWRtaW4=',
            },
          });
          const data = await response.json();
          setConversation(data.results.reverse());
          console.log(data);
        } catch (error) {
          console.error('Error:', error);
        }
      };
      fetchConversation();
    }, [conversationId.id]);

    const getLastMessageId = () => {
        if (conversation.length > 0) {
          const lastMessage = conversation[conversation.length - 1];
          return lastMessage.id;
        }
        return null;
    };

    const sendMessage = async () => {
        event.preventDefault();
        const message = {
            id: Date.now(),
            content: newMessage,
            is_from_user: true,
            created_at: new Date().toISOString(),
        };
        setConversation([...conversation, message]);
        setNewMessage('');
        try {
            const response = await fetch(`http://127.0.0.1:8000/api/v1/chatbot/conversations/${conversationId.id}/messages/create/`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: 'Basic YWRtaW46YWRtaW4=',
                },
                body: JSON.stringify({
                    conversation: conversationId.id,
                    content: newMessage,
                    is_from_user: true,
                    in_reply_to: getLastMessageId(),
                }),
            });
            if (response.ok) {
                const data = await response.json();
                const resp = {
                    id: Date.now(),
                    content: data.response,
                    is_from_user: false,
                    created_at: 'agora',
                };
                console.log(data);
                setConversation([...conversation, message, resp]);
            } else {
                console.error('Error:', response.status);
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    return (
        <div>
            <header>
                <div>
                    <img className={styles.avatar} src="https://images.unsplash.com/photo-1510915228340-29c85a43dcfe?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=300&q=50" alt="" />
                </div>
                <div id={styles.userConversation}>
                    <h1>Rafael Pereira</h1>
                    <span>Disponível</span>
                </div>
                <div id={styles.icon}>
                    <a href=""><DotsThreeVertical size={32} /></a>
                </div>
            </header>
            <div className={styles.Chat}>
                {conversation.map((message, index) => (
                    message.is_from_user ? (
                        <div key={index} id={styles.conversation1}>
                            <p>{message.content}</p>
                            <time className={styles.timeConversation}>{message.created_at}</time>
                        </div>
                    ) : (
                        <div key={index} id={styles.conversation2}>
                            <p>{message.content}</p>
                            <time className={styles.timeConversation}>{message.created_at}</time>
                        </div>
                    )
                ))}
            </div>
            <div id={styles.divClientOptions}>
                  {conversationId.prebuildMEssages.map((message, index) => (
                      <div key={index} className={styles.clientOptions}>{message}</div>     
                      ))}
            </div>
            <div id={styles.inputText}>
                <div id={styles.plusIcon}>
                    <a href="" ><PlusCircle size={45} color='#000000'/></a>
                </div>
                <div id={styles.wrapperInputSend}>
                    <div id={styles.inputType}>
                        <a type="button" href=""><PaperPlaneTilt size={32} color='#BBBBBB' onClick={sendMessage}/></a>
                    </div>
                    <input type="text" placeholder='Enviar mensagem...' id={styles.inputConversation} value={newMessage} onChange={(e) => setNewMessage(e.target.value)}/>
                </div>
            </div>
        </div>
    );
}
