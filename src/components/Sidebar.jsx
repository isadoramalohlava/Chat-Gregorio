import styles from './Sidebar.module.css';
import React from "react";
import ReactDOM from "react-dom";
import { MagnifyingGlass } from "@phosphor-icons/react";



export function Sidebar() {
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
                <input type="text" name="" id="" placeholder='Procurar...'/>
                
                
                
        
            </div>

            <div>
                <h1 className={styles.myConversation}>Minhas conversas</h1>

            </div>

            <div className={styles.chats}>
                <img className={styles.avatar} src='https://images.unsplash.com/photo-1510915228340-29c85a43dcfe?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=300&q=50'></img>
                <div> 
                    <h1>Rafael Pereira</h1>
                    <h3>Lorem, ipsum dolor...</h3>
                </div>
                <time>15:02</time>
            </div>
            <div className={styles.chats}>
                <img className={styles.avatar} src='https://images.unsplash.com/photo-1510915228340-29c85a43dcfe?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=300&q=50'></img> 
                <div>
                    <h1>Ricardo Costa</h1>
                    <h3>Lorem, ipsum dolor...</h3>
                </div>
                <time>15:02</time>
            </div>
            <div className={styles.chats}>
                <img className={styles.avatar} src='https://images.unsplash.com/photo-1510915228340-29c85a43dcfe?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=300&q=50'></img>
                <div>
                    <h1>Joana Guedes</h1>
                    <h3>Lorem, ipsum dolor...</h3>
                </div>
                <time>15:02</time>

            </div>

            <button className={styles.button}>SAIR</button>

        </aside> 
        );
    }