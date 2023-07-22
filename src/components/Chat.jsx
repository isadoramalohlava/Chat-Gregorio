import styles from './Chat.module.css';
import { DotsThreeVertical, PlusCircle, PaperPlaneTilt } from "@phosphor-icons/react";

export function Chat() {
    return (
        <div>
            <header>
                <div>
                <img className={styles.avatar} src="https://images.unsplash.com/photo-1510915228340-29c85a43dcfe?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=300&q=50" alt="" />
                </div>

                <div id={styles.userConversation}>
                <h1>Rafael Pereira</h1>
                <span>Digitando...</span>
                </div>

                <div id={styles.icon}>
                    <a href=""><DotsThreeVertical size={32} /></a>
                </div>
            </header>

            <div className={styles.Chat}>
                <div id={styles.conversation1}>
                    <p>Como especialista em direito tributário no Brasil, estou aqui para ajudar a esclarecer suas dúvidas e fornecer informações relevantes sobre esse campo do direito.</p> 
                    </div>
                    <time className={styles.timeConversation}>15:00</time>

                <div id={styles.conversation2}>
                        <p>Redija um contrato que dê plenos poderes para meu irmão "Joaquim Barbosa da Silva" cuidar das minhas contas bancárias durante o período de 3 meses a partir de agosto de 2023.</p>
                    </div>
                    <time className={styles.timeConversation} id={styles.timeUser}>15:00</time>

                <div id={styles.conversation1}>
                        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Hic adipisci dicta possimus incidunt ipsum corporis ut consequatur quisquam enim eos? Quis nisi numquam sequi! Quas explicabo vitae ea omnis excepturi exercitationem saepe voluptatum, soluta velit temporibus consequuntur. Tempore quidem minus porro repudiandae iste earum quod quia possimus. Totam, consequuntur odio.</p>
                    </div>
                    <time className={styles.timeConversation}>15:00</time>
                
                   

                    </div>

         
            <div id={styles.divClientOptions}>
                <div className={styles.clientOptions}>Contrato de compra e venda</div>
                <div className={styles.clientOptions}>Auxílio trabalhista</div>
                <div className={styles.clientOptions}>Proteção ao consumidor</div>
                <div className={styles.clientOptions}>Proteção ao consumidor</div>
                
            </div>

            <div id={styles.inputText}>
                <div id={styles.plusIcon}>
                    <a href="" ><PlusCircle size={45} color='#000000'/></a>
                </div>
                <div id={styles.wrapperInputSend}>
                    <div id={styles.inputType}>
                            <a href=""><PaperPlaneTilt size={32} color='#BBBBBB'/></a>
                    </div>
                        <input type="text" placeholder='Enviar mensagem...' id={styles.inputConversation}/>
                </div>
            </div>
        </div>
        );
    }