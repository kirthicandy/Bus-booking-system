import React, { useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

const AddRoute = () => {
  const info = {
    source: "",
    destination: "",
    arrival_time: "",
    departure_time: "",
    
  
    reserved_seat: [],
  };
  const [data, setData] = useState(info);
  const [board, setBoard] = useState([""]);
  const [drop, setDrop] = useState([""]);
  const [seat, setSeat] = useState([""]);
  const { id } = useParams();
  const {
    source,
    destination,
    arrival_time,
    departure_time,
   
    reserved_seat,
  } = data;

  const handleChange = (event) => {
    console.log(event);

    setData(() => ({
      ...data,
      [event.target.name]: event.target.value,
    }));

    console.log(data);
  };
  const handleAddField = () => {
    setBoard([...board, ""]);
  };
  const handleAddDropField = () => {
    setDrop([...drop, ""]);
  };  
  const handleAddSeatField = () => {
    setSeat([...seat, ""]);
  };
  const handleAddChange = (e, i) => {
    const newFields = [...board];
    newFields[i] = e.target.value;
    setBoard(newFields);
    console.log("Array=", newFields);
  };
  const handleAddDrop = (e, i) => {
    const newDrop = [...drop];
    newDrop[i] = e.target.value;
    setDrop(newDrop);
    console.log("Droop=", newDrop);
  }; 
  const handleAddSeat = (e, i) => {
    const newSeat = [...seat];
    newSeat[i] = e.target.value;
    setSeat(newSeat);
    console.log("seat=", newSeat);
  };

  const handleAddRoute = async () => {
    await axios
      .post("http://localhost:2112/busroute", {
        bus_id: id,
        source: source,
        destination: destination,
        arrival_time: arrival_time,
        departure_time: departure_time,
        boarding_point: board,
        dropping_point: drop,
        available_Seat: seat,
        reserved_seat: reserved_seat,
      })
      .then((res) => {
        console.log(res);
        alert("Successfully Registered");
        window.open(`/route/${id}`, "_self");
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <>
      <div className="container d-flex ">
        <div className="container2 w-50">
          <div className=" m-auto">
            <h2 className="text-center">Bus Route Details</h2>

            <div className="input-group input-group-sm row p-2 w-50 ">
              <label>Source</label>
              <input
                type="text"
               
                name="source"
                value={source}
                onChange={handleChange}
              ></input>
            </div>
            <div className="input-group input-group-sm row p-2 w-50">
              <label>Destination</label>
              <input
                type="text"
               
                name="destination"
                value={destination}
                onChange={handleChange}
              ></input>
            </div>
            <div className="input-group input-group-sm row p-2 w-50">
              <label>Arrival Time</label>
              <input
                type="datetime-local"
              
                name="arrival_time"
                value={arrival_time}
                onChange={handleChange}
              ></input>
            </div>
            <div className="input-group input-group-sm row p-2 w-50">
              <label>Departure Time</label>
              <input
                type="datetime-local"
               
                name="departure_time"
                value={departure_time}
                onChange={handleChange}
              ></input>
            </div>
            <div className="input-group input-group-sm  row p-2  ">
            <span onClick={handleAddField}>
                {" "}
                <i class="bi bi-plus-square mx-2"></i>Add 
              </span>

              {board.map((field, i) => (
                <div className="appending_div appending_div-sm m-1" key={i}>
                  <label>Boarding Point{i + 1}</label>
                  <input
                    type="text"
                   
                    name="board"
                    value={field}
                    onChange={(e) => handleAddChange(e, i)}
                  ></input>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="container2 w-50">
          <div className="">
          <div className="input-group input-group-sm  row p-2  ">
              <span onClick={handleAddDropField}>
                {" "}
                <i class="bi bi-plus-square mx-2"></i>Add Drop
              </span>

              {drop.map((field, i) => (
                <div className="appending_div appending_div-sm m-1" key={i}>
                  <label>Dropping Point{i + 1}</label>
                  <input
                    type="text"
                   
                    name="drop"
                    value={field}
                    onChange={(e) => handleAddDrop(e, i)}
                  ></input>
                </div>
              ))}
            </div>
            <div className="input-group input-group-sm row p-2 w-50">
              <p onClick={handleAddSeatField}>
                {" "}
                <i class="bi bi-plus-square mx-2"></i>Add Seat
              </p>
                           {seat.map((field, i) => (
                <div className="w-25 " key={i}>
                  <label>Seat{i + 1}</label>
                  <input
                    type="text"
                   
                    name="seat"
                    value={field}
                    onChange={(e) => handleAddSeat(e, i)}
                  ></input>
                </div>
              ))}
            </div>
            <div className="text-center">

            <button className="btn btn-secondary w-25 m-2 " onClick={handleAddRoute}>Submit</button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default AddRoute;