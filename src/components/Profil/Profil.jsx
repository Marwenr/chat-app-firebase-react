import React from "react";
import { Dropdown, Image } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { signOut } from "../../store/authSlice";

import styles from "./styles.module.css";
import { AiOutlineLogout } from "react-icons/ai";

const Profil = () => {
  const { profil } = styles;
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  return (
    <Dropdown className={profil}>
      <Dropdown.Toggle variant="link" id="dropdown-basic">
        <Image
          src={user.photoURL}
          roundedCircle
          width="30px"
          height="30px"
          className="me-2"
        />
        {user.displayName}
      </Dropdown.Toggle>

      <Dropdown.Menu>
        <Dropdown.Item className="d-flex" onClick={() => dispatch(signOut())}>
          <AiOutlineLogout className="text-danger mt-1" />
          <h6 className="ms-2 text-danger">SignOut</h6>
        </Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  );
};

export default Profil;
