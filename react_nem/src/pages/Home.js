import React from "react";
import { useState } from "react";
import '../assests/css/home.css'
import backgroundvideo from "../assests/video/video.mp4";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";
import { Link } from "react-router-dom";
import Registration from "./Registration";

const Home = () => {

  const[popup,setpopup] =useState('close');

  const open = () =>{
    switch(popup){
      case "close":
        setpopup('open');
        return
         case 'open':
          setpopup("close");
          return
    
      default:
        setpopup('close');
        return;
    }
    
  }
  return (
    <>
     
   
     
        <div className="carousel-inner" role="listbox">
          
          <div className="carousel-item-active">

            <video className="videoTag" id="bgvid" autoPlay loop muted>
              <source src={backgroundvideo} type="video/mp4" />
            </video>
           
            
            <div className="carousel-caption font-weight-bold text-dark w-100">
           {popup==="open"?<Registration somepop={popup}/>:
           <div className="container-fluid mt-5 action ">
              
           <h2>Need a Ride?</h2>
           <h3 className="mb-3">You've come to the right place!</h3>
           <button
             type="button"
             className="btn btn-warning btn-m ml-3  text-white"
             onClick={(e)=>open()}
           >
             Start your Journey
           </button>
          
           </div>
           } 
            
      
            </div>
          </div>
        </div>
   
    </>
  );
};

export default Home;