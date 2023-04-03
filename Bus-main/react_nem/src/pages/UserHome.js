import React, { useState, useEffect } from "react";
import '../assests/css/userhome.css'
import { PopupMenu } from "react-simple-widgets";
import axios from "axios";

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
      let chooseItem = data.data.filter((item) => item.Source === e.target.value);
      setBusinfo(chooseItem);
      console.log("hi", chooseItem);
    });
  }; 
  const getdesSearch = (e) => {
    setChoos(e.target.value);
    console.log(e.target.value);

    axios.get("http://localhost:2112/busroute/aggregate").then((data) => {
      let chooseItem = data.data.filter((item) => item.Destination === e.target.value);
      setBusinfo(chooseItem);
      console.log("hi", chooseItem);
    });
  };
  const handleFilter=(e)=>{
    axios.get("http://localhost:2112/busroute/aggregate").then((data) => {
      let chooseItem = data.data.filter((item) => item.Source === choose && item.Destination ===choos);
      setBusinfo(chooseItem);
  })
  }

  const handleSubmit = (bId,userid,Source) => {
    localStorage.setItem("selectedBusId", bId);
    localStorage.setItem("Userid", userid);
    localStorage.setItem("Source", Source);
    console.log("hi",bId)
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
  const logout=()=>{
    window.localStorage.clear()
    window.open('./',"_self")

  }

  return (
    <div className="x">
       <div id="app">
      <div className="text-end">
        <PopupMenu>
        
          <button className="btn btn-secondary ">
          <i className="far fa-circle-user m-2"></i>
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
                  <small >Logout</small>
                </button>
              </div>
            </div>
          </div>
        </PopupMenu>
      </div>
    </div>
  


      
      <p>Hii{userData.username}</p>
      <div className="search">
      <div className="box-2">
      <input
      type="text"
        className="box-2 "
        placeholder="Placeholder"
       
        data={Businfo}
        onChange={(e) => getSearch(e)}
      />
      </div>
      <div className="box-2">
      <input
       type="text"
            className="box-2"
            placeholder="Placeholder"
          
            data={Businfo}
            onChange={(e) => getdesSearch(e)}
          /> </div>
          </div>
          <button onClick={(e)=>handleFilter(e)}>search</button>

      <div className="buscontainer">
        {Businfo &&
          Businfo.length > 0 &&
          Businfo.map((bus, idx) => {
            return (
              <div key={idx} className="card mt-5 buslist">
                <div className="row ml-3">
                  <div className="col-6 col-sm-3 mt-2 font-weight-bold ">
                    Brand
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
                  <div className="col-6 col-sm-3 mb-4">{bus.Source}</div>
                  <div className="col-6 col-sm-3 mb-4">{bus.Destination}</div>
                  <div className="col-6 col-sm-3 mb-4">
                    {bus.busroute[0].Bus_Type}
                  </div>
                  <div className="col-6 col-sm-4 mb-2 ml-0">
                    
                   <Link to="/seat"><button className={
                        clas
                          ? "btn btn-primary btn-md"
                          : "btn btn-primary btn-md disabled"
                      }
                      onClick={() => {
                        handleSubmit(bus.Bus_id,userData._id,bus.Source);
                      }}
                    >
                      Book Now
                    </button></Link> 
                  </div>
                  <div className="col-6 col-sm-4 mb-2 ml-0">
                    <span
                      className={reset ? "badge badge-danger ml-5" : "disabled"}
                      // onClick={(e) => handleReset(e)}
                    >
                      Reset
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
      </div >
      
    </div>
  );
}
