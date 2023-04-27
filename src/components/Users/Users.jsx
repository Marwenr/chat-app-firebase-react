import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllUsers } from "../../store/chatsSlice";
import { Image, ListGroup } from "react-bootstrap";
import {
  doc,
  getDoc,
  serverTimestamp,
  setDoc,
  updateDoc,
} from "firebase/firestore";
import { db } from "../../firebase";
import Search from "./Search";
import styles from "./styles.module.css";

const Users = () => {
  const dispatch = useDispatch();
  const { usrs } = styles;
  const { allData } = useSelector((state) => state.chats);
  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(fetchAllUsers());
  }, [dispatch]);

  const handleDiscussionId = async (userClicked) => {
    const discussionId =
      user.uid > userClicked.uid
        ? user.uid + userClicked.uid
        : userClicked.uid + user.uid;
    try {
      const docRef = doc(db, "chats", discussionId);
      const docSnap = await getDoc(docRef);

      if (!docSnap.exists()) {
        await setDoc(doc(db, "chats", discussionId), { messages: [] });

        await updateDoc(doc(db, "userChats", user.uid), {
          [discussionId + ".userInfo"]: {
            uid: userClicked.uid,
            displayName: userClicked.displayName,
            photoURL: userClicked.photoURL,
          },
          [discussionId + ".date"]: serverTimestamp(),
        });

        await updateDoc(doc(db, "userChats", userClicked.uid), {
          [discussionId + ".userInfo"]: {
            uid: user.uid,
            displayName: user.displayName,
            photoURL: user.photoURL,
          },
          [discussionId + ".date"]: serverTimestamp(),
        });
      }
    } catch (err) {
      console.log(err);
    }
  };

  const users = allData.map((userData, index) =>
    userData.uid !== user.uid ? (
      <ListGroup key={index} className="rounded-0">
        <ListGroup.Item
          action
          className="border-0 border-top"
          onClick={() => handleDiscussionId(userData)}
        >
          <Image
            src={userData.photoURL}
            roundedCircle
            width="50px"
            height="50px"
            className="me-2"
          />
          {userData.displayName}
        </ListGroup.Item>
      </ListGroup>
    ) : null
  );

  return (
    <div className={usrs}>
      <Search />
      {users}
    </div>
  );
};

export default Users;
