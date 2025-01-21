import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom"; // Import Link for routing
import NavBar from "../components/NavBar";  // Import NavBar component

const Books = ({ contract }) => {
    const [resources, setResources] = useState([]);
    const [title, setTitle] = useState("");
    const [resourceType, setResourceType] = useState("");
    const [author, setAuthor] = useState("");

    // Load resources from the contract
    const loadResources = async () => {
        try {
            const resourceCount = await contract.resourceCount();
            const loadedResources = [];
            for (let i = 1; i <= resourceCount; i++) {
                const resource = await contract.resources(i);
                loadedResources.push(resource);
            }
            setResources(loadedResources);
        } catch (error) {
            console.error("Error loading resources:", error);
        }
    };

    // Function to add a new resource
    const addResource = async (e) => {
        e.preventDefault();
        try {
            const tx = await contract.addResource(title, resourceType, author);
            await tx.wait();
            alert("Resource added successfully!");
            setTitle("");
            setResourceType("");
            setAuthor("");
            loadResources(); // Reload resources after adding a new one
        } catch (error) {
            console.error("Error adding resource:", error);
        }
    };

    // Load resources when the contract is available
    useEffect(() => {
        if (contract) {
            loadResources();
        }
    }, [contract]);

    return (
        <div>
            <NavBar /> {/* Add the navigation bar at the top */}

            <h1>Library Books</h1>

            {/* Resource List */}
            <h3>Resources Available</h3>
            <button onClick={loadResources}>Load Resources</button>
            <ul>
                {resources.map((resource, index) => (
                    <li key={index}>
                        <strong>{resource.title}</strong> - {resource.resourceType} by {resource.author}{" "}
                        ({resource.available ? "Available" : "Borrowed"})
                    </li>
                ))}
            </ul>

            {/* Add Resource Form */}
            <h2>Add a Resource</h2>
            <form onSubmit={addResource}>
                <input
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="Title"
                    required
                />
                <input
                    value={resourceType}
                    onChange={(e) => setResourceType(e.target.value)}
                    placeholder="Resource Type"
                    required
                />
                <input
                    value={author}
                    onChange={(e) => setAuthor(e.target.value)}
                    placeholder="Author"
                    required
                />
                <button type="submit">Add Resource</button>
            </form>
        </div>
    );
};

export default Books;
