import styles from './Chat.module.css';
import { PaperPlaneTilt, ArrowCounterClockwise } from "@phosphor-icons/react";
import { useState, useEffect,useRef } from 'react';
import API_BASE_URL from '../../apiConfig'; // Importe o URL da API


export function Chat({ characterId }) {
    const [conversation, setConversation] = useState([]);
    const [newMessage, setNewMessage] = useState('');
    const [conversationId, setConversationId] = useState('');
    const [isTyping, setIsTyping] = useState(false);
    const [character, setCharacter] = useState([]);
    const bottomRef = useRef(null);


    useEffect(() => { 
        const fetchCharacter = async () => {
            try {
                const response = await fetch(`${API_BASE_URL}/api/v1/chatbot/character/${characterId}/`);
                const data = await response.json();
                setCharacter(data);
            } catch (error) {
                console.error('Error:', error);
            }
        };
        fetchCharacter();
    }, [characterId]);

    useEffect(() => {
        const fetchConversation = async () => {
            try {
                const id = localStorage.getItem('conversationData');
                if (id.characterId == characterId && id.conversationId) {
                    setConversationId(id.conversationId);
                } else {
                    createConversation();
                }
            } catch (e) {
                try {
                    const retrocompatibilidade = localStorage.getItem('conversationId');
                    if (retrocompatibilidade || 1) {
                        createConversation();
                    } else {
                        console.error('Error:');
                    }
                } catch (error) {
                        console.error('Error:', error);
                }
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
                localStorage.setItem('conversationData',JSON.stringify({'conversationId': data.id,'characterId':characterId}));
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

    const sendMessage = async (event) => {//
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
                setIsTyping(true);
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
                    setIsTyping(false);
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
    
    const Typing = () => {
        // console.log('Typing component rendered'); // Add this line for debugging
        return (
            <div className={styles.typing}>
                <div className={styles.typing__dot}></div>
                <div className={styles.typing__dot}></div>
                <div className={styles.typing__dot}></div>
            </div>
        );
    };

    useEffect(() => {
        bottomRef.current?.scrollIntoView({behavior: 'smooth'});
      }, [conversation]);

    return (
        <div id={styles.container}>
            <meta property="og:title" content={character.name}></meta>
            <header>
                <div>
                    <img className={styles.avatar} src={character.url_image} alt="" />
                </div>
                <div id={styles.userConversation}>
                    <h1>{character.name ?? 'Carlos Roberto'}</h1>
                    <span>Disponível</span>
                </div>
                <div id={styles.icon}>
                    <a onClick={createConversation} ><ArrowCounterClockwise/></a>
                </div>
            </header>
            <div className={styles.Chat}>
                 {conversation.map((message, index) => (
                    message.is_from_user ? (
                        <div key={index} id={styles.conversation2}>
                            <p>{message.content}</p>
                           
                        </div>
                    ) : (
                        <div key={index} id={styles.conversation1}>
                            <p>{message.content}</p>
                            <time className={styles.timeConversation}>{message.created_at}</time> 
                        </div>
                    )
                    ))}
                <div> {isTyping ? <Typing /> : null }</div>
                <div ref={bottomRef} />
             
            </div>
            <div id={styles.inputText}>
                <div id={styles.wrapperInputSend}>
                   
                        <a type="button" href="" id={styles.inputType}><PaperPlaneTilt color='#BBBBBB' onClick={sendMessage}/></a>
                    

                    <input type="text" placeholder='Enviar mensagem...' id={styles.inputConversation} value={newMessage} onChange={(e) => setNewMessage(e.target.value)} onKeyDown={(ev) => ev.key == 'Enter' ? sendMessage(ev) : ''}/>
                </div>
            </div>
            <div className={styles.centeredContainer}>
            <div id={styles.micIcon}>Powered By <a href='www.dubledigital.com.br' target="_blank" ><b> DubleDigital</b></a>  </div>
        </div>
        </div>
    );
}