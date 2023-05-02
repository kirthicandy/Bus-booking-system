import {React,useState,useEffect} from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const BookingDetails = () =>{
    const [data,setData] = useState()
const [dataLength,setDataLength] = useState()
const {id} = useParams()

useEffect(()=>{
    handleBooking()

},[])
const handleBooking = async() =>{
    await axios.get(`http://localhost:2112/booking/${id}`) .then((data)=>{
        console.log("book",data.data)
        setData(data.data)
      
        setDataLength(data.data.length)
               
    }).catch((err)=>{
        console.log("errorbook=",err)
    }
    )


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
     <th >Seat No</th>
     <th>Cost</th>
     <th>Status</th>
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
   <td>{item.status}</td>
   <td></td>
   
 </tr>

     ))}
     
    
         
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
export default BookingDetails