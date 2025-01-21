import React from "react";
import { Link } from "react-router-dom";  // Import Link for routing

const NavBar = () => {
    return (
        <div style={{ padding: "10px", backgroundColor: "#333", color: "white" }}>
            <Link to="/" style={{ marginRight: "10px", color: "white", textDecoration: "none" }}>
                Home
            </Link>
            <Link to="/books" style={{ color: "white", textDecoration: "none" }}>
                Books
            </Link>
        </div>
    );
};

export default NavBar;
