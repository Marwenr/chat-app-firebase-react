import React, { useRef } from "react";
import { Alert, Button, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";
import { signIn } from "../store/authSlice";

import withoutGuard from "../util/withoutGuard";

const SignIn = () => {
  const {error} = useSelector(state => state.auth)
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const emailRef = useRef("");
  const passwordRef = useRef("");

  const submitHandler = (e) => {
    e.preventDefault();
    const data = {
      email: emailRef.current.value,
      password: passwordRef.current.value,
    };

    dispatch(signIn(data));
    navigate("/");
  };
  return (
    <div className="auth">
      <Form className="form" onSubmit={submitHandler}>
        <h3>Fire-B Chat</h3>
        <p>Sign In</p>
        <input placeholder="Email" ref={emailRef} />
        <input placeholder="Password" ref={passwordRef} />
        <Button className="button" variant="warning" type="submit">
          Sign In
        </Button>
        {error && (
          <Alert className="p-0 mt-1" variant="danger">
            {error}
          </Alert>
        )}
        <div className="register">
          You don't have an account?
          <Button
            className="link p-0 ms-1"
            variant="link"
            onClick={() => navigate("/register")}
          >
            Register
          </Button>
        </div>
      </Form>
    </div>
  );
};

export default withoutGuard(SignIn);
