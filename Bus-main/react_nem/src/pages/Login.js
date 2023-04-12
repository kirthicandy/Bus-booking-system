import React, { useState } from "react";
import '../assests/css/login.css';
import axios from "axios";
import Registration from "./Registration";
import { Link } from "react-router-dom";


export default function Login(props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const[popup,setpopup] =useState('close');

  const open = () =>{
    switch(popup){
      case "close":
        setpopup('open');
        return
      case "open":
        setpopup('close');
        return
    
      default:
        setpopup('close');
        return;
    }
    
  }

  function handleSubmit(e) {
    e.preventDefault();

    axios
      .post("http://localhost:2112/info/login", {
        email: email,
        password: password,
      })

      .then((data) => {
        console.log(data, "userRegister");
        if (data.data.status === "ok") {
          console.log("giug",data.data.token);
          alert("Login Successfully")


          window.localStorage.setItem("token", data.data.token);
          window.open("./UserDetails");
        } else {
          alert("login failed");
        }
      });
  }

  return (<>
   
 {props.somepop ==="open"?
    <div className="auth-wrapper  p-5">
      {popup==="open"?<Registration somepop={popup}/>:<>
      <div className="auth-inner  m-auto w-25">
        <form onSubmit={handleSubmit}>
          <h3>Sign In</h3>

          <div className="mb-3 w-5">
            <label>Email </label>
            <input
              type="email"
              className="form-control"
              placeholder="Enter email"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="mb-3">
            <label>Password</label>
            <input
              type="password"
              className="form-control"
              placeholder="Enter password"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          
          <div className="d-grid">
            <button type="submit" className="btn btn-primary">
              Submit
            </button>
          </div><br/>
          <div className="d-grid">
           <button type="submit" className="btn btn-primary" onClick={(e)=>open(e)}>
              signup
            </button>
          </div>
          <br></br>
          <p className="forgot-password text-right">
           
            
          </p>
        </form>
      </div>
      </>}
    </div>:""}
    </>

  );
}
