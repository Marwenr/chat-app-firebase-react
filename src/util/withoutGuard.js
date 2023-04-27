import React from "react";
import { useSelector } from "react-redux";
import { Navigate} from "react-router-dom"
const withGuard = (Component) => {
  const Wraper = (props) => {
    const { user } = useSelector(state => state.auth);
    return Object.keys(user).length !== 0 ? <Navigate to="/" /> : <Component {...props} />;
  };
  return Wraper;
};

export default withGuard;
