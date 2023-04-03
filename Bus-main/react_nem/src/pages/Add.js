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

const Add = () => {
  const info = {
    Bus_id:"",
    Bus_name:"",
    Bus_number:"",
    Available_seats:"",
    Bus_Type:"",
    Price:"",
  };
  const [data, setData] = useState(info);

  const { Bus_id, Bus_name, Bus_number, Available_seats, Bus_Type, Price } =
    data;

  const handleChange = (event) => {
    console.log(event);

    setData(() => ({
      ...data,
      [event.target.name]: event.target.value,
    }));
  };

  const handleSubmit = async (e) => {
  

    await axios
      .post("http://localhost:2112/businfo", {
        Bus_id: Bus_id,
        Bus_name: Bus_name,
        Bus_number: Bus_number,
        Available_seats: Available_seats,

        Bus_Type: Bus_Type,
        Price: Price,
      })
      .then((res) => {
        console.log(res);
        alert("Successfully Registered")
        window.open('/userDetails','_self')
               
      }).catch((err)=>{
        console.log(err)
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
                    name="Bus_Type"
                    id="inlineRadio1"
                    onChange={handleChange}
                    label="Sleeper/AC "
                    value="Sleeper/AC "
                    inline
                  />

                  <MDBRadio
                    name="Bus_Type"
                    id="inlineRadio2"
                    onChange={handleChange}
                    label="Sleeper/NA "
                    value="Sleeper/NA"
                    inline
                  />
                  <MDBRadio
                    name="Bus_Type"
                    id="inlineRadio3"
                    onChange={handleChange}
                    label="Seater/NA "
                    value="Seater/NA"
                    inline
                  />   <MDBRadio
                    name="Bus_Type"
                    id="inlineRadio4"
                    onChange={handleChange}
                    label="Seater/NA "
                    value="Seater/NA"
                    inline
                  />
                </div>

                <div className="d-flex flex-row align-items-center mt-4 ">
                  <MDBIcon fas icon="user me-3" size="lg" />
                  <MDBInput
                    placeholder="Bus_id"
                    id="form1"
                    type="text"
                    value={Bus_id}
                    name="Bus_id"
                    className="w-100"
                    onChange={handleChange}
                  />
                </div>
              

                <div className="d-flex flex-row align-items-center mt-4 ">
                  <MDBIcon className="fas fa-globe me-3" size="lg" />
                  <MDBInput
                    placeholder="Bus Name"
                    id="form1"
                    type="text"
                    name="Bus_name"
                    value={Bus_name}
                    className="w-100"
                    onChange={handleChange}
                  />
                </div>
               

                <div className="d-flex flex-row align-items-center mt-4">
                  <MDBIcon fas icon="envelope me-3" size="lg" />
                  <MDBInput
                    placeholder="Bus Number"
                    id="form2"
                    name="Bus_number"
                    type="Bus_number"
                    value={Bus_number}
                    onChange={handleChange}
                  />
                </div>
                

                <div className="d-flex flex-row align-items-center mt-4">
                  <MDBIcon fas icon="lock me-3" size="lg" />
                  <MDBInput
                    placeholder="Available seats"
                    id="form3"
                    name="Available_seats"
                    type="Available_seats"
                    value={Available_seats}
                    onChange={handleChange}
                  />
                </div>
                
                
                <div>
                <MDBIcon fas icon="money me-3" size="lg" />
                <MDBInput
                    placeholder="Price"
                    id="form3"
                    name="Price"
                    type="Price"
                    value={Price}
                    onChange={handleChange}
                  />
                </div>
                 
              
                <button
                  className="mt-4 btn btn-primary m-3"
                  onClick={handleSubmit}
                >
                  Submit
                </button>
                
              </MDBCol>

            </MDBRow>
          </MDBCardBody>
        </MDBCard>
      </MDBContainer>
    </>
  );
};
export default Add;