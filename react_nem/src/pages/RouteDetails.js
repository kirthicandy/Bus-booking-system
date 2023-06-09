import {React,useState,useEffect} from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useParams } from "react-router-dom";
import '../assests/css/adminhome.css'


const RouteDetails = () =>{
    const {id} = useParams()
    const [data,setData] = useState([])

    useEffect(()=>{
        handlePost()
    },[id,data])

const handlePost = async() =>{
    await axios
    .get(`http://localhost:2112/busroute/view/${id}`)
    .then((res) => {
     
      setData(res.data.filter(data => !data.deleted))

    })
    .catch((err) => {
      console.log(err);
    });

}
const handleDelete = async(id)=>{
  await axios.put(`http://localhost:2112/busroute/delete/${id}`).then((data)=>{
    console.log(data)
  })
  
}

return(
    <>
     <div className="">
      
      
      <table className="routetable">
        <thead>
          <tr>
            <th> S.No</th>
            <th>Source</th>
            <th>Destination</th>
            <th>Arrival Time</th>
            <th>Departure Time</th>
            <th >Seats</th>
            <th>Reserved seat</th>
            <th>Boarding Point</th>
            <th>Dropping Point</th>
          </tr>
        </thead>
        <tbody>
          {data && data.length >0 && data.map((item, index) => {
            return (
              <tr key={item._id}>
                <th scope="row">{index + 1}</th>
                <td>{item.source}</td>
                <td>{item.destination}</td>
                <td>{item.arrival_time}</td>
                <td>{item.departure_time}</td>
                <td>{item.available_Seat.length}</td>
                <td>{item.reserved_seat}</td>
                <td>{item.boarding_point}</td>
                <td>{item.dropping_point}</td>
                <td>
                  <span className="btn">
                    <Link to={`/updaterouteinfo/${item._id}`}>
                      <i class="bi bi-pencil-square"></i>
                    </Link>
                  </span>
                  <span className="btn" onClick={()=>handleDelete(item._id)}>
                    <i
                      class="bi bi-trash-fill"
                     
                    ></i>
                  </span>
                  <Link to={`/bookinginfo/${item._id}`}>
                  <span className="btn">
                    <i class="bi bi-eye-fill"></i>
                  </span></Link>
                 
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <div>
       <Link to={`/addroute/${id}`}>
                    <button className="float-right btn btn-primary">Add Route</button>
                  </Link>
      </div>
    </div>
    </>
)
   
}
export default RouteDetails