import React, { useState, useEffect } from "react";
import { BrowserProvider, Contract } from "ethers";
import contractABI from "./contractABI.json"; // ABI-ul contractului tău

// Adresa contractului tău (înlocuiește cu adresa obținută după deploy)
const contractAddress = "0x8B139aA8Da7316fBE7e91f29Ae055552bad5Edc7";

function App() {
    const [provider, setProvider] = useState(null);
    const [signer, setSigner] = useState(null);
    const [contract, setContract] = useState(null);
    const [account, setAccount] = useState(null);
    const [resources, setResources] = useState([]);

    // Inițializare conexiune MetaMask
    const init = async () => {
        if (window.ethereum) {
            try {
                const browserProvider = new BrowserProvider(window.ethereum); // Creează conexiunea cu MetaMask
                const walletSigner = await browserProvider.getSigner(); // Obține semnatarul (contul conectat)

                setProvider(browserProvider);
                setSigner(walletSigner);

                // Inițializează contractul
                const libraryContract = new Contract(
                    contractAddress,
                    contractABI,
                    walletSigner
                );
                setContract(libraryContract);

                // Obține contul conectat
                const connectedAccount = await walletSigner.getAddress();
                setAccount(connectedAccount);

                console.log("Connected to MetaMask with account:", connectedAccount);
            } catch (error) {
                console.error("Error connecting to MetaMask:", error);
            }
        } else {
            console.error("MetaMask is not installed!");
        }
    };

    // Funcție pentru adăugarea unei resurse
    const addResource = async (title, resourceType, author) => {
        try {
            const tx = await contract.addResource(title, resourceType, author);
            await tx.wait(); // Așteaptă confirmarea tranzacției
            alert("Resource added successfully!");
        } catch (error) {
            console.error("Error adding resource:", error);
        }
    };

    // Funcție pentru încărcarea resurselor din contract
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

    useEffect(() => {
        init();
    }, []);

    return (
        <div>
            <h1>Library Inventory on Blockchain</h1>
            <p>Connected account: {account}</p>

            <button onClick={loadResources}>Load Resources</button>
            <ul>
                {resources.map((resource, index) => (
                    <li key={index}>
                        <strong>{resource.title}</strong> - {resource.resourceType} by {resource.author}{" "}
                        ({resource.available ? "Available" : "Borrowed"})
                    </li>
                ))}
            </ul>

            <h2>Add a Resource</h2>
            <form
                onSubmit={(e) => {
                    e.preventDefault();
                    const title = e.target.title.value;
                    const resourceType = e.target.resourceType.value;
                    const author = e.target.author.value;
                    addResource(title, resourceType, author);
                }}
            >
                <input name="title" placeholder="Title" required />
                <input name="resourceType" placeholder="Resource Type" required />
                <input name="author" placeholder="Author" required />
                <button type="submit">Add Resource</button>
            </form>
        </div>
    );
}

export default App;
