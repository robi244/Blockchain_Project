import React, { useState, useEffect } from "react";
import { BrowserProvider } from "ethers";
import { useNavigate } from "react-router-dom";  // Import useNavigate
import NavBar from "../components/NavBar";  // Import NavBar component

const Home = ({ account, provider }) => {
    const [balance, setBalance] = useState(null);
    const navigate = useNavigate();  // Initialize navigate

    useEffect(() => {
        if (provider && account) {
            const getBalance = async () => {
                const balance = await provider.getBalance(account);
                setBalance(balance.toString());
            };
            getBalance();
        }
    }, [account, provider]);

    return (
        <div>
            <NavBar /> {/* Add the navigation bar at the top */}

            <h1>Home</h1>
            <h3>Wallet Details</h3>
            {account ? (
                <div>
                    <p><strong>Address:</strong> {account}</p>
                    <p><strong>Balance:</strong> {balance ? `${parseFloat(balance) / 1e18} ETH` : "Loading..."}</p>
                    {/* Add more details like recent transactions here */}
                </div>
            ) : (
                <p>No account connected.</p>
            )}
        </div>
    );
};

export default Home;
