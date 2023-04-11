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
          setAdmin(data.data.data.email === "kirthicandy12@gmail.com");
          window.localStorage.setItem("user_id",data.data.data._id)
          console.log("user_id",data.data.data._id)
          console.log("data",data.data.data.email)
        }
      });
    


}
catch(err){
  console.log("err",err)
}
  },[])

  return admin ? <AdminHome adminData={userData} /> : <UserHome userData={userData}/>;
}