import {React, useState,useEffect}from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const MyBooking = () =>{

const [data,setData] = useState()

useEffect(()=>{
    handleBooking()

},[])
const handleBooking = async() =>{
    await axios.post('http://localhost:2112/booking/mybook',{
    user_id:window.localStorage.getItem("user_id"),}
 
    
    )   .then((data)=>{
        console.log(data);
    })
    


}
// return(
// <>
//  <div className="container">
      
//       <table className="table mt-5">
//         <thead>
//           <tr>
//             <th> Passenger Name</th>
//             <th>Bus_name</th>
//             <th>Bus_number</th>
//             <th>Available_seats</th>
//             <th>Bus_Type</th>
//             <th>Price</th>
//           </tr>
//         </thead>
//         <tbody>
//           {data.map((item, index) => {
//             return (
//               <tr key={item._id}>
//                 <th scope="row">{index + 1}</th>
//                 <td>{item.Bus_name}</td>
//                 <td>{item.Bus_number}</td>
//                 <td>{item.Available_seats}</td>
//                 <td>{item.Bus_Type}</td>
//                 <td>{item.Price}</td>
//                 <td>
//                   <span className="btn">
//                     <Link to={`/update/${item._id}`}>
//                       <i class="bi bi-pencil-square"></i>
//                     </Link>
//                   </span>
//                   <span className="btn">
//                     <i
//                       class="bi bi-trash-fill"
//                     //   onClick={() => handleDelete(item._id)}
//                     ></i>
//                   </span>
//                   <span className="btn">
//                     <i class="bi bi-eye-fill"></i>
//                   </span>
//                 </td>
//               </tr>
//             );
//           })}
//         </tbody>
//       </table>
      
//     </div>
//     <div className="text-right">
//         <Link to="/add">
//                     <button className="btn btn-primary ">Add New</button>
//                   </Link>
//       </div>


//     </>
    
//   );


}
export default MyBooking