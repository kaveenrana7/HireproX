import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./index.css";
import CSRNavbar from "./CSRNavbar";
import { Paper, TextField, Button, Avatar } from "@mui/material";


async function sendFormData(formData) {
  try {
    // console.log("success");
      const response = await fetch('http://localhost:3512/add-csr', {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json'
          },
          body: JSON.stringify(formData)
          
      });

      const result = await response.json();
      console.log(result);

      if (response.status === 200) {
          alert('Data sent successfully');
      } else {
          alert('Error sending data');
      }
  } catch (error) {
      console.error('There was an error sending the data:', error);
  }
}


const AddCSR = () => {
  const [formData, setFormData] = useState({
    name: "",
   
    email: "",
    phone: "",
    password:""
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };


 

  const handleAdd = () => {
    // Handle the form submission here, e.g., send the formData to the server
    sendFormData(formData)
    console.log(formData);
  };

  const handleDiscard = () => {
    // Handle discarding the form data or navigating to another page
    // Reset the form data if needed
    setFormData({
      name: "",
      email: "",
      password: "",
      phone: "",
      
    });
  };

  return (
    <div className="dashboard">
      <div className="slideBar">
        <img src="logo.png" alt="logo" className="dashboard--logo" />
        <ul className="ulContent">
          <Link to="/dashboard">
            <li>
              <ld>
                <ld>
                  <img src="dashboard--icon1.png" alt="icon" />
                </ld>
              </ld>
              <ld>Dashboard</ld>
            </li>
          </Link>
          <Link to="/finance">
            <li>
              <ld>
                <ld>
                  <img src="dashboard--icon2.png" alt="icon" />
                </ld>
              </ld>
              <ld>Finance</ld>
            </li>
          </Link>
          <Link to="/complaints">
            <li>
              <ld>
                <ld>
                  <img src="dashboard--icon3.png" alt="icon" />
                </ld>
              </ld>
              <ld>Complaints</ld>
            </li>
          </Link>
          <Link to="/csr">
            <li>
              <div className="active--link">
                <div className="yellow--mark"></div>
                <ld>
                  <ld>
                    <img src="dashboard--icon4.png" alt="icon" />
                  </ld>
                </ld>
                <ld className="active1">CSR</ld>
              </div>
            </li>
          </Link>
        </ul>
      </div>
      <div className="dashboard-navbar">
        <CSRNavbar
          firstName="Kaveen"
          avatar="Avatar.png"
          name="Kaveen Kalhara"
          role="Manager"
        />
      </div>
      <Paper
        elevation={0}
        className="fade-in"
        style={{
          width: "600px",
          margin: "20px auto",
          padding: "20px",
          backgroundColor: "white",
        }}
      >
        <h2>Add CSR</h2>
        <TextField
          label="Name"
          name="name"
          fullWidth
          value={formData.name}
          onChange={handleInputChange}
          margin="normal"
        />
        <TextField
          label="Email"
          name="email"
          fullWidth
          value={formData.email}
          onChange={handleInputChange}
          margin="normal"
        />
        <TextField
          label="Phone"
          name="phone"
          fullWidth
          value={formData.phone}
          onChange={handleInputChange}
          margin="normal"
        />
        <TextField
          label="Password"
          name="password"
          fullWidth
          value={formData.password}
          onChange={handleInputChange}
          margin="normal"
        />
     
      
        <div
          style={{
            marginTop: "20px",
            gap: "20px",
            display: "flex",
          }}
        >
          <Button
            variant="contained"
            color="primary"
            onClick={handleAdd}
            style={{
              marginLeft: "auto",
              backgroundColor: "#FFCF70",
              color: "black",
            }}
          >
            Add
          </Button>
          <Button
            variant="contained"
            color="secondary"
            onClick={handleDiscard}
            style={{
              backgroundColor: "#FFCF70",
              color: "black",
            }}
          >
            Discard
          </Button>
        </div>
      </Paper>
    </div>
  );
};

export default AddCSR;
