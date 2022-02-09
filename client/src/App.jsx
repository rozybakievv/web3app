import React from "react";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import { useState } from "react";
import Home from "./components/Home.jsx"
import Navbar from "./components/Navbar.jsx"
import Send from "./components/Send.jsx"
import Receive from "./components/Receive.jsx"

export const addressContext = React.createContext();

const App = () => {
    const [address, setAddress] = useState("");
 	const methodContextAddress = { address, setAddress };

    return (
        <div className="min-h-screen">
            <addressContext.Provider value={methodContextAddress}>
				<BrowserRouter>
                    <Navbar></Navbar>
                    <Routes>
                            <Route path="/" element={<Home/>}/>
							<Route path="/send" element={<Send/>}/>
                            <Route path="/receive" element={<Receive/>}/>
                    </Routes>
                </BrowserRouter>
            </addressContext.Provider>
        </div>
    )
}

export default App;