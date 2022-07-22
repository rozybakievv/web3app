import React from "react";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import { useState } from "react";
import Home from "./components/Home.jsx"
import Navbar from "./components/Navbar.jsx"
import Send from "./components/Send.jsx"
import Transfers from "./components/Transfers.jsx"
import { ethers } from 'ethers';
import { contractAbi, contractAddress } from './constants/consts.js';

// context variable used to store the users wallet address
export const addressContext = React.createContext();
// context variable used to store the transactions from the contract
export const TransactionContext = React.createContext();

const App = () => {
    const [address, setAddress] = useState('');
 	const methodContextAddress = { address, setAddress };

    const [formAddress, setFormAddress] = useState('');
    const formAddressContext = { formAddress, setFormAddress };

    const [formAmount, setFormAmount] = useState('');
    const formAmountContext = { formAmount, setFormAmount };

    const [success, setSuccess] = useState('');
    const successContext = { success, setSuccess };

    const [transactCount, setTransactCount] = useState('');
    const transactCountContext = { transactCount, setTransactCount };

    const [transactionList, setTransactionList] = useState([]);

    const { ethereum } = window;

    // function that retrieves the contract deployed on the Ropsten Test Network
    const getSendContract = () => {
        const provider = new ethers.providers.Web3Provider(ethereum);
        const signer = provider.getSigner();
        const contract = new ethers.Contract(contractAddress, contractAbi, signer);

        return contract;
    }

    // function that executes the transaction made by the user
    const sendTransaction = async() => {
        try {
            // if a metamask wallet is not detected -> alert
            if(!ethereum) return alert('Please install Metamask');
            
            const contract = getSendContract();
            // converting the amount from the form into gwei using the utils from the ethers package
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

            // sending the transaction then displaying the result of the transaction
            const transactionToBlockchain = await contract.sendEth(String(formAddress ), amountToGwei);
            console.log(`Sending ... - ${transactionToBlockchain.hash}`);
            await transactionToBlockchain.wait();
            console.log(`Sent ! - ${transactionToBlockchain.hash}`);
            setSuccess('Success');
            setTimeout(() => {  setSuccess('') }, 10000);
        } catch (error) {   
            console.log(error);
        }
    }

    // function that gets the transaction from the contract and storing it in the context variable
    const checkTransactions = async () => {
        try {
            const contract = getSendContract();
            const count = await contract.getTransactionCount();
            setTransactCount(parseInt(count));

            window.localStorage.setItem("transactionCount", transactCount);
        } catch (error) {
            console.log(error);
        }
    }

    // function that gets all the transactions made with the contract and storing it in the context variable
    const getAllTransactions = async () => {
        try {
            if(!ethereum) return alert('Please install Metamask');

            const contract = getSendContract();
            const allTransacts = await contract.getAllTransactions();
            const allTransactionsArray = allTransacts.map((transaction) => ({
                addressTo: transaction.receiver,
                addressFrom: transaction.sender,
                timestamp: new Date(Number(transaction.timestamp) * 1000).toLocaleString(),
                amount: parseInt(transaction.amount._hex) / (10 ** 18)
            }))

            setTransactionList(allTransactionsArray);
        } catch (error) {
            console.log(error);
        }
    }
    
    return (
        <div className="min-h-screen">
            <TransactionContext.Provider value={{ formAddressContext, formAmountContext, sendTransaction, successContext, transactCountContext, getAllTransactions, checkTransactions, transactionList }}>
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