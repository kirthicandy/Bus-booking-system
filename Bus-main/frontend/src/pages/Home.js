import React from "react";


import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';


const Home = () =>{



  return (
    <>
      <Navbar bg="primary" variant="light">
        <Container>
          <Navbar.Brand href="#home">Bus Booking System</Navbar.Brand>
          <Nav className=" r-0 ">
            <Nav.Link href="#home">Home</Nav.Link>
            <Nav.Link href="#features">Bus</Nav.Link>
            <Nav.Link href="#pricing">My Booking</Nav.Link>
            <Nav.Link href="/signup">Signup</Nav.Link>
          </Nav>
        </Container>
      </Navbar>
     
    </>
  );
}




export default Home;