import React, { useState, useEffect } from "react";
import "../assests/css/userhome.css";
import { PopupMenu } from "react-simple-widgets";
import axios from "axios";
import moment from "moment";

import { Link } from "react-router-dom";
import "../assests/css/userhome.css";
export default function BusList({ userData }) {
  // const [obj, setObj] = useState('')
  const [reset, Setreset] = useState(false);
  const [arrowDown, setArrowDown] = useState(false);
  const [clas, SetClas] = useState(true);
  const [Businfo, setBusinfo] = useState([]);

  const [choose, setChoose] = useState(null);
  const [choos, setChoos] = useState(null);
  const [chooseDate, setChooseDate] = useState("");

  useEffect(() => {
    if (!choose) {
      axios.get("http://localhost:2112/busroute/aggregate").then((data) => {
        setBusinfo(data.data);
        

        // handleBusInfo()
      });
    }
    // const handleBusInfo = () =>{

    // })
  });
  const getSearch = (e) => {
    setChoose(e.target.value);
    console.log(e.target.value);

    axios.get("http://localhost:2112/busroute/aggregate").then((data) => {
      let chooseItem = data.data.filter(
        (item) => item.source === choose
      );
      // setBusinfo(chooseItem);
      console.log("hi", chooseItem);
    });
  };
  const getdesSearch = (e) => {
    setChoos(e.target.value);
    console.log(e.target.value);

    axios.get("http://localhost:2112/busroute/aggregate").then((data) => {
      let chooseItem = data.data.filter(
        (item) => item.destination === choos
      );
      // setBusinfo(chooseItem);
      console.log("hi", chooseItem);
    });
  }; 
  const getDateSearch = (e) => {
    setChooseDate(e.target.value);
  
  };
  const handleFilter = (e) => {
    axios.get("http://localhost:2112/busroute/aggregate").then((data) => {
      let chooseItem = data.data.filter((bus)=>{let datee =moment(bus.arrival_time).format('YYYY-DD-MM')
      console.log(datee,"=date==chp=",chooseDate)
      return datee.includes(chooseDate) && bus.destination.toLowerCase().includes(choos) && bus.source.toLowerCase().includes(choose)})
      setBusinfo(chooseItem);
    });
  };

  const handleSubmit = (bId, userid, Source) => {
    localStorage.setItem("selectedBusId", bId);
    localStorage.setItem("Userid", userid);
    localStorage.setItem("Source", Source);
    console.log("hi", bId);
    SetClas(false);
    setArrowDown(true);
  };

  // const handleReset = (e) => {
  //   if (clas === false) {
  //     Setreset(true);
  //     SetClas(true);
  //     setArrowDown(false);
  //   }
  //   localStorage.removeItem("selectedBusId");
  // };
  const logout = () => {
    window.localStorage.clear();
    window.open("./", "_self");
  };

  return (
    <div className="Businfo">
      <div id="app">
        <div className="text-end">
          <Link to="/mybook">
            <button className="btn btn-secondary m-1">MyBooking</button>
          </Link>
          <PopupMenu>
            <button className="btn btn-secondary ">
              <i className="far fa-circle-user m-1"></i>
              <small>{userData.email}</small>
            </button>

            <div className="card text-start mt-4">
              <div className="card-body px-4 py-4">
                <div id="circle-avatar" className="text-center mx-auto mb-4">
                  <span>K</span>
                </div>

                <h5 className="text-center mb-0">{userData.username}</h5>
                <p className="text-center mb-2">{userData.email}</p>

                <hr style={{ margin: "0 -24px 24px" }} />

                <div className="d-grid">
                  <button className="btn btn-secondary" onClick={logout}>
                    <small>Logout</small>
                  </button>
                </div>
              </div>
            </div>
          </PopupMenu>
        </div>
      </div>

      <div className="searchdetails mx-5">
      
        <div class="row w-100 align-items-center">
          <div class="col">
            <input
              type="text"
              class="form-control"
              placeholder="From"
              data={Businfo}
              onChange={(e) => getSearch(e)}
            />
          </div>  
          <div class="col">
            <input
              type="text"
              class="form-control"
              placeholder="To"
              data={Businfo}
              onChange={(e) => getdesSearch(e)}
            />
          </div>  
          <div class="col">
            <input
              type="date"
              class="form-control"
              placeholder="From"
              data={Businfo}
              onChange={(e) => getDateSearch(e)}
            />
          </div>
          <div class="col">
          <button className="btn btn-primary ml-5 w-25"  onClick={(e) => handleFilter(e)}>search</button>
          </div>
        </div>
  
        

    

        <div className="buscontainer">
          {Businfo &&
            Businfo.length > 0 &&
            Businfo
            
            .map((bus, idx) => {
              return (
                <div key={idx} className="card mt-5 buslist">
                  <div className="row ml-5">
                    <div className="col-6 col-sm-3 mt-2 font-weight-bold ">
                      _id
                    </div>
                    <div className="col-6 col-sm-3 mt-2 font-weight-bold ">
                      From
                    </div>
                    <div className="col-6 col-sm-3 mt-2 font-weight-bold ">
                      To
                    </div>
                    <div className="col-6 col-sm-3 mt-2 font-weight-bold ">
                      Price
                    </div>

                    <div className="w-100 d-none d-md-block"></div>

                    <div className="col-6 col-sm-3 mb-4">{bus._id}</div>
                    <div className="col-6 col-sm-3 mb-4">{bus.source}</div>
                    <div className="col-6 col-sm-3 mb-4">{bus.destination}</div>
                    <div className="col-6 col-sm-3 mb-4">
                      {bus.busroute[0].Bus_Type}
                    </div>
                    <div className="col-6 col-sm-4 mb-2 ml-0">
                      <Link to="/choose">
                        <button
                          className={
                            clas
                              ? "btn btn-primary btn-md"
                              : "btn btn-primary btn-md disabled"
                          }
                          onClick={() => {
                            handleSubmit(bus.bus_id, userData._id, bus.source);
                          }}
                        >
                          Book Now
                        </button>
                      </Link>
                    </div>
                    {/* <div className="col-6 col-sm-4 mb-2 ml-0">
                    <span
                      className={reset ? "badge badge-danger ml-5" : "disabled"}
                      // onClick={(e) => handleReset(e)}
                    >
                      Reset
                    </span>
                  </div> */}
                  </div>
                </div>
              );
            })}
        </div>
      </div>
    </div>
  );
}
