import {React,useState,useEffect} from "react";
import { useParams } from "react-router-dom";
import axios from "axios";


const UpdateBusInfo =  () =>{

    const info = {
        Bus_name: "",
        Bus_number: "",
        Available_seats: "",
        Bus_Type: "",
        Price: "",
      };
      const [data, setData] = useState(info);
      const {id} = useParams()
      const { Bus_name, Bus_number, Available_seats, Bus_Type, Price } = data;

    useEffect(()=>{
        handleGetData()
    },[id])

      const handleGetData = async() =>{
        await axios
        .get(`http://localhost:2112/businfo/${id}`).then((res)=>{
        console.log(res)
        setData(res.data)})
        .catch((err)=>{
            console.log(err);
        })


      }
    
      const handleChange = (event) => {
        console.log(event);
    
        setData(() => ({
          ...data,
          [event.target.name]: event.target.value,
        }));
      };
    
      const handleSubmit = async (e) => {
        await axios
          .put(`http://localhost:2112/businfo/update/${id}`, {
            
            Bus_name: Bus_name,
            Bus_number: Bus_number,
            Available_seats: Available_seats,
    
            Bus_Type: Bus_Type,
            Price: Price,
          })
          .then((res) => {
            console.log(res);
            alert("Updated");
            window.open("/userDetails", "_self");
          })
          .catch((err) => {
            console.log(err);
          });
      };
      return (
        <>
          <div className="container bg-secondary">
            <div className="form m-auto">
              <h2 className="text-center">Bus Details</h2>
    
              <div className="input-group input-group-sm row p-2 ">
                <label>Bus Name:</label>
                <input
                  type="text"
                  class="form-control"
                  aria-label="Small"
                  aria-describedby="inputGroup-sizing-sm"
                  name="Bus_name"
                  value={Bus_name}
                  onChange={handleChange}
                ></input>
              </div>
              <div className="input-group input-group-sm row p-2 ">
                <label>Bus No:</label>
                <input
                  type="text"
                  class="form-control" aria-label="Small" aria-describedby="inputGroup-sizing-sm"
                  name="Bus_number"
                  value={Bus_number}
                  onChange={handleChange}
                ></input>
              </div>
              <div className="input-group input-group-sm row p-2 ">
                <label>Number of Seats:</label>
                <input
                  type="text"
                  class="form-control" aria-label="Small" aria-describedby="inputGroup-sizing-sm"
                  name="Available_seats"
                  value={Available_seats}
                  onChange={handleChange}
                ></input>
              </div>
              <div className="p-2 m-3">
                <input
                  type="radio"
                  
                  name="Bus_Type"
                  value="Sleeper/NA"
                  id="Sleeper/NA"
                  onChange={handleChange}
                ></input>
                <label>Sleeper/NA</label>
                <br />
                <input
                  type="radio"
                  name="Bus_Type"
                  value="Sleeper/AC"
                  id="Sleeper/AC"
                  onChange={handleChange}
                ></input>
                <label>Sleeper/AC</label>
                <br />
                <input
                  type="radio"
                  name="Bus_Type"
                  value="Seater/NA"
                  id="Seater/NA"
                  onChange={handleChange}
                ></input>
                <label>Seater/NA</label>
                <br />
                <input
                  type="radio"
                  name="Bus_Type"
                  value="Seater/AC"
                  id="Seater/AC"
                  onChange={handleChange}
                ></input>
                <label>Seater/AC</label>
              </div>
              <div className="input-group input-group-sm row p-2  ">
                <label>Price:</label>
                <input
                  type="text"
                  class="form-control" aria-label="Small" aria-describedby="inputGroup-sizing-sm"
                  name="Price"
                  value={Price}
                  onChange={handleChange}
                ></input>
              </div>
              <div className="text-center" >
               <button className="btn btn-primary" onClick={handleSubmit}>Submit</button> 
              </div>
            </div>
          </div>
        </>
      );

}
export default UpdateBusInfo