import React, { useState, useEffect } from 'react'
import { FaAngleDoubleDown } from "react-icons/fa";
import axios from 'axios';
import '../assests/css/userhome.css'
export default function BusList({ userData }) {

   // const [obj, setObj] = useState('')
    const [reset, Setreset] = useState(false)
    const [arrowDown, setArrowDown] = useState(false)
    const [clas, SetClas] = useState(true)
    const [Businfo, setBusinfo] = useState([]);


    useEffect(() => {
      axios.get('http://localhost:2112/busroute/aggregate').then((data)=>{
        console.log("data",data.data)
        setBusinfo(data.data)
      // handleBusInfo()
    
      })
  // const handleBusInfo = () =>{
   
  
  // })
  })


    const handleSubmit = bId => {
        localStorage.setItem("selectedBusId", bId)
        SetClas(false)
        setArrowDown(true)
    }


    const handleReset = (e) => {
        if (clas === false) {
            Setreset(true)
            SetClas(true)
            setArrowDown(false)
        }
        localStorage.removeItem("selectedBusId")
    }


    const renderFunction = () => {
      
        return Businfo.map((bus, idx) => {
            let bId = bus._id
            return (
              <>
              
                <div key={idx} className="card mt-5 buslist">
                    <div class="row ml-3">
                        <div class="col-6 col-sm-3 mt-2 font-weight-bold ">Brand</div>
                        <div class="col-6 col-sm-3 mt-2 font-weight-bold ">From</div>
                        <div class="col-6 col-sm-3 mt-2 font-weight-bold ">To</div>
                        <div class="col-6 col-sm-3 mt-2 font-weight-bold ">Price</div>

                        <div class="w-100 d-none d-md-block"></div>

                      
                        <div class="col-6 col-sm-3 mb-4">{bus.id}</div>
                        <div class="col-6 col-sm-3 mb-4">{bus.Source}</div>
                        <div class="col-6 col-sm-3 mb-4">{bus.Destination}</div>
                        <div class="col-6 col-sm-3 mb-4">{bus.busroutes[0].Bus_Type}</div>
                        <div class="col-6 col-sm-4 mb-2 ml-0">
                            <button className={clas ? "btn btn-primary btn-md" : "btn btn-primary btn-md disabled"} onClick={(bId) => { handleSubmit(bus._id) }} >Book Now</button>
                        </div>
                        <div class="col-6 col-sm-4 mb-2 ml-0">
                            <span className={reset ? "badge badge-danger ml-5" : "disabled"} onClick={e => handleReset(e)}>Reset</span>
                        </div>
                        
                    </div>
                </div >
                </>
            )
        })

    }


    return (
        <div className="">
          <p>Hii{userData.username}</p>
            {renderFunction()}
            
            <div className={arrowDown ? "activeArrow" : "nonActive"}>
                <FaAngleDoubleDown />
            </div>
        </div>

    )
}
