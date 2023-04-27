import { Timestamp, arrayUnion, doc, updateDoc } from "firebase/firestore";
import React, { useState } from "react";
import { db, storage } from "../../firebase";
import { v4 as uuidv4 } from 'uuid';
import { RiSendPlaneFill } from "react-icons/ri";
import { RiAttachment2 } from "react-icons/ri";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import styles from "./styles.module.css";


const Input = ({ userChatInfo, user }) => {
  const [text, setText] = useState("")
  const [img, setImg] = useState(null)
  const { input, send } = styles;

  const handleSubmit = async(e) => {
    e.preventDefault()
    if(text === "" && img === null) return false
    setText("")
    setImg(null)
    if(img) {
      const storageRef = ref(storage, uuidv4())
      const uploadTask = uploadBytesResumable(storageRef, img)

      uploadTask.then(
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL)=> {
            await updateDoc(doc(db, "chats", userChatInfo.discussionId), {
              messages: arrayUnion({
                id: uuidv4(),
                text,
                senderId: user.uid,
                date: Timestamp.now(),
                img: downloadURL,
              })
            })
          })
        }
      )



    } else {
      await updateDoc(doc(db, "chats", userChatInfo.discussionId), {
        messages: arrayUnion({
          id: uuidv4(),
          text,
          senderId: user.uid,
          date: Timestamp.now(),
        })
      })
    }
  }
  return (
    <form onSubmit={handleSubmit} className={input}>
      <input value={text} type="text" placeholder="Type a message here..." onChange={(e) => setText(e.target.value)} />
      <div className={send}>
        <input type="file" id="file" style={{ display: "none" }} onChange={(e) => setImg(e.target.files[0])} />
        <label htmlFor="file" className="me-2 fs-4 d-flex align-items-center">
          <RiAttachment2 style={{color: "#a6acb2"}}/>
        </label>
        <button type="submit"><RiSendPlaneFill /></button>
      </div>
    </form>
  );
};

export default Input;
