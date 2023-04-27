import React from 'react'
import Conversation from './Conversation'
import Chat from './Chat'
import styles from "./styles.module.css";

const Chats = () => {
  const { container, chats } = styles;
  return (
    <div className={container}>
        <div className={chats}>
          <Conversation />
          <Chat />
        </div>
      </div>
  )
}

export default Chats