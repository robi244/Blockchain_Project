import React, { useState, useEffect } from "react";
import { BrowserProvider } from "ethers";
import { useNavigate } from "react-router-dom";
import NavBar from "../components/NavBar";
import "./Home.css"; // Import the CSS file

const Home = ({ account, provider, setAccount, setProvider }) => {
    const [balance, setBalance] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        if (provider && account) {
            const getBalance = async () => {
                const balance = await provider.getBalance(account);
                setBalance(balance.toString());
            };
            getBalance();
        }
    }, [account, provider]);

    const handleLogin = async () => {
        try {
            // Check if MetaMask is installed
            if (typeof window.ethereum === "undefined") {
                alert("MetaMask is not installed. Please install MetaMask to proceed.");
                return;
            }

            // Request account access from MetaMask
            const accounts = await window.ethereum.request({
                method: "eth_requestAccounts",
            });

            if (accounts && accounts.length > 0) {
                const account = accounts[0];

                // Set up the provider using ethers.js
                const provider = new BrowserProvider(window.ethereum);

                // Set the account and provider in the state
                setAccount(account);
                setProvider(provider);

                // Fetch balance from the provider
                const balance = await provider.getBalance(account);
                setBalance(balance.toString());

                alert("Successfully logged in!");
            } else {
                alert("No accounts found. Please try again.");
            }
        } catch (error) {
            console.error("Error during login:", error);

            // Handle different error scenarios
            if (error.code === 4001) {
                alert("Login request was rejected by the user.");
            } else if (error.code === -32002) {
                alert("MetaMask is already requesting account access. Please approve the request in MetaMask.");
            } else {
                alert("Login failed. Please try again.");
            }

            // Reset state to avoid incorrect UI
            setAccount(null);
            setProvider(null);
        }
    };

    const handleLogout = async () => {
        try {
            // Clear app state to reset any user session details
            setAccount(null);
            setProvider(null);

            // Provide feedback to the user
            alert("You have been logged out successfully. Please lock MetaMask manually if needed.");
        } catch (error) {
            console.error("Error during logout:", error);
            alert("Logout failed. If you need to fully disconnect, please lock your MetaMask manually.");
        }
    };

    return (
        <div className="home-page"> {/* Wrapper pentru Home */}
            <NavBar account={account} />
            <div className="home-container">
                <div className="left-side">
                    <h1>Home</h1>
                    <h3>Wallet Details</h3>
                    {account ? (
                        <div className="wallet-info">
                            <p>
                                <strong>Address:</strong> {account}
                            </p>
                            <p>
                                <strong>Balance:</strong> {balance ? `${parseFloat(balance) / 1e18} ETH` : "Loading..."}
                            </p>
                            <button onClick={handleLogout}>Logout</button>
                        </div>
                    ) : (
                        <div>
                            <p>No account connected.</p>
                            <button onClick={handleLogin}>Login with MetaMask</button> {/* Login button */}
                        </div>
                    )}
                </div>
                <div className="right-side">
                    <img src="images/image.jpeg" alt="Wallet illustration" />
                </div>
            </div>
        </div>
    );
};

export default Home;