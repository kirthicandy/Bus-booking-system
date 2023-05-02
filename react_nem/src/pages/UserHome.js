import React, { useState, useEffect } from "react";
import "../assests/css/userhome.css";
import { PopupMenu } from "react-simple-widgets";
import axios from "axios";

import { Link } from "react-router-dom";
import "../assests/css/userhome.css";
export default function BusList({ userData }) {
  // const [obj, setObj] = useState('')
  const [Businfo, setBusinfo] = useState([]);
  const [time, setTime] = useState(null);
  const [text, setText] = useState([]);
  const [des, setDes] = useState([]);
  const [source, setSource] = useState([]);
  const [destination, setDestination] = useState([]);
  const [choose, setChoose] = useState(null);
  const [choos, setChoos] = useState(null);
  const [chooseDate, setChooseDate] = useState("");

  useEffect(() => {
    if (!choose) {
      axios.get("http://localhost:2112/busroute/aggregate").then((data) => {
        setBusinfo(data.data);
        setTime(
          data.data.departure_time &&
            data.data.departure_time > 0 &&
            data.data.departure_time.map((time) => time.toLocaleTimeString())
        );
       

        // handleBusInfo()
      });
    }
    // const handleBusInfo = () =>{

    // })
  }, []);
  const getSearch = (e) => {
    setText(e.target.value)
    setChoose(e.target.value);
    console.log(e.target.value);

    axios.get("http://localhost:2112/busroute/aggregate").then((data) => {
      let chooseItem = data.data.filter((item) => item.source === choose);

      console.log("hi", chooseItem);
    });
    axios
      .get(
        `http://localhost:2112/busroute/aggregate/source?source=${e.target.value}`
      )
      .then((data) => {
        setSource(data.data);

        console.log(data.data.map((i) => i.source));
      });
  };

  const handleSuggestionSource=(text)=>{
    setText(text)
    setSource([])
  }
  const getdesSearch = (e) => {
    setDes(e.target.value)
    setChoos(e.target.value);
    console.log(e.target.value);

    axios.get("http://localhost:2112/busroute/aggregate").then((data) => {
      let chooseItem = data.data.filter((item) => item.destination === choos);

      console.log("hi", chooseItem);
    });
    axios
      .get(
        `http://localhost:2112/busroute/aggregate/destination?destination=${e.target.value}`
      )
      .then((data) => {
        setDestination(data.data);

        console.log(data.data.map((i) => i.destination));
      });
  };
  const handleSuggestionDestination=(des)=>{
    setDes(des)
    setDestination([])
  }
  const getDateSearch = (e) => {
    setChooseDate(e.target.value);
  };
  const handleFilter = async (e) => {
    const chooseItem = await axios
      .get(
        `http://localhost:2112/busroute/aggregate/filter?source=${choose}&destination=${choos}&date=${chooseDate}`
      )
      .then((data) => {
        console.log(data.data);
        setBusinfo(data.data);
      });
  };

  const handleSubmit = (bId, userid, Source) => {
    localStorage.setItem("selectedBusId", bId);
    localStorage.setItem("Userid", userid);
    localStorage.setItem("Source", Source);
    console.log("hi", bId);
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
            <button className="btn btn-danger bg-gradient m-1">
              MyBooking
            </button>
          </Link>
          <PopupMenu>
            <button className="btn btn-danger bg-gradient ">
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
                  <button className="btn btn-danger" onClick={logout}>
                    <small>Logout</small>
                  </button>
                </div>
              </div>
            </div>
          </PopupMenu>
        </div>
      </div>

      <div className="buscontainer m-auto">
        <div className="searchdetails mx-5 ">
          <div class="row align-items-center">
            <div class="col">
              <input
                type="text"
               
                value={text}
                class="form-control"
                onValue={() => {
                  setTimeout(() => {
                    setSource([]);
                  }, 100);
                }}
                placeholder="From"
                data={Businfo}
                onChange={(e) => getSearch(e)}
              />
              {source &&
                source.length > 0 &&
                source.map((item, i) => (
                  <>
                    <div
                      key={i}
                      className="suggestion w-25"
                      onClick={() => handleSuggestionSource(item.source)}
                    >
                      {item.source}
                    </div>
                  </>
                ))}
            </div>

            <div class="col">
              <input
                type="text"
                value={des}
                onValue={() => {
                  setTimeout(() => {
                    setDestination([]);
                  }, 100);
                }}
                class="form-control"
                placeholder="To"
                data={Businfo}
                onChange={(e) => getdesSearch(e)}
              />
              {destination &&
                destination.length > 0 &&
                destination.map((item, i) => (
                  <>
                    <div key={i}
                     className="suggestion"
                     onClick={() => handleSuggestionDestination(item.destination)}
                     >{item.destination}</div>
                  </>
                ))}
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
              <button
                className="btn btn-danger ml-5 w-25"
                onClick={(e) => handleFilter(e)}
              >
                search
              </button>
            </div>
          </div>

          {Businfo &&
            Businfo.length > 0 &&
            Businfo.map((bus, idx) => {
              return (
                <div key={idx} className="card mt-5 buslist">
                  <div className="row ml-5">
                    <div className="col-6 col-sm-3 mt-2 fw-bold"></div>
                    <div className="col-6 col-sm-3 mt-2 fw-bold ">From</div>
                    <div className="col-6 col-sm-3 mt-2 fw-bold">To</div>
                    <div className="col-6 col-sm-3 mt-2 fw-bold ">Price</div>

                    <div className="w-100 d-none d-md-block"></div>

                    <div className="col-6 col-sm-3 mb-4  text-danger fw-bold">
                      {bus.busroute[0].Bus_name}
                      <br />
                      {bus.busroute[0].Bus_Type}
                    </div>
                    <div className="col-6 col-sm-3 mb-4">
                      {bus.source}
                      <br />
                      <br />
                      <b>Arrival Time:</b> <br />
                      {bus.arrival_time}
                    </div>
                    <div className="col-6 col-sm-3 mb-4">
                      {bus.destination}
                      <br />
                      <br /> <b> Departure Time: </b>
                      <br />
                      {bus.departure_time}
                    </div>
                    <div className="col-6 col-sm-3 mb-4 fw-bold ">
                      <br />
                      <label className="bg-warning">
                        $ {bus.busroute[0].Price}{" "}
                      </label>
                      <br />
                      <br />
                      <Link to="/choose">
                        <button
                          className="btn btn-danger"
                          onClick={() => {
                            handleSubmit(bus.bus_id, userData._id, bus.source);
                          }}
                        >
                          Book Now
                        </button>
                      </Link>
                    </div>
                  </div>
                </div>
              );
            })}
        </div>
      </div>
    </div>
  );
}
