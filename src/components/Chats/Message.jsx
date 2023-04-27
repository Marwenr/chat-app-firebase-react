import React, { useEffect, useRef } from "react";
import styles from "./styles.module.css";

const Message = ({ message, userChatInfo, user }) => {
const ref = useRef()
const { messageStyle, owner, content, time } = styles;

useEffect(() => {
  ref.current?.scrollIntoView({behavior: "smooth"})
}, [message])


  return (
    <div ref={ref} className={`${messageStyle} ${message.senderId === user.uid ? owner : messageStyle}`}>
      <div className={content}>
      {message.text && <p>{message.text}</p>}
      {message.img && <img src={message.img} alt="" />}
      <p className={time}>{message.date.toDate().toDateString()+" "+message.date.toDate().toLocaleTimeString()}</p>
      </div>
    </div>
  );
};

export default Message;
