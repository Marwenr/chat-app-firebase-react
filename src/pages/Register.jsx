import React, { useRef } from "react";
import { Alert, Button, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";
import { createUser } from "../store/authSlice";

import withoutGuard from "../util/withoutGuard";

const SignIn = () => {
  const {error} = useSelector(state => state.auth)
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const usernameRef = useRef("");
  const emailRef = useRef("");
  const passwordRef = useRef("");
  const fileRef = useRef();

  const submitHandler = async (e) => {
    e.preventDefault();

    const email = emailRef.current.value;
    const password = passwordRef.current.value;
    const username = usernameRef.current.value.toLowerCase();
    const file = fileRef.current.files[0];

    if (!email || !password) {
      console.error("password || email is required");
      return;
    }
    const data = {
      email: email,
      password: password,
      username: username,
      file: file,
    };
    dispatch(createUser(data));
    navigate("/");
  };

  return (
    <div className="auth">
      <Form className="form" onSubmit={submitHandler}>
        <h3>Fire-B Chat</h3>
        <p>Register</p>
        <input placeholder="UserName" ref={usernameRef} />
        <input placeholder="Email" ref={emailRef} />
        <input placeholder="Password" ref={passwordRef} />
        <label htmlFor="avatar">Choose a profile picture:</label>
        <input
          type="file"
          id="avatar"
          name="avatar"
          accept="image/png, image/jpeg"
          ref={fileRef}
        ></input>
        <Button
          className="button"
          variant="warning"
          type="submit"
        >
          Register
        </Button>
        {error && (
          <Alert className="p-0 mt-1" variant="danger">
            {error}
          </Alert>
        )}
        <div className="register">
          You have an account?
          <Button
            className="link p-0 ms-1"
            variant="link"
            onClick={() => navigate("/signin")}
          >
            SignIn
          </Button>
        </div>
      </Form>
    </div>
  );
};

export default withoutGuard(SignIn);
