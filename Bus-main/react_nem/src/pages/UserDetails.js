import React, { Component, useEffect, useState } from "react";
import AdminHome from "../pages/AdminHome";
import axios from "axios";

import UserHome from "../pages/UserHome";

export default function UserDetails() {
  const [userData, setUserData] = useState({});
  const [admin, setAdmin] = useState(false);

  useEffect(() => {
try{
    axios
      .post("http://localhost:2112/info/userData", {
        token: window.localStorage.getItem("token"),
      })

      .then((data) => {
        console.log(data, "userData");
        if (data.status === "error") {
          window.localStorage.clear();
          console.log("hi")
        } else {
          setUserData(data.data.data);
          setAdmin(data.data.data.email === "rajk12@gmail.com");
          console.log("data",data.data.data.email)
          console.log("hi")
        }
      });
    


}
catch(err){
  console.log("err",err)
}
  },[])

  return admin ? <AdminHome /> : <UserHome userData={userData}/>;
}