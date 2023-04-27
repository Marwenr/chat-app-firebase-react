import React, { useEffect, useState } from "react";
import { AiOutlineLogout } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { signOut } from "../../store/authSlice";
import { doc, onSnapshot } from "firebase/firestore";
import { db } from "../../firebase";
import Message from "./Message";
import Input from "./Input";
import styles from "./styles.module.css";


const Chat = () => {
  const dispatch = useDispatch();
  const { chat, msges, title } = styles;
  const [messages, setMessages] = useState([]);

  const { userChatInfo } = useSelector((state) => state.chats);
  const { user } = useSelector((state) => state.auth);


  useEffect(() => {
    const getData = () => {
      const unSub = onSnapshot(
        doc(db, "chats", userChatInfo.discussionId),
        (doc) => {
          doc.exists() && setMessages(doc.data().messages);
        }
      );

      return () => {
        unSub();
      };
    };

    userChatInfo.discussionId && getData();
  }, [userChatInfo.discussionId]);

  const message = messages.map((msg) => (
    <Message
      message={msg}
      key={msg.id}
      userChatInfo={userChatInfo}
      user={user}
    />
  ));

  return Object.keys(userChatInfo).length !== 0 ? (
    <div className={chat}>
      <div className={title}>
        {userChatInfo.data.displayName}
      </div>
      <div className={msges}>{message}</div>
      <Input userChatInfo={userChatInfo} user={user} />
    </div>
  ) : (
    <div>Select a chat or start a new conversation</div>
  );
};

export default Chat;
