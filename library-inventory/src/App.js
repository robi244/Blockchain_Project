import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import WalletConnection from "./components/WalletConnection";
import Home from "./pages/Home";
import Books from "./pages/Books";
import FrontDesk from "./pages/FrontDesk"; // Import FrontDesk component

function App() {
    const [account, setAccount] = useState(null);
    const [provider, setProvider] = useState(null);
    const [contract, setContract] = useState(null);

    return (
        <Router>
            <div>
                {/* Wallet Connection (this is now a shared component on each page) */}
                <WalletConnection
                    setAccount={setAccount}
                    setContract={setContract}
                    setProvider={setProvider}
                />

                {/* Routing */}
                <Routes>
                    {/* Home Page */}
                    <Route
                        path="/"
                        element={<Home account={account} provider={provider} setAccount={setAccount} setProvider={setProvider} />}
                    />

                    {/* Books Page */}
                    <Route
                        path="/books"
                        element={<Books contract={contract} />}
                    />

                    {/* Front Desk Page */}
                    <Route
                        path="/frontdesk"
                        element={<FrontDesk contract={contract} />}
                    />
                </Routes>
            </div>
        </Router>
    );
}

export default App;
