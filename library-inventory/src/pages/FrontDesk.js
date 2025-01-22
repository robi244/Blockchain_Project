import React, { useState, useEffect, useCallback } from "react";
import NavBar from "../components/NavBar";
import "./FrontDesk.css";

const FrontDesk = ({ contract }) => {
    const [availableBooks, setAvailableBooks] = useState([]);
    const [borrowedBooks, setBorrowedBooks] = useState([]);

    const loadResources = useCallback(async () => {
        if (!contract) {
            console.log("Contract not initialized.");
            return;
        }
        try {
            const resourceCount = await contract.resourceCount();
            console.log("Total resources in contract (FrontDesk):", resourceCount.toString());

            const available = [];
            const borrowed = [];
            for (let i = 1; i <= resourceCount; i++) {
                const resource = await contract.resources(i);
                console.log(
                    `Resource ID: ${resource.id.toString()}, Title: ${resource.title}, Borrowed: ${resource.borrowed}, Available: ${resource.available}`
                );
                if (!resource.removed) {
                    if (resource.borrowed) {
                        borrowed.push(resource);
                    } else {
                        available.push(resource);
                    }
                }
            }
            setAvailableBooks(available);
            setBorrowedBooks(borrowed);
        } catch (error) {
            console.error("Error loading resources:", error);
        }
    }, [contract]);

    const borrowResource = async (id) => {
        if (!contract) {
            alert("Contract not initialized.");
            return;
        }
        try {
            const tx = await contract.borrowResource(id);
            await tx.wait();
            alert("Resource borrowed successfully!");
            loadResources();
        } catch (error) {
            console.error("Error borrowing resource:", error);
        }
    };

    const returnResource = async (id) => {
        if (!contract) {
            alert("Contract not initialized.");
            return;
        }
        try {
            const tx = await contract.returnResource(id);
            await tx.wait();
            alert("Resource returned successfully!");
            loadResources();
        } catch (error) {
            console.error("Error returning resource:", error);
        }
    };

    useEffect(() => {
        loadResources();
    }, [loadResources]);

     return (
        <div className="frontdesk-page">
            <NavBar />

            <div className="tables-container">
                {/* Secțiune Available Books */}
                <div className="table-section">
                    <h2>Available Books</h2>
                    {availableBooks.length === 0 ? (
                        <p>No available books.</p>
                    ) : (
                        <table>
                            <thead>
                                <tr>
                                    <th>Title</th>
                                    <th>Author</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {availableBooks.map((book) => (
                                    <tr key={book.id.toString()}>
                                        <td>{book.title}</td>
                                        <td>{book.author}</td>
                                        <td>
                                            <button onClick={() => borrowResource(book.id)}>
                                                Borrow
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    )}
                </div>

                {/* Secțiune Borrowed Books */}
                <div className="table-section">
                    <h2>Borrowed Books</h2>
                    {borrowedBooks.length === 0 ? (
                        <p>No borrowed books.</p>
                    ) : (
                        <table>
                            <thead>
                                <tr>
                                    <th>Title</th>
                                    <th>Author</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {borrowedBooks.map((book) => (
                                    <tr key={book.id.toString()}>
                                        <td>{book.title}</td>
                                        <td>{book.author}</td>
                                        <td>
                                            <button onClick={() => returnResource(book.id)}>
                                                Return
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    )}
                </div>
            </div>
        </div>
    );
};



export default FrontDesk;
