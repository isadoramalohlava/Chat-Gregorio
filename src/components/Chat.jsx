import styles from './Chat.module.css';
import { PaperPlaneTilt, ArrowCounterClockwise } from "@phosphor-icons/react";
import { useState, useEffect } from 'react';
import API_BASE_URL from '../../apiConfig'; // Importe o URL da API


export function Chat({ characterId }) {
    const [conversation, setConversation] = useState([]);
    const [newMessage, setNewMessage] = useState('');
    const [conversationId, setConversationId] = useState('');

    useEffect(() => {
        const fetchConversation = async () => {
            try {
                const id = localStorage.getItem('conversationId');
                if (id) {
                    setConversationId(id);
                } else {
                    createConversation();
                }
            } catch (error) {
                console.error('Error:', error);
            }
        };

        fetchConversation();
    }, [characterId]);

    const createConversation = async () => {
        try {
            const response = await fetch(`${API_BASE_URL}/api/v1/chatbot/conversations/`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    character: characterId,
                }),
            });
            const data = await response.json();
            if (response.ok) {
                setConversationId(data.id);
                localStorage.setItem('conversationId', data.id);
                // Clear existing conversation messages when recreating
                setConversation([]);
            } else {
                console.error('Error:', response.status);
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    useEffect(() => {
        if (conversationId) {
            const fetchConversationMessages = async () => {
                try {
                    const response = await fetch(`${API_BASE_URL}/api/v1/chatbot/conversations/${conversationId}/messages/`);
                    const data = await response.json();
                    setConversation(data.results.reverse());

                } catch (error) {
                    console.error('Error:', error);
                }
            };

            fetchConversationMessages();
        }
    }, [conversationId]);

    const sendMessage = async () => {
        event.preventDefault();
        if (newMessage.trim() === '') {
            setNewMessage('');
            return;
        }

        const message = {
            id: getLastMessageId() + 1,
            content: newMessage,
            is_from_user: true,
            created_at: new Date().toISOString(),
            only_front: true,
        };

        setConversation([...conversation, message]);
        setNewMessage('');

        if (conversationId) {
            console.log(getLastMessageId().count);
            try {
                const response = await fetch(`${API_BASE_URL}/api/v1/chatbot/conversations/${conversationId}/messages/create/`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        conversation: conversationId,
                        content: newMessage,
                        is_from_user: true,
                        in_reply_to: getLastMessageId() > 0 ? getLastMessageId() : null,
                    }),
                });

                if (response.ok) {
                    const data = await response.json();
                    const resp = {
                        id: getLastMessageId() + 2,
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
        }
    };

    const getLastMessageId = () => {
        if (conversation.length > 0) {
            const lastMessage = conversation[conversation.length - 1];
            return lastMessage.id;
        }
        return 0;
    };


    return (
        <div>
            <header>
                <div>
                </div>
                <div id={styles.userConversation}>
                </div>
                <div id={styles.icon}>
                    <a onClick={createConversation} ><ArrowCounterClockwise size={32} /></a>
                </div>
            </header>
            <div className={styles.Chat}>
                {conversation.map((message, index) => (
                    message.is_from_user ? (
                        <div key={index} id={styles.conversation2}>
                            <p>{message.content}</p>
                            <time className={styles.timeConversation}>{message.created_at}</time>
                        </div>
                    ) : (
                        <div key={index} id={styles.conversation1}>
                            <p>{message.content}</p>
                            <time className={styles.timeConversation}>{message.created_at}</time>
                        </div>
                    )
                ))}
            </div>
            <div id={styles.inputText}>
                <div id={styles.wrapperInputSend}>
                    <div id={styles.inputType}>
                        <a type="button" href=""><PaperPlaneTilt size={32} color='#BBBBBB' onClick={sendMessage}/></a>
                    </div>
                    <input type="text" placeholder='Enviar mensagem...' id={styles.inputConversation} value={newMessage} onChange={(e) => setNewMessage(e.target.value)}/>
                </div>
            </div>
            <div className={styles.centeredContainer}>
            <div id={styles.micIcon}>Powered By <b>DubleDigital</b></div>
        </div>
        </div>
    );
};
