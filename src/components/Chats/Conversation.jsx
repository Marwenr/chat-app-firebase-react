import React, { useEffect, useState } from "react";
import { Image, ListGroup } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { fetchAllUsers } from "../../store/chatsSlice";
import { doc, onSnapshot } from "firebase/firestore";
import { db } from "../../firebase";
import styles from "./styles.module.css";

import { changeUser } from "../../store/chatsSlice";

const Conversation = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const [chats, setChats] = useState([]);
  const { conversation } = styles;


  useEffect(() => {
    dispatch(fetchAllUsers());
  }, [dispatch]);

  useEffect(() => {
    const getChats = () => {
      const unsub = onSnapshot(doc(db, "userChats", user.uid), (doc) => {
        setChats(doc.data());
      });

      return () => {
        unsub();
      };
    };

    user.uid && getChats();
  }, [user.uid]);

  const HandleUser = (us) => {
    dispatch(changeUser(us));
  };

  const messanger = Object.entries(chats)?.map((chat) => (
    <ListGroup key={chat[0]} className="rounded-0">
      <ListGroup.Item
        action
        className="border-0 border-top"
        onClick={() =>
          HandleUser({ discussionId: chat[0], data: chat[1].userInfo })
        }
      >
        <Image
          src={chat[1].userInfo.photoURL}
          roundedCircle
          width="50px"
          height="50px"
          className="me-2"
        />
        <p>{chat[1].userInfo.displayName}</p>
        <p>{chat[1].userInfo.lastMessae?.text}</p>
      </ListGroup.Item>
    </ListGroup>
  ));

  return (
    <div
      className={`${conversation} rounded-0`}
      scrollable="1"
      style={{
        maxHeight: "100%",
        overflowY: "auto",
      }}
    >
      <div>{messanger}</div>
    </div>
  );
};

export default Conversation;
