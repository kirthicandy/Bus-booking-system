import React from "react";
import {
  MDBBtn,
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBCard,
  MDBCardBody,
  MDBCardImage,
  MDBInput,
  MDBIcon,
  MDBRadio,
} from "mdb-react-ui-kit";
import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const Registration = () => {
  const info = {
    username: "",
    email: "",
    password: "",
    cnfmpassword: "",
    number: "",
    gender: "",
    age: "",
    userType: "",
  };
  const [data, setData] = useState(info);

  const [secretKey, setSecretKey] = useState("");
  const {
    userType,
    username,
    email,
    password,
    cnfmpassword,
    number,
    gender,
    age,
  } = data;

  const [dataError, setDataError] = useState({});
  const handleChange = (event) => {
    console.log(event);

    setData(() => ({
      ...data,
      [event.target.name]: event.target.value,
    }));
  };

  const validateForm = () => {
    let err = {};

    if (username === "") {
      err.username = "required!";
    }
    if (data.email === "") {
      err.email = "Email required!";
    } else {
      let regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
      if (!regex.test(data.email)) {
        err.email = "Email not valid!";
      }
    }
    if (data.password === "") {
      err.password = "Password is required!";
    } else {
      let passregrex =
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
      if (!passregrex.test(data.password)) {
        err.password =
          "Password should atleast contain 8 characters with one lowercase, one uppercase,one digit and one special character!";
      } else {
        err.password = "";
      }
    }
    if (data.password === "") {
      err.cnfmpassword = "Confirm password is required!";
    } else {
      if (data.password !== data.cnfmpassword) {
        err.cnfmpassword = "Password mismatch";
      } else {
        err.cnfmpassword = "";
      }
    }

    if (data.number === "") {
      err.number = "Number required!";
    } else {
      let numregex = /^\d{10}$/;
      if (!numregex.test(data.number)) {
        err.number = "Number not valid!";
      }
    }
    if (data.age === "") {
      err.age = "required";
    }

    if (gender === "") {
      err.gender = "Gender required!";
    }

    setDataError({ ...err });

    return Object.keys(err).length < 1;
  };
  const handleSubmit = async (e) => {
    if (userType == "Admin" && secretKey != "Kirthi@12") {
      e.preventDefault();
      alert("Invalid Admin");
    } else {
      e.preventDefault();
    }
    validateForm();
    await axios
      .post("http://localhost:2112/info/register", {
        username: username,
        age: age,
        email: email,
        password: password,
        number: number,
        userType:userType,
        gender: gender,
      })
      .then((res) => {
        console.log(res);
        const data = res.data;
        if (data === "Existed") {
          alert("User is Existed");
        } else {
          alert("Success");
        }
      });
  };
  return (
    <>
      <MDBContainer fluid>
        <MDBCard
          className="text-black m-5 bg-secondary"
          style={{ borderRadius: "25px" }}
        >
          <MDBCardBody>
            <MDBRow>
              <MDBCol
                md="10"
                lg="6"
                className="order-2 order-lg-1 d-flex flex-column align-items-center"
              >
                <p className="text-center h1 fw-bold mb-5 mx-1 mx-md-4 mt-2">
                  Sign up
                </p>
                <div>
                  <h4>Register As</h4>
                  <MDBRadio
                    name="userType"
                    id="inlineRadio4"
                    onChange={handleChange}
                    label="User "
                    value="User"
                    inline
                  />

                  <MDBRadio
                    name="userType"
                    id="inlineRadio5"
                    onChange={handleChange}
                    label="Admin "
                    value="Admin"
                    inline
                  />
                </div>

                <div className="d-flex flex-row align-items-center mt-4 ">
                  <MDBIcon fas icon="user me-3" size="lg" />
                  <MDBInput
                    placeholder="Your Name"
                    id="form1"
                    type="text"
                    value={username}
                    name="username"
                    className="w-100"
                    onChange={handleChange}
                  />
                </div>
                <span className="non-valid">{dataError.username}</span>
                {userType === "Admin" ? (
                <div className="d-flex flex-row align-items-center mt-4 ">
                     <MDBIcon  class="fas fa-unlock-alt me-3" size="lg" />
                   
                     <MDBInput
                      type="text"
                      className="form-control"
                      placeholder="Secret Key"
                      value={secretKey}
                      onChange={(e) => setSecretKey(e.target.value)}
                    />
                  </div>
                ) : null}

                <div className="d-flex flex-row align-items-center mt-4 ">
                  <MDBIcon className="fas fa-globe me-3" size="lg" />
                  <MDBInput
                    placeholder="Your Age"
                    id="form1"
                    type="text"
                    name="age"
                    value={age}
                    className="w-100"
                    onChange={handleChange}
                  />
                </div>
                <span className="non-valid">{dataError.age}</span>

                <div className="d-flex flex-row align-items-center mt-4">
                  <MDBIcon fas icon="envelope me-3" size="lg" />
                  <MDBInput
                    placeholder="Your Email"
                    id="form2"
                    name="email"
                    type="email"
                    value={email}
                    onChange={handleChange}
                  />
                </div>
                <span className="non-valid">{dataError.email}</span>

                <div className="d-flex flex-row align-items-center mt-4">
                  <MDBIcon fas icon="lock me-3" size="lg" />
                  <MDBInput
                    placeholder="Password"
                    id="form3"
                    name="password"
                    type="password"
                    value={password}
                    onChange={handleChange}
                  />
                </div>
                <span className="non-valid">{dataError.password}</span>

                <div className="d-flex flex-row align-items-center mt-4">
                  <MDBIcon fas icon="key me-3" size="lg" />
                  <MDBInput
                    name="cnfmpassword"
                    placeholder="Repeat your password"
                    id="form4"
                    type="password"
                    value={cnfmpassword}
                    onChange={handleChange}
                  />
                </div>
                <span className="non-valid">{dataError.cnfmpassword}</span>
                <div className="d-flex flex-row align-items-center mt-4 ">
                  <MDBIcon class="fas fa-mobile me-4" size="lg" />
                  <MDBInput
                    name="number"
                    placeholder="Number "
                    id="form5"
                    type="text"
                    value={number}
                    onChange={handleChange}
                  />
                </div>
                <span className="mb-4 ">{dataError.number}</span>
                <div>
                  <MDBRadio
                    className=""
                    name="gender"
                    id="inlineRadio1  "
                    onChange={handleChange}
                    label="Male"
                    value="Male"
                    inline
                  />
                  <MDBRadio
                    name="gender"
                    id="inlineRadio2"
                    onChange={handleChange}
                    label="Female"
                    value="Female"
                    inline
                  />
                  <MDBRadio
                    name="gender"
                    id="inlineRadio3"
                    onChange={handleChange}
                    label="Others "
                    value="Others"
                    inline
                  />
                </div>
                <span className="non-valid">{dataError.gender}</span>
                <button
                  className="mt-4 btn btn-primary m-3"
                  onClick={handleSubmit}
                >
                  Register
                </button>  
                <div className="d-flex flex-row align-items-center ">
                <span>Have an account?</span>
                <Link to="/login"><button
                  className=" btn btn-primary "
                   >
                  Login
                </button></Link>
                </div>
              </MDBCol>

              <MDBCol
                md="10"
                lg="6"
                className="order-1 order-lg-2 d-flex align-items-center"
              >
                <MDBCardImage
                  src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-registration/draw1.webp"
                  fluid
                />
              </MDBCol>
            </MDBRow>
          </MDBCardBody>
        </MDBCard>
      </MDBContainer>
    </>
  );
};
export default Registration;
