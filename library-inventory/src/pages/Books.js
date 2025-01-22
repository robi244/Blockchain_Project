import React, { useState, useEffect } from "react";
import NavBar from "../components/NavBar";
import './Books.css';

const Books = ({ contract }) => {
    const [resources, setResources] = useState([]);
    const [title, setTitle] = useState("");
    const [resourceType, setResourceType] = useState("");
    const [author, setAuthor] = useState("");
    const [loading, setLoading] = useState(false); // Loading state

    // Load resources from the contract
    const loadResources = async () => {
        if (!contract) {
            console.log("Contract not initialized.");
            return;
        }
        try {
            setLoading(true); // Start loading
            const resourceCount = await contract.resourceCount();
            const loadedResources = [];
            for (let i = 1; i <= resourceCount; i++) {
                const resource = await contract.resources(i);
                if (
                    resource.title.trim() !== "" &&
                    resource.author.trim() !== "" &&
                    resource.resourceType.trim() !== ""
                ) {
                    loadedResources.push(resource);
                }
            }
            setResources(loadedResources);
        } catch (error) {
            console.error("Error loading resources:", error);
        } finally {
            setLoading(false); // End loading
        }
    };

    // Add resource
    const addResource = async (e) => {
        e.preventDefault();
        if (!contract) {
            alert("Contract not initialized.");
            return;
        }
        try {
            setLoading(true); // Start loading
            const tx = await contract.addResource(title, resourceType, author);
            await tx.wait();
            await loadResources(); // Refresh resources after adding
            alert("Resource added successfully!");
            setTitle(""); // Clear the input fields
            setResourceType("");
            setAuthor("");
        } catch (error) {
            console.error("Error adding resource:", error);
        } finally {
            setLoading(false); // End loading
        }
    };

    // Remove resource
    const removeResource = async (id) => {
        if (!contract) {
            alert("Contract not initialized.");
            return;
        }
        try {
            setLoading(true); // Start loading
            const tx = await contract.burnResource(id);
            await tx.wait();
            console.log(`Resource with ID ${id} burned.`);
            await loadResources(); // Refresh resources after removal
        } catch (error) {
            console.error(`Error burning resource with ID ${id}:`, error);
            alert("Error burning resource: " + error.message);
        } finally {
            setLoading(false); // End loading
        }
    };

    useEffect(() => {
        if (contract) {
            loadResources();
        }
    }, [contract]);

    return (
        <div className="books-page">
            <NavBar />
            <div className="books-container">
                <h1>The Reading Corner</h1>
                <h3
                    style={{
                        fontSize: "1.5rem",
                        color: "#6c757d",
                        fontWeight: 300,
                        textShadow: "1px 1px 5px rgba(0, 0, 0, 0.1)",
                        fontStyle: "italic",
                    }}
                >
                    Our collection
                </h3>
                {loading ? (
                    <p>Loading...</p>
                ) : resources.length === 0 ? (
                    <p>No resources found.</p>
                ) : (
                    <ul>
                        {resources.map((resource) => (
                            <li key={resource.id.toString()} className="resource-item">
                                <strong>{resource.title}</strong> - {resource.resourceType} by {resource.author}{" "}
                                ({resource.available ? "Available" : "Borrowed"})
                                <button onClick={() => removeResource(resource.id)} className="remove-btn">
                                    Remove
                                </button>
                            </li>
                        ))}
                    </ul>
                )}
                <h2>New book into the library</h2>
                <form onSubmit={addResource} className="add-resource-form">
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
                    <button type="submit" className="add-btn" disabled={loading}>
                        Add Book
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Books;
