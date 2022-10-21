import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./Home.css";
import { toast } from "react-toastify";
import axios from "axios";

const Home = () => {
  const [data, setData] = useState([]);

  //API Call

  const loadData = async () => {
    const response = await axios.get("http://localhost:3001/api/get");
    setData(response.data);
  };

  useEffect(() => {
    loadData();
  }, []);

  const delectContact =(id)=>{
if (window.confirm("Are you Sure want to delet the contact ?")) {
  axios.delete(`http://localhost:3001/api/remove/${id}`);
  toast.success("Contact Deleted Successfully");
  setTimeout(() => {
    loadData();
  }, 5000);
}
  }
  return (
    <div style={{ marginTop: "150px" }}>
      <Link to={`/Addcontact`}>
        <button className="btn btn-contact">Add Contact</button>
      </Link>
      <table className="style-tabe">
        <thead>
          <tr>
            <th style={{ textAlign: "center" }}>No</th>
            <th style={{ textAlign: "center" }}>Name</th>
            <th style={{ textAlign: "center" }}>Email</th>
            <th style={{ textAlign: "center" }}>Contact</th>
            <th style={{ textAlign: "center" }}>Action</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => {
            return (
              <tr key={item.id}>
                <th scope="row">{index + 1}</th>
                <td>{item.name}</td>
                <td>{item.email}</td>
                <td>{item.contact}</td>
                <td>
                  <Link to={`/update/${item.id}`}>
                    <button className="btn btn-edit">Edit</button>
                  </Link>
                  <button className="btn btn-delete" onClick={()=>delectContact(item.id)}>Delet</button>
                  <Link to={`/view/${item.id}`}>
                    <button className="btn btn-view">View</button>
                  </Link>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default Home;
