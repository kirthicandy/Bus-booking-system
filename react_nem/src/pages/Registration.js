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
import "../assests/css/Registration.css";
import { useEffect, useState } from "react";
import axios from "axios";
import Login from "./Login";

const Registration = (props) => {
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
        "Weak password";
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
    e.preventDefault()

    validateForm();
    await axios
      .post("http://localhost:2112/info/register", {
        username: username,
        age: age,
        email: email,
        password: password,
        number: number,
        userType: userType,
        gender: gender,
      })
      .then((res) => {
        console.log(res);
        const data = res.data;
        if (data.error === "User Exists") {
          alert("User is Existed");
        } else if(data.status ==="ok") {
          alert("Success");
        
     
        
        }
        else{
          alert("Enter Valid Details to Register")
        }
      });
  };
  return (
    <>
    {props.somepop ==="open"?
    
    
      <MDBContainer fluid>
         <Login somepop={popup}/>
        <MDBCard className="register text-black m-auto " style={{ borderRadius: "25px" }}>
          <MDBCardBody>
            <p className="text-center text-white h3  ">
              Sign up
            </p>

            <div className=" align-items-center m-3 ">
             
              <MDBInput
                placeholder="Your Name..."
                id="form1"
                type="text"
                value={username}
                name="username"
                className="w-75 m-auto"
                onChange={handleChange}
              />
                <span className="non-valid">{dataError.username}</span>
            </div>
          

            <div className=" align-items-center m-3 ">
              {" "}
             
              <MDBInput
                placeholder="Your Age..."
                id="form1"
                type="text"
                name="age"
                value={age}
                className="w-75 m-auto"
                onChange={handleChange}
              />
              <span className="non-valid">{dataError.age}</span>
            </div>
            

            <div className=" align-items-center m-3 ">
              {" "}
              
              <MDBInput
                placeholder="Your Email..."
                id="form2"
                name="email"
                type="email"
                value={email}
                className="w-75 m-auto"
                onChange={handleChange}
              />
              <span className="non-valid">{dataError.email}</span>
            </div>
            

            <div className=" align-items-center m-3  ">
              {" "}
             
              <MDBInput
                placeholder="Password..."
                id="form3"
                name="password"
                type="password"
                className="w-75 m-auto"
                value={password}
                onChange={handleChange}
              />
              <span className="non-valid">{dataError.password}</span>
            </div>
            <div className=" align-items-center  m-3 ">
              {" "}
            
              <MDBInput
                name="cnfmpassword"
                placeholder="Repeat your password..."
                id="form4"
                type="password"
                className="w-75 m-auto"
                value={cnfmpassword}
                onChange={handleChange}
              />
              <span className="non-valid">{dataError.cnfmpassword}</span>
            </div>

            <div className=" align-items-center m-3  ">
              {" "}
           
              <MDBInput
                name="number"
                placeholder="Mobile number..."
                id="form5"
                type="text"
                className="w-75 m-auto"
                value={number}
                onChange={handleChange}
              />
              <span className="non-valid">{dataError.number}</span>
            </div>

            <div className="text-light">
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
              /><br/>
                <span className="non-valid">{dataError.gender}</span>
            </div>
          

            <button className="mt-4 btn btn-primary m-3" onClick={handleSubmit}>
              Register
            </button>
            <div className="m-auto align-items-center text-light ">
              <span className="me-3">Have an account?</span>
              
                <button className=" btn btn-primary ml-5" onClick={(e)=>open(e)}>Login</button>
              
            </div>
          </MDBCardBody>
        </MDBCard>
      </MDBContainer>:""
      }
   </>
  );
};
export default Registration;