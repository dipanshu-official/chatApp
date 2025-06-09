import React, { use } from "react";
import User from "./User.jsx";
import { useAuth } from "../../context/AuthContext.jsx";


function Users() {
  const {user} = useAuth();
  console.log(user);
  return (
    <div>
      <h1 className="px-8 py-2 text-white font-semibold bg-slate-800 rounded-md">
        Messages
      </h1>
      <div
        className="py-2 flex-1 overflow-y-auto"
        style={{ maxHeight: "calc(84vh - 10vh)" }}
      >
        <User/>
        <User/>
        <User/>

      </div>
    </div>
  );
}

export default Users;