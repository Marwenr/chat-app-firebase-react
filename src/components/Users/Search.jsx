import React, { useState } from "react";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../../firebase";
import { Image, ListGroup } from "react-bootstrap";
import styles from "./styles.module.css";

const Search = () => {
  const [term, setTerm] = useState("");
  const [user, setUser] = useState(null);
  const { search } = styles;


  const handleSearch = async () => {
    const q = query(collection(db, "users"), where("displayName", "==", term));

    const querySnapshot = await getDocs(q);

    querySnapshot.forEach((doc) => setUser(doc.data()));
  };

  const handleKey = (e) => {
    e.code = "Enter" && handleSearch();
  };

  return (
    <ListGroup className="rounded-0">
      <input
        className={search}
        placeholder="Search User"
        style={{ backgroundColor: "#f8fafd" }}
        onChange={(e) => setTerm(e.target.value)}
        onKeyDown={handleKey}
      />
      {user && (
        <ListGroup.Item action className="border-0 border-top">
          <Image
            src={user.photoURL}
            roundedCircle
            width="50px"
            height="50px"
            className="me-2"
          />
          {user.displayName}
        </ListGroup.Item>
      )}
    </ListGroup>
  );
};

export default Search;
