import {  useEffect, useState } from "react";
import React from "react";
import "./AddEdit.css";
import { Link, useNavigate ,useParams} from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";

const initialState = {
  name: "",
  email: "",
  contact: "",
};
const AddEdit = () => {
  const [state, setState] = useState(initialState);
  const { name, email, contact } = state;
      const navigate = useNavigate();
const  {id}=useParams();
useEffect(()=>{
axios.get(`http://localhost:3001/api/get/${id}`).then((resp)=>{
  setState({ ...resp.data[0]})
})
},[id])
  const handlesubmit = (e) => {
    e.preventDefault();
    if (!name || !email || !contact) {
        toast.error("Pls Provide Value In Each Input Field ")
    }else{

      if (!id) {
        axios.post("http://localhost:3001/api/post",{
          name,
          email,
          contact,
      }).then(()=>{
          setState({name:"",email:"",contact:""});
      }).catch((err)=>{
          toast.error(err.response.data )
      });
      toast.success("Your Text Field added Sucessfully")
      } else {
        axios.put(`http://localhost:3001/api/update/${id}`,{
          name,
          email,
          contact,
      }).then(()=>{
          setState({name:"",email:"",contact:""});
      }).catch((err)=>{
          toast.error(err.response.data )
      });
      toast.success("Contact Updated Sucessfully")
      }
       
        
        setTimeout(() => navigate('/'), 500);
    };
  };
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setState({ ...state, [name]:value});
  };
  return (
    <div style={{ marginTop: "100px" }}>
      <form
        style={{
          margin: "auto",
          padding: "15px",
          maxWidth: "400px",
          alignContent: "center",
        }}
        onSubmit={handlesubmit}
      >
        <label htmlFor="name">Name :</label>
        <input
          type="text"
          id="name"
          name="name"
          placeholder="Enter Your Name.."
          value={name || ""}
          onChange={handleInputChange}
        />
        <label htmlFor="email">Email :</label>
        <input
          type="email"
          id="email"
          name="email"
          placeholder="Enter Your email.."
          value={email ||""}
          onChange={handleInputChange}
        />
        <label htmlFor="contact">Contact :</label>
        <input
          type="number"
          id="contact"
          name="contact"
          placeholder="Enter Your Contact Number.."
          value={contact || ""}
          onChange={handleInputChange}
        />
        <input type='submit' value={id ? "update" :"Save"} />
        <Link to='/'>
        <input type='button' value='Go back' />
        </Link>
      </form>
    </div>
  );
};

export default AddEdit;
