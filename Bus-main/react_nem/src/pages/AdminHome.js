import React, { useEffect, useState } from "react";
import axios from "axios";
import { PopupMenu } from "react-simple-widgets";
import { Link, useParams } from "react-router-dom";

import "bootstrap-icons/font/bootstrap-icons.css";

const AdminHome = ({adminData}) => {
  const [data, setData] = useState([]);
  const {_id} = useParams()

  const loadData = async () => {
    const response = await axios.get("http://localhost:2112/businfo");
    setData(response.data);
  };
  useEffect(() => {
    loadData();
  },[]);
  const logout = () => {
    window.localStorage.clear();
    window.open("./", "_self");
  };

   
  return (
    
    <div className="">
       <div id="app">
        <div className="text-end">
          
          <PopupMenu>
            <button className="btn btn-secondary ">
              <i className="far fa-circle-user m-1"></i>
              <small>{adminData.email}</small>
            </button>

            <div className="card text-start mt-4">
              <div className="card-body px-4 py-4">
                <div id="circle-avatar" className="text-center mx-auto mb-4">
                  <span>K</span>
                </div>

                <h5 className="text-center mb-0">{adminData.username}</h5>
                <p className="text-center mb-2">{adminData.email}</p>

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
      
      
      <table className="table">
        <thead>
          <tr>
            <th> Bus_id</th>
            <th>Bus_name</th>
            <th>Bus_number</th>
            <th>Available_seats</th>
            <th>Bus_Type</th>
            <th>Price</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => {
            return (
              <tr key={item._id}>
                <th scope="row">{index + 1}</th>
                <td>{item.Bus_name}</td>
                <td>{item.Bus_number}</td>
                <td>{item.Available_seats}</td>
                <td>{item.Bus_Type}</td>
                <td>{item.Price}</td>
                <td>
                  <span className="btn">
                    <Link to={`/updatebusinfo/${item._id}`}>
                      <i class="bi bi-pencil-square"></i>
                    </Link>
                  </span>
                  <span className="btn">
                    <i
                      class="bi bi-trash-fill"
                      
                    ></i>
                  </span>
                  <Link to={`/route/${item._id}`}>
                  <span className="btn">
                    <i class="bi bi-eye-fill"></i>
                  </span>
                  </Link>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <div>
        <Link to="/add">
                    <button className="float-right btn btn-primary">Add Bus</button>
                  </Link>
      </div>
    </div>
  );
};
export default AdminHome;