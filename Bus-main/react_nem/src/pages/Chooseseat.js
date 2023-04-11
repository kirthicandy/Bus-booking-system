import { React, useState, useEffect } from "react";
import axios from "axios";

import "../assests/css/choose.css";

const Chooseseat = () => {
 
  const [seat, setSeat] = useState([0]);
  const [seatno, setSeatNo] = useState([0]);
 
  const [reservedSeat, setReservedSeat] = useState([]);
  const [seatNumber, setSeatNumber] = useState([]);
  const [select, setSelect] = useState([]);
  const [userData, setUserData] = useState([]);
  const [bookedSeat, setBookedSeat] = useState([]);
  const [details, setDetails] = useState();
  const [price, setPrice] = useState("");
  const [name, setName] = useState();
  const [age, setAge] = useState();
  const [gender, setGender] = useState();
  const [drop, setDrop] = useState([]);
  const [board, setboard] = useState([]);
  const [mul, setMul] = useState("0");
  const [userboard, setuserboard] = useState();
  const [userdrop, setuserdrop] = useState();
  const [passengerData, setPassengerData] = useState([]);

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
          
          console.log("reserved",data.data[0].reserved_seat);

          setPrice(data.data[0].businfos[0].Price);
        }
      });
  };
  const getSeatNumber = (e) => {
    renderPassengerData(seatNumber);
   

    let newSeat = e.target.value;
    console.log(newSeat);
    if (reservedSeat.includes(newSeat)) {
      // e.target.disabled = true
      if(seatNumber.includes(newSeat)){
        setSeatNumber(seatNumber.filter((seat) => seat !== newSeat));


      }
    } else {
      if (newSeat){setSeatNumber([...seatNumber, newSeat]);
      setReservedSeat([...reservedSeat,newSeat]);
     
      console.log(seatNumber);}
      
      }
    }
  
  const renderPassengerData = (seatArray) => {
    return seatArray.map((seat, idx) => {
      return (
        <>
          <div key={idx} className="seatfrm">
            <span class="text-capitalize text-center">Passenger{idx+1}</span>
            
          </div>
          </>
      );
    });
  };
  const handleSubmitDetails = (e) => {
    e.preventDefault();
    console.log("submit e tart",e.target.value);
    // const updateItem = seat.map((item)=>{
    //   if(item === select){
    //     return {...item,checked:!item.checked,disabled:true}
        
    //   }
    //   return item
    // })
    // setSeat(updateItem)
    // setReservedSeat(...reservedSeat,select)



    setSeatNo(seatNumber);
    console.log("reservedseat", seatNumber);
    console.log("Price",userData.bus_id)
    setBookedSeat(seatNumber.length);
    setDrop(userData[0].dropping_point);
    setboard(userData[0].boarding_point);
    console.log("hi", seatNumber.length);
    setDetails(handleUser());
    console.log("hi",userData[0].businfos[0].Price);
    
    setMul(seatNumber.length * userData[0].businfos[0].Price);
   
    handleTotal();
    // setProcess(handleProceed());
  };
  const handleUser = () => {
    return (
       
      <>
       <div>{renderPassengerData(reservedSeat)}</div>
       
      </>
    );
  };
  //Price calculation function
  const handleTotal = (e) => {
  
    return (
      <>
        <div  >
          <p>{details}</p>
          <label>Name:</label>
          <input
            className="boo mx-4"
            type="text"
            name="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          ></input>
          <br />
          <label>Age:</label>
          <input
            className="boo mx-4"
            type="text"
            name="age"
            value={age}
            onChange={(e) => setAge(e.target.value)}
          ></input>
          <br />
          <input
            className="book mx-4"
            type="radio"
            name="gender"
            value="male"
            onChange={(e) => setGender(e.target.value)}
          ></input>
          <label>Male</label>
          <input
            className="book mx-4"
            type="radio"
            name="gender"
            value="Female"
            onChange={(e) => setGender(e.target.value)}
          ></input>
          <label>Female</label>
          <input
            className="book mx-4"
            type="radio"
            name="gender"
            value="Others"
            onChange={(e) => setGender(e.target.value)}
          ></input>
          <label>Others</label>
        

          <div className="board-drop ">
            <div className="boarding_point mx-5">
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
              {drop.map((item, id) => {
                return (
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
                );
              })}
            </div>
          </div>
          <div>
            <label>Seat Number:</label>
            <input
              className="book mx-4"
              type="text"
              name="seatNo"
              value={seatNumber}
            ></input>
            <br />
            <label>Number of booked seat:</label>
            <input
              className="book mx-4"
              type="text"
              name="bookedseat"
              value={bookedSeat}
            ></input>
            <br />
            <label>Total Price:</label>
            <input
              className="book mx-4"
              type="text"
              name="mul"
              value={mul}
            ></input>
          </div>

          <div>
            <button onClick={handleDetail}> Proceed</button>
          </div>
        </div>
      </>
    );
  };
  const handleDetail = async (e) => {
    e.preventDefault()

  
    console.log("hiefg4gt",e.target.value)
    console.log("hiefg4gt with stify",JSON.stringify(reservedSeat))
    console.log("hiefg4gt without stify",{
       
      bus_id: userData[0].bus_id,
      user_id: localStorage.getItem("Userid"),
      busroute_id:userData[0]._id,
      name:name,
      age:age,
      gender:gender,
      boarding_point: userboard,
      dropping_point: userdrop,
      no_of_seats: bookedSeat,
      booked_seats:seatNumber ,
      total_price: mul,
    })


    
    const re = await axios.post("http://localhost:2112/booking", {
       
        bus_id: userData[0].bus_id,
        user_id: localStorage.getItem("Userid"),
        busroute_id:userData[0]._id,
        name:name,
        age:age,
        gender:gender,
        boarding_point: userboard,
        dropping_point: userdrop,
        no_of_seats: bookedSeat,
        booked_seats:seatNumber ,
        total_price: mul,
      })
      .then((res) => {
        console.log(res.data);
        window.location.reload()

        const data = res.data
        if(data.status === "error"){
           alert( "Enter valid Detail")
        }else{
          alert("succuss")
        }
      });

  };
 

  return (
    <>
      <div className=" w-50">
        <form onSubmit={handleSubmitDetails}>
          <div className="seatcontainer w-50">
            {seat.map((item, id) => (
              <div className="seats w-25" key={id} onClick={(e)=>getSeatNumber(e,id)}>
                <p className="seat w-100">
                  <input
                    type="checkbox"
                    name="seat"
                    value={item}
                     id={item}
                     disabled={reservedSeat.includes(item)}
                    

                   
                  />
                  <label htmlFor={item}>{item}</label>
                </p>
               
              </div>
            ))}
          </div>
          { }
          {handleTotal()}
          <input type="submit"></input>
        </form>
      </div>
    </>
  );
};
export default Chooseseat;
