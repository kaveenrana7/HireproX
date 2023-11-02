import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./index.css";
import CSRNavbar from "./CSRNavbar";
import Switch from '@mui/material/Switch';

import {
  Table,
  TableHead,
  TableBody,
  TableCell,
  TableRow,
  Paper,
  Avatar,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  IconButton,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete"; // Import the DeleteIcon

const CSR = () => {
  const [showPasswordIndex, setShowPasswordIndex] = useState(null);
  const handleStatusToggle = (index) => {
    const updatedData = [...tableData];
    updatedData[index].status = updatedData[index].status === "1" ? "0" : "1";
    setTableData(updatedData);
  };
  const [tableData, setTableData] = useState([])
  useEffect(() => {
    // console.log("noOfCustomers")
    // Fetch amount
    fetch("http://localhost:3512/getcsr")
      .then(response => response.json())
      .then(data => setTableData(data))
      .catch(error => console.error("Error fetching amount:", error));


  }, []);
 

  const [confirmationDialogOpen, setConfirmationDialogOpen] = useState(false);
  const [deleteRowIndex, setDeleteRowIndex] = useState(null);

  const handleDeleteClick = (index) => {
    setDeleteRowIndex(index);
    setConfirmationDialogOpen(true);
  };

  const handleConfirmDelete = () => {
    const updatedData = [...tableData];
    updatedData.splice(deleteRowIndex, 1);
    setTableData(updatedData);
    setDeleteRowIndex(null);
    setConfirmationDialogOpen(false);
  };

  const handleCancelDelete = () => {
    setDeleteRowIndex(null);
    setConfirmationDialogOpen(false);
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
      <Link to="/addcsr">
        <Button
          elevation={0}
          variant="contained"
          style={{
            marginLeft: "350px",
            backgroundColor: "#FFCF70",
            color: "black",
          }}
        >
          Add CSR
        </Button>
      </Link>
      <Paper
        elevation={0}
        style={{
          width: "1014px",
          margin: "20px 0 0px 350px",
          padding: "10px",
          backgroundColor: "white",
          maxHeight: "500px",
          overflowY: "auto",
        }}
        className="fade-in"
      >
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Contact</TableCell>
              <TableCell>Password</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Disable</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {tableData.map((row, index) => (
              <TableRow key={index}>
                <TableCell
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "20px",
                  }}
                >
                  <Avatar src={`avatar-${index}.png`} alt={row.name} />
                  {row.name}
                </TableCell>
                <TableCell>{row.email}</TableCell>
                <TableCell>{row.phone}</TableCell>
                <TableCell>
                  {index === showPasswordIndex ? row.passwordhash : "****"}
                  <Button
                    size="small"
                    style={{ marginLeft: '10px' }}
                    onClick={() => {
                      if (showPasswordIndex === index) {
                        setShowPasswordIndex(null); // Hide password if it's already showing
                      } else {
                        setShowPasswordIndex(index); // Show password for the clicked row
                      }
                    }}>
                    {index === showPasswordIndex ? "Hide" : "Show"}
                  </Button>
                </TableCell>

                <TableCell
                  className={
                    row.status === "1" ? "active-status" : "offline-status"
                  }
                >
                  <span
                    className={
                      row.status === "1"
                        ? "status-cell-active"
                        : "status-cell-offline"
                    }
                  />
                  {row.status === "1" ? "Active" : "Disabled"}
                </TableCell>
                <TableCell>
                  <Switch
                    checked={row.status === "1"}
                    onChange={() => handleStatusToggle(index)}
                    inputProps={{ 'aria-label': 'controlled' }}
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Paper>

      {/* Delete Confirmation Dialog */}
      <Dialog
        open={confirmationDialogOpen}
        onClose={handleCancelDelete}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">Confirm Deletion</DialogTitle>
        <DialogContent>
          Are you sure you want to delete this record?
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCancelDelete} color="primary">
            Cancel
          </Button>
          <Button onClick={handleConfirmDelete} color="primary" autoFocus>
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default CSR;
