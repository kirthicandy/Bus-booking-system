import React, { useState } from "react";
import '../assests/css/login.css';
import axios from "axios";
import Registration from "./Registration";


export default function Login(props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

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

          <div className="mb-3">
            <div className="custom-control custom-checkbox">
              <input
                type="checkbox"
                className="custom-control-input"
                id="customCheck1"
              />
              <label className="custom-control-label" htmlFor="customCheck1">
                Remember me
              </label>
            </div>
          </div>

          <div className="d-grid">
            <button type="submit" className="btn btn-primary">
              Submit
            </button>
          </div>
          <br></br>
          <p className="forgot-password text-right">
            <button onClick={<Registration/>}>Sign Up</button> 
            
          </p>
        </form>
      </div>
    </div>:<Registration/>}
    </>

  );
}
