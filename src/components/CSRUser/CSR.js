import React, {useEffect, useState} from "react";
import {Link} from "react-router-dom";
import "./index.css";
import DashNavbar from "./CSRNavbar";
import {Switch} from "@mui/material";

import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    TextField,
} from "@mui/material";
import {Button} from "@mantine/core";
import ServiceProviderPopup from "./ServiceProviderPopup";

const CSRUser = () => {
    // create a service provider list dummy
    const [categoryRequest, setCategoryRequest] = useState([]);

    useEffect(() => {
        fetch("http://localhost:3512/getCategoryRequests")
            .then(response => response.json())
            .then(data => {
                setCategoryRequest(data);
                console.log(data);
            })
            .catch(error => console.error("Error fetching number of customers:", error));
    }, []);
    // console.log(categoryRequest);

    const [selectedServiceProvider, setSelectedServiceProvider] = useState(null);
    const [popupVisible, setPopupVisible] = useState(false);

    const handleViewClick = (serviceProvider) => {
        setSelectedServiceProvider(serviceProvider);
        setPopupVisible(true);
    };

    const handleAccept = (providerid, category, categoryid) => {
        const data = {
            providerid: providerid,
            category: category,
            categoryid: categoryid
        };

        console.log(data);

        const requestOptions = {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(data),
        };

        fetch("http://localhost:3512/setCategory", requestOptions)
        .then(response => response.json())
        .then(data => {
            console.log('Success:', data);
        })
        .catch(error => {
            console.error('Error:', error);
        });
        // console.log(providerid.toString());
        setPopupVisible(false);
    };

    const handleReject = (providerid, category, categoryid) => {
        const data = {
            providerid: providerid,
            category: category,
            categoryid: categoryid
        };

        console.log(data);

        const requestOptions = {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(data),
        };

        fetch("http://localhost:3512/rejectCategory", requestOptions)
        .then(response => response.json())
        .then(data => {
            console.log('Success:', data);
        })
        .catch(error => {
            console.error('Error:', error);
        });
        setPopupVisible(false);
    };

    const handleClose = () => {

        setPopupVisible(false);
    };

    return (
        <div className="dashboard">
            <div className="slideBar">
                <img src="logo.png" alt="logo" className="dashboard--logo"/>
                <ul className="ulContent">
                    <Link to="/csrdashboard">
                        <li>
                            <ld>
                                <ld>
                                    <img src="dashboard--icon1.png" alt="icon"/>
                                </ld>
                            </ld>
                            <ld>Dashboard</ld>
                        </li>
                    </Link>
                    <Link to="/csrcomplaints">
                        <li>
                            <ld>
                                <ld>
                                    <img src="dashboard--icon3.png" alt="icon"/>
                                </ld>
                            </ld>
                            <ld>Complaints</ld>
                        </li>
                    </Link>
                    <Link to="/csruser">
                        <li>

                            <div className="active--link">
                                <div className="yellow--mark"></div>
                                <ld>
                                    <ld>
                                        <img src="dashboard--icon4.png" alt="icon"/>
                                    </ld>
                                </ld>
                                <ld className="active1">Category Review</ld>
                            </div>
                        </li>
                    </Link>
                    <Link to="/CSRSPApprove">
                        <li>
                            <ld>
                                <ld>
                                    <img src="dashboard--icon3.png" alt="icon"/>
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
            <div className="service-table fade-in">
                <TableContainer style={{maxHeight: "350px"}}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>Name</TableCell>
                                <TableCell>Time Applied</TableCell>
                                <TableCell></TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {categoryRequest.map((request, index) => (
                                <TableRow key={index}>
                                    <TableCell>
                                        {request.name}
                                    </TableCell>
                                    <TableCell>
                                        {request.category}
                                    </TableCell>
                                    <TableCell>
                                        <Button variant="outline" color="blue" size="sm"
                                                onClick={() => handleViewClick(request)}>
                                            View
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </div>
            {popupVisible && (
                <ServiceProviderPopup
                    serviceProvider={selectedServiceProvider}
                    onClose={handleClose}
                    onAccept={() => handleAccept(selectedServiceProvider.id, selectedServiceProvider.category, selectedServiceProvider.id)}
                    onReject={() => handleReject(selectedServiceProvider.id, selectedServiceProvider.category, selectedServiceProvider.id)}
                />
            )}
        </div>
    );
}

export default CSRUser;
