import React from "react";
import withGuard from "../util/withGuard";
import Users from "../components/Users/Users";
import Profil from "../components/Profil/Profil";
import Chats from "../components/Chats/Chats";

// className:home
// <Users />

const Home = () => {
  return (
    <div>
      <Profil />
      <Users />
      <Chats />
    </div>
  );
};

export default withGuard(Home);
