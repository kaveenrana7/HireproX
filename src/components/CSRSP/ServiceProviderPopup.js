import React, {useEffect, useState} from "react";
import { Button } from "@mantine/core";
import "./index.css";
import { storage, firebaseApp } from '../../firebase';
import { ref, getDownloadURL } from 'firebase/storage';

async function getProfileImage(id) {
    try {
        const storageRef = ref(storage, `serviceProvider/profilePicture/${id}.png`);
        const url = await getDownloadURL(storageRef);
        console.log(url);
        return url;
    } catch (error) {
        console.error('Error getting image:', error);
        return null;
    }
}

async function getDlImage(id) {
    try {
        const storageRef = ref(storage, `/serviceProvider/drivingLicense/${id}.png`);
        const url = await getDownloadURL(storageRef);
        console.log(url);
        return url;
    } catch (error) {
        console.error('Error getting image:', error);
        return null;
    }
}

async function getProofImage(id) {
    try {
        const storageRef = ref(storage, `/serviceProvider/proofs/${id}.png`);
        const url = await getDownloadURL(storageRef);
        console.log(url);
        return url;
    } catch (error) {
        console.error('Error getting image:', error);
        return null;
    }
}

const ServiceProviderPopup = ({ serviceProvider, onClose, onAccept, onReject }) => {
    const [imageSrc, setImageSrc] = useState(null);
    const [proofImageSrc, setProofImageSrc] = useState(null);
    const [idImageSrc, setIdImageSrc] = useState(null);

    useEffect(() => {
        const fetchImage = async () => {
            const url = await getProfileImage(serviceProvider.providerid);
            setImageSrc(url);
        };
        fetchImage();
    }, [serviceProvider.providerid]);

    useEffect(() => {
        const fetchImage = async () => {
            const url = await getProofImage(serviceProvider.id);
            setProofImageSrc(url);
        };
        fetchImage();
    }, [serviceProvider.id]);

    useEffect(() => {
        const fetchImage = async () => {
            const url = await getDlImage(serviceProvider.id);
            setIdImageSrc(url);
        };
        fetchImage();
    }, [serviceProvider.id]);

    return (
        <div className="popup">

            <h2>{serviceProvider.name}</h2>
            <img src={imageSrc} alt="service provider" />

            <p>Timestamp: {serviceProvider.timestamp}</p>

            <p>Email: {serviceProvider.email}</p>

            <p>Mobile: {serviceProvider.mobile}</p>
            <p>NIC: {serviceProvider.nic}</p>

            <p>Driving License</p>
            <img src={serviceProvider.drivinglicense} alt="driving license" />

            <p>Proof of Service</p>
            <div className="proofofservice">
                <img src={proofImageSrc} alt="proof of service" />
                <img src={idImageSrc} alt="proof of service" />
            </div>

            <div className="buttondiv">
            <Button variant="outline" color="green" onClick={onAccept}>
                Accept
            </Button>
            <Button variant="outline" color="red" onClick={onReject}>
                Reject
            </Button>
            <Button variant="outline" onClick={onClose}>
                Close
            </Button>
            </div>
        </div>
    );
};

export default ServiceProviderPopup;
