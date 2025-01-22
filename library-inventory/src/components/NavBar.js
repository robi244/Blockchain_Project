import React from "react";
import { Link } from "react-router-dom"; // Import Link for routing

const NavBar = () => {
    return (
        <div
            style={{
                padding: "10px 20px",
                backgroundColor: "#222", // Slightly lighter than black for elegance
                color: "white",
                position: "fixed",
                top: 0,
                left: 0,
                width: "100%",
                zIndex: 1000,
                boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)", // Enhanced shadow for depth
                display: "flex", // Use flexbox for layout
                justifyContent: "space-around", // Equal spacing between links
                alignItems: "center", // Vertically align links
            }}
        >
            <Link
                to="/"
                style={{
                    color: "white",
                    textDecoration: "none",
                    fontWeight: "bold",
                    fontSize: "20px",
                    padding: "10px 15px", // Padding for clickable area
                    borderRadius: "5px", // Rounded corners for hover effect
                    transition: "background-color 0.3s", // Smooth hover transition
                }}
                onMouseEnter={(e) => (e.target.style.backgroundColor = "#444")}
                onMouseLeave={(e) => (e.target.style.backgroundColor = "transparent")}
            >
                Home
            </Link>
            <Link
                to="/books"
                style={{
                    color: "white",
                    textDecoration: "none",
                    fontWeight: "bold",
                    fontSize: "20px",
                    padding: "10px 15px",
                    borderRadius: "5px",
                    transition: "background-color 0.3s",
                }}
                onMouseEnter={(e) => (e.target.style.backgroundColor = "#444")}
                onMouseLeave={(e) => (e.target.style.backgroundColor = "transparent")}
            >
                Books
            </Link>
            <Link
                to="/frontdesk"
                style={{
                    color: "white",
                    textDecoration: "none",
                    fontWeight: "bold",
                    fontSize: "20px",
                    padding: "10px 15px",
                    borderRadius: "5px",
                    transition: "background-color 0.3s",
                }}
                onMouseEnter={(e) => (e.target.style.backgroundColor = "#444")}
                onMouseLeave={(e) => (e.target.style.backgroundColor = "transparent")}
            >
                Front Desk
            </Link>
        </div>
    );
};

export default NavBar;
