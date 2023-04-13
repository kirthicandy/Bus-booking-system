import { React, useState, useEffect } from "react";
import axios from "axios";

import "../assests/css/choose.css";

const Chooseseat = () => {
  const [seat, setSeat] = useState([0]);
  const [showField, setShowField] = useState(false);
  const [reservedSeat, setReservedSeat] = useState([]);
  const [seatNumber, setSeatNumber] = useState([]);
  const [select, setSelect] = useState([{ name: "", age: "", gender: "" }]);
  const [userData, setUserData] = useState([]);
  const [bookedSeat, setBookedSeat] = useState();
  const [details, setDetails] = useState();
  const [labeldrop, setLabeld] = useState();
  const [labelboard, setLabelb] = useState();
  const [drop, setDrop] = useState([]);
  const [board, setboard] = useState([]);
  const [mul, setMul] = useState("0");
  const [userboard, setuserboard] = useState();
  const [userdrop, setuserdrop] = useState();

  useEffect(() => {
    handleData();
  }, []);
  //Api for bus and user information
  const handleData = () => {
    axios
      .post("http://localhost:2112/busroute/agi", {
        id: localStorage.getItem("selectedBusId"),
        source: localStorage.getItem("Source"),
      })
      .then((data) => {
        if (data.status === "error") {
          window.localStorage.clear();
          console.log("hi");
        } else {
          setUserData(data.data);
          console.log(data.data);
          setSeat(data.data[0].available_Seat);
          setReservedSeat(data.data[0].reserved_seat);

          console.log("reserved", data.data[0].reserved_seat);
        }
      });
  };
  //Seat OnClick Function
  const getSeatNumber = (e) => {
    renderPassengerData(seatNumber);

    let newSeat = e.target.value;
    console.log(newSeat);
    if (reservedSeat.includes(newSeat)) {
      if (seatNumber.includes(newSeat)) {
        setSeatNumber(seatNumber.filter((seat) => seat !== newSeat));
      }
    } else {
      if (newSeat) {
        setSeatNumber([...seatNumber, newSeat]);
        setReservedSeat([...reservedSeat, newSeat]);

        console.log(seatNumber);
      }
    }
  };

  const renderPassengerData = (seatArray) => {
    return seatArray.map((seat, idx) => {});
  };
  //Onsubmit
  const handleSubmitDetails = (e) => {
    e.preventDefault();
    console.log("submit e tart", e.target.value);

    setLabelb("Boarding Point");
    setLabeld("Dropping Point");

    console.log("reservedseat", seatNumber);
    console.log("Price", userData.bus_id);
    setBookedSeat(seatNumber.length);

    setDrop(userData[0].dropping_point);
    setboard(userData[0].boarding_point);
    console.log("hi", seatNumber.length);
    setDetails(handleUser());

    setMul(seatNumber.length * userData[0].businfos[0].Price);

    handleTotal();
    handleAddField(seatNumber.length);
  };

  const handleUser = () => {
    return (
      <>
        <div>{renderPassengerData(reservedSeat)}</div>
      </>
    );
  };
  //Add Field according to seat clicked
  const handleAddField = (count) => {
    console.log("count", count);
    const newFields = [];
    for (let i = 1; i <= count; i++) {
      newFields.push({ name: "", age: "", gender: "" });
      setSelect([...newFields]);
    }
    setShowField(true);
  };

  const handleInputChange = (event, index) => {
    const { name, value } = event.target;
    const newFields = [...select];
    newFields[index][name] = value;
    setSelect(newFields);
    console.log(newFields);
  };
  //Price calculation function
  const handleTotal = (e) => {
    return (
      <>
        <div>
          <p>{details}</p>
          {showField && (
            <div className="appending_div">
              {select.map((field, index) => (
                <div key={index}>
                  <label className="fs-5 ">Passenger {index + 1}: </label>
                  <br />
                  <br />
                  <label className="m-1">Name:</label>
                  <input
                    type="text"
                    name="name"
                    value={field.name}
                    onChange={(event) => handleInputChange(event, index)}
                  />
                  <label className="m-1">Age :</label>
                  <input
                    type="text"
                    name="age"
                    value={field.age}
                    onChange={(event) => handleInputChange(event, index)}
                  />
                  <br />
                  <br />

                  <input
                    className="book mx-4"
                    type="radio"
                    name="gender"
                    value="male"
                    onChange={(event) => handleInputChange(event, index)}
                  ></input>
                  <label>Male</label>
                  <input
                    className="book mx-4"
                    type="radio"
                    name="gender"
                    value="Female"
                    onChange={(event) => handleInputChange(event, index)}
                  ></input>
                  <label>Female</label>
                  <input
                    className="book mx-4"
                    type="radio"
                    name="gender"
                    value="Others"
                    onChange={(event) => handleInputChange(event, index)}
                  ></input>
                  <label>Others</label>
                  <hr></hr>
                </div>
              ))}
            </div>
          )}
          <br />
          <div className="board-drop ">
            <div className="boarding_point mx-5">
              <b>{labelboard}</b>
              {board.map((item, id) => {
                return (
                  <div key={id}>
                    <input
                      type="Radio"
                      name="board"
                      value={item}
                      onChange={(e) => setuserboard(e.target.value)}
                      required
                    ></input>
                    <label>{item}</label>
                  </div>
                );
              })}
            </div>
            <div className="dropping_point mx-5 ">
              <b>{labeldrop}</b>
              {drop.map((item, id) => {
                return (
                  <>
                    <div key={id}>
                      <input
                        type="Radio"
                        name="drop"
                        value={item}
                        onChange={(e) => setuserdrop(e.target.value)}
                        required
                      ></input>
                      <label>{item}</label>
                    </div>
                  </>
                );
              })}
            </div>
          </div>{" "}
          <hr />
          <div>
            <label>Seat Number:</label>
            <input
              className="book mx-4"
              type="text"
              name="seatNo"
              value={seatNumber}
            ></input>
            <br /> <hr />
            <label>Number of booked seat:</label>
            <input
              className="book mx-4"
              type="text"
              name="bookedseat"
              value={bookedSeat}
            ></input>
            <br /> <hr />
            <label>Total Price:</label>
            <input
              className="book mx-4"
              type="text"
              name="mul"
              value={mul}
            ></input>{" "}
            <hr />
          </div>
          <div>
            <button onClick={handleDetail} className="btn btn-danger">
              {" "}
              Proceed
            </button>
          </div>
        </div>
      </>
    );
  };
  const handleDetail = async (e) => {
    e.preventDefault();

    await axios
      .post("http://localhost:2112/booking", {
        bus_id: userData[0].bus_id,
        user_id: localStorage.getItem("Userid"),
        busroute_id: userData[0]._id,
        user_detail: select,
        boarding_point: userboard,
        dropping_point: userdrop,
        no_of_seats: bookedSeat,
        booked_seats: seatNumber,
        total_price: mul,
      })
      .then((res) => {
        console.log(res.data);
        window.location.reload();

        const data = res.data;
        if (data.status === "error") {
          alert("Enter valid Detail");
        } else {
          alert("succuss");
        }
      });
  };

  return (
    <>
      <div className="container d-flex ml-5">
        <div className=" container1  mt-5">
          <div className="">
            <form onSubmit={handleSubmitDetails}>
              <div className="seatcontainer w-50">
                {seat.map((item, id) => (
                  <div
                    className="seats w-25"
                    key={id}
                    onClick={(e) => getSeatNumber(e, id)}
                  >
                    <p className="seat ">
                      <input
                        type="checkbox"
                        name="seat"
                        value={item}
                        id={item}
                        //  checked={seatNumber.includes(item)}
                        disabled={reservedSeat.includes(item)}
                      />
                      <label htmlFor={item}>{item}</label>
                    </p>
                  </div>
                ))}
              </div>
              {}
              <div className="text-center">
                <button type="submit" className="btn btn-danger">
                  Confirm
                </button>
              </div>
            </form>
          </div>
        </div>

        <div className="box w-60  p-5  mt-5 ">{handleTotal()}</div>
      </div>
    </>
  );
};
export default Chooseseat;
