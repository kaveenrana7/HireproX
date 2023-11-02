import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./index.css";
import Card from "./Card";
import Card2 from "./Card-2";
import DashNavbar from "./DashNavbar";
import Stat1 from "./Stat1";
import Stat2 from "./Stat2";

const CSRDashboard = () => {


  const [amount, setAmount] = useState(0);
  const [noOfCustomers, setNoOfCustomers] = useState(0);
  const [noOfServiceProvider, setnoOfServiceProvider] = useState(0);
  const [categoryCount, setcategoryCount] = useState(0);
  const [taskbymonth, settaskbymonth] = useState(0);
  useEffect(() => {
    // console.log("noOfCustomers")
    // Fetch amount
    fetch("http://localhost:3512/getserviceprovidercount")
      .then(response => response.json())
      .then(data => setnoOfServiceProvider(Number(data.serviceprovidercount)))
      .catch(error => console.error("Error fetching amount:", error));


    fetch("http://localhost:3512/getrevenue")
      .then(response => response.json())
      .then(data => setAmount(Number(data.total_amount)))
      .catch(error => console.error("Error fetching amount:", error));


    // Fetch number of customers
    fetch("http://localhost:3512/getcustomercount")
      .then(response => response.json())
      .then(data => setNoOfCustomers(Number(data.customercount)))
      .catch(error => console.error("Error fetching number of customers:", error));

    fetch("http://localhost:3512/getCompletedGroupBy")
      .then(response => response.json())
      .then(data => setcategoryCount((data)))
      .catch(error => console.error("Error fetching number of customers:", error));

    fetch("http://localhost:3512/gettasksbymonth")
      .then(response => response.json())
      .then(data => settaskbymonth((data)))
      .catch(error => console.error("Error fetching number of customers:", error));

  }, []);
  // console.log(categoryCount["Lawn Mowing"])


  return (
    <div className="dashboard">
      <div className="slideBar">
        <img src="logo.png" alt="logo" className="dashboard--logo" />
        <ul className="ulContent">
          <Link to="/csrdashboard">
            <li>
              <div className="active--link">
                <div className="yellow--mark"></div>
                <ld>
                  <ld>
                    <img src="dashboard--icon1.png" alt="icon" />
                  </ld>
                </ld>
                <ld className="active1">Dashboard</ld>
              </div>
            </li>
          </Link>
          <Link to="/csrcomplaints">
            <li>
              <ld>
                <ld>
                  <img src="dashboard--icon3.png" alt="icon" />
                </ld>
              </ld>
              <ld>Complaints</ld>
            </li>
          </Link>
          <Link to="/CSRUser">
            <li>
              <ld>
                <ld>
                  <img src="dashboard--icon4.png" alt="icon" />
                </ld>
              </ld>
              <ld>Category Review</ld>
            </li>
          </Link>
          <Link to="/CSRSPApprove">
            <li>
              <ld>
                <ld>
                  <img src="dashboard--icon3.png" alt="icon" />
                </ld>
              </ld>
              <ld>Service Providers</ld>
            </li>
          </Link>
        </ul>
      </div>
      <div className="dashboard-navbar">
        <DashNavbar
          firstName="Kaveen"
          avatar="Avatar.png"
          name="Kaveen Kalhara"
          role="Manager"
        />
      </div>
      <div className="cards-2">
        <Link to="/csrserviceprovider">
          <Card2 heading="Service Provider" active="card-2" />
        </Link>
        <Link to="/csrcustomer">
          <Card2 heading="Customer" active="card-2" />
        </Link>
        <Link to="/csrcategory">
          <Card2 heading="Category" active="card-2" />
        </Link>
      </div>
      <div className="stat fade-in">
        <Stat1 lawnmoving={categoryCount["Lawn Mowing"]} cleaning={categoryCount["Cleaning"]} hairdressing={categoryCount["Hair Dressing"]} />
        <Stat2 jan={Number(taskbymonth["1"])} feb={Number(taskbymonth["2"])}  mar={Number(taskbymonth["3"])} apr={Number(taskbymonth["4"])} may={Number(taskbymonth["5"])} jun={Number(taskbymonth["6"])} jul={Number(taskbymonth["7"])} aug={Number(taskbymonth["8"])} sep={Number(taskbymonth["9"])} oct={Number(taskbymonth["10"])} nov={Number(taskbymonth["11"])} dec={Number(taskbymonth["12"])} />
      </div>
    </div>
  );
};

export default CSRDashboard;
