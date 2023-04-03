import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
// import Add from "./Add";
import "bootstrap-icons/font/bootstrap-icons.css";

const AdminHome = () => {
  const [data, setData] = useState([]);
  const {_id} = useParams()

  const loadData = async () => {
    const response = await axios.get("http://localhost:2112/businfo");
    setData(response.data);
  };
  useEffect(() => {
    loadData();
  });

    const handleDelete = (_id) => {
      {
        axios.delete(`http://localhost:2112/businfo/${_id}`);
        console.log(_id);
        setTimeout(()=> loadData(),500)
      }
    };
  return (
    <div className="container">
      <div>
        {/* <Link to="/add">
                    <button className="add">Add New</button>
                  </Link> */}
      </div>
      <table>
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
                    <Link to={`/update/${item._id}`}>
                      <i class="bi bi-pencil-square"></i>
                    </Link>
                  </span>
                  <span className="btn">
                    <i
                      class="bi bi-trash-fill"
                      onClick={() => handleDelete(item._id)}
                    ></i>
                  </span>
                  <span className="btn">
                    <i class="bi bi-eye-fill"></i>
                  </span>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};
export default AdminHome;
