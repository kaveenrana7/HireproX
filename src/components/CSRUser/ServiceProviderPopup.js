import React, { useState, useEffect } from 'react';
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

async function getProofImage(id) {
    try {
        const storageRef = ref(storage, `/serviceProvider/request/${id}.png`);
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

    return (
        
        <div className="popup">

            <h1>Category Review Application</h1>

            <h2>{serviceProvider.name}</h2>
            <img src={imageSrc} style={{borderRadius: '50% 50%', height: '150px'}} alt="service provider" />

            <p>Email: {serviceProvider.email}</p>
            <p>Mobile: {serviceProvider.contact}</p>

            <p>Requesting Category: </p>
            <p>{serviceProvider.category}</p>

            <p>Category Proofs</p>
            <div className="proofofservice">
                <img src={proofImageSrc} alt="Category Proof" />
            </div>

            <br/>
            <br/>

            <div className="buttondiv">
            <Button variant="outline" color="green" onClick={onAccept}>
                Approve
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
