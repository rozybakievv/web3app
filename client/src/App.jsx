import React from "react";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import { useState } from "react";
import Home from "./components/Home.jsx"
import Navbar from "./components/Navbar.jsx"
import Send from "./components/Send.jsx"
import Transfers from "./components/Transfers.jsx"
import { ethers } from 'ethers';
import { contractAbi, contractAddress } from './constants/consts.js';

export const addressContext = React.createContext();
export const TransactionContext = React.createContext();

const App = () => {
    const [address, setAddress] = useState('');
 	const methodContextAddress = { address, setAddress };

    const [formAddress, setFormAddress] = useState('');
    const formAddressContext = { formAddress, setFormAddress };

    const [formAmount, setFormAmount] = useState('');
    const formAmountContext = { formAmount, setFormAmount };

    const { ethereum } = window;

    const getSendContract = () => {
        const provider = new ethers.providers.Web3Provider(ethereum);
        const signer = provider.getSigner();
        const contract = new ethers.Contract(contractAddress, contractAbi, signer);

        return contract;
    }

    const sendTransaction = async() => {
        try {
            if(!ethereum) return alert('Please install Metamask');
            
            const contract = getSendContract();
            const amountToGwei = ethers.utils.parseEther(formAmount);

            await ethereum.request({
                method: 'eth_sendTransaction',
                params: [{
                    from: String(address),
                    to: String(formAddress),
                    gas: '0x5208',
                    value: amountToGwei._hex,
                }]
            });

            const transactionToBlockchain = await contract.sendEth(String(formAddress ), amountToGwei);
            console.log(`Sending ... - ${transactionToBlockchain.hash}`);
            await transactionToBlockchain.wait();
            console.log(`Sent ! - ${transactionToBlockchain.hash}`);
        } catch (error) {   
            console.log(error);
        }
    }

    return (
        <div className="min-h-screen">
            <TransactionContext.Provider value={{ formAddressContext, formAmountContext, sendTransaction }}>
                <addressContext.Provider value={ methodContextAddress }>
                    <BrowserRouter>
                        <Navbar></Navbar>
                        <Routes>
                                <Route path="/" element={<Home/>}/>
                                <Route path="/send" element={<Send/>}/>
                                <Route path="/transfers" element={<Transfers/>}/>
                        </Routes>
                    </BrowserRouter>
                </addressContext.Provider>
            </TransactionContext.Provider>
        </div>
    )
}

export default App;