import {React, useState,useEffect}from "react";
import axios from "axios";

const MyBooking = () =>{

const [data,setData] = useState()
const [dataLength,setDataLength] = useState()



useEffect(()=>{
    handleBooking()

},[data])
const handleBooking = async() =>{
    await axios.post('http://localhost:2112/booking/mybook',{
    user_id:window.localStorage.getItem("user_id"),}
 
    
    )   .then((data)=>{
        setData(data.data.filter(booking => !booking.deleted))
        setDataLength(data.data.length)
        console.log(data.data)
               
    })
    


}
const handleCancel = async(bId,busid,book) =>{
   if(window.confirm("Are you Sure! You have to Cancel?")) {
    await axios.put('http://localhost:2112/booking/cancel',{
        booking_id:bId,
        busroute_id:busid,
        booked_seats:book
    }
    ).then((data)=>{
        console.log(data)
      
        
      
    })
    

   }
   else{
    alert('Done')
   }
 
 
   
  
}
return(
    <>
     <div className="">
    {dataLength >0?
    <>
   {data && data.length>0 && data.map((item, index) => {
        return (
            <>
            <h4>Booking {index+1}:</h4>
             
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
      
      <button className="btn btn-secondary" onClick={()=>{handleCancel(item._id,item.busroute_id,item.booked_seats) }}  >Cancel</button>
          
          </tbody>
          </table>
         
          <br/>
          </>
        )
        
      })}</>

    
:<h4>No Booking yet</h4>}
     
       
         
     
    </div>
    </>
)


}
export default MyBooking