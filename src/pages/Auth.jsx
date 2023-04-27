import React from "react";
import { auth } from "../firebase";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";

import { Button } from "react-bootstrap";
import { FcGoogle } from "react-icons/fc";
import { AiOutlineMail } from "react-icons/ai";
import { useNavigate } from "react-router-dom";

import withoutGuard from "../util/withoutGuard"

const Auth = () => {
  const navigate = useNavigate();

  const googleSignIn = () => {
    const provider = new GoogleAuthProvider();
    return signInWithPopup(auth, provider);
  };

  return (
    <div className="auth">
      <div className="form">
        <h4 className="mb-3">Login or register in seconds</h4>
        <p>
          Use your email or another service to continue with Fire-B Chat (it's
          free) !
        </p>
        <Button className="btnstyle login mb-3" onClick={() => googleSignIn()}>
          <FcGoogle className="icon" />
          Sign In with Google
        </Button>
        <Button className="btnstyle login" onClick={() => navigate("/signin")}>
          <AiOutlineMail className="icon" />
          Sign In with Email
        </Button>
      </div>
    </div>
  );
};

export default withoutGuard(Auth);
