import {React, useState,useEffect}from "react";
import axios from "axios";

const MyBooking = () =>{

const [data,setData] = useState()
const [dataLength,setDataLength] = useState()

useEffect(()=>{
    handleBooking()

},[])
const handleBooking = async() =>{
    await axios.post('http://localhost:2112/booking/mybook',{
    user_id:window.localStorage.getItem("user_id"),}
 
    
    )   .then((data)=>{
        setData(data.data)
        setDataLength(data.data.length)
        console.log(data.data)
               
    })
    


}
return(
    <>
     <div className="">
    
     
       
          {data && data.length>0 && data.map((item, index) => {
            return (
                 
      <table className="table">
      <thead>
        <tr>
          <th> S.No</th>
          <th>Name</th>
          <th>Age</th>
          <th>Gender</th>
          <th>Boarding Point</th>
          <th>Dropping Point</th>
          <th>Ticket</th>
          <th>Seat No</th>
          <th>Cost</th>
        </tr>
      </thead>
      <tbody>
      {item.user_detail.map((i,id)=>(
        <tr key={item._id}>
        <th scope="row">{id + 1}</th>
        <td>{i.name}</td>
        <td>{i.gender}</td>
        <td>{i.age}</td>
        <td>{item.boarding_point}</td>
        <td>{item.dropping_point}</td>
        <td>{item.no_of_seats}</td>
        <td>{item.booked_seats}</td>
        <td>{item.total_price}</td>
        
      </tr>

          ))}
              
              </tbody>
              </table>
            )
          })}
       
        
    
     
    </div>
    </>
)


}
export default MyBooking