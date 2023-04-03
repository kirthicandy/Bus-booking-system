import React, { useState } from "react";
import axios from "axios";

export default function Login() {
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
        if (data.status === 200) {
          console.log("giug",data.data.token);
          alert("Login Successfully")


          window.localStorage.setItem("token", data.data.token);
          window.open("./UserDetails");
        } else {
          alert("login failed");
        }
      });
  }

  return (
    <div className="auth-wrapper  w-25 m-auto mt-5 p-5">
      <div className="auth-inner ">
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
          <p className="forgot-password text-right">
            <a href="/sign-up">Sign Up</a>
          </p>
        </form>
      </div>
    </div>
  );
}
