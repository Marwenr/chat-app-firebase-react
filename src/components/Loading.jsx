import React from "react";
import { useSelector } from "react-redux";

const Loading = ({ children }) => {
  const { isLoading } = useSelector(state=> state.auth)
  return isLoading ? <div>Loading...</div> : children;
};

export default Loading;
