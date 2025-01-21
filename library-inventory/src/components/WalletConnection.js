import React, { useEffect } from "react";
import { BrowserProvider, Contract } from "ethers";

const WalletConnection = ({ setAccount, setContract, setProvider }) => {
    const contractAddress = "0x8B139aA8Da7316fBE7e91f29Ae055552bad5Edc7";
    const contractABI = require("../contractABI.json");

    // This function is called once the component mounts to connect to MetaMask
    const initConnection = async () => {
        if (window.ethereum) {
            try {
                const browserProvider = new BrowserProvider(window.ethereum); // MetaMask provider
                const walletSigner = await browserProvider.getSigner(); // Get signer (account)
                const libraryContract = new Contract(contractAddress, contractABI, walletSigner); // Initialize contract

                const connectedAccount = await walletSigner.getAddress(); // Get connected account address

                // Update the state in the parent component
                setProvider(browserProvider);
                setContract(libraryContract);
                setAccount(connectedAccount);

                console.log("Connected to MetaMask with account:", connectedAccount);
            } catch (error) {
                console.error("Error connecting to MetaMask:", error);
            }
        } else {
            alert("MetaMask is not installed!"); // If MetaMask is not detected
        }
    };

    // Automatically connect when the component mounts
    useEffect(() => {
        initConnection();
    }, []); // Empty dependency array means this effect runs once when the component mounts

    return (
        <div>

        </div>
    );
};

export default WalletConnection;
