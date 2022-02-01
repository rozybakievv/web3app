import { useState } from "react";
import { ethers } from "ethers";

const Navbar = () => {
    const [error, setError] = useState(null);
    const [connected, setConnected] = useState(null);
    const [walletAddress, setWalletAdress] = useState(null);
    const [balance, setBalance] = useState(null);

    const connectionHandler = () => {
        if(window.ethereum) {
            window.ethereum.request({method : 'eth_requestAccounts'})
            .then(
                result => {
                    accountChangeHandler(result);
                    setConnected("Connected");
                }
            )
        }else {
            setError('Please install metamask');
        }
    }

    const accountChangeHandler = (newAccount) => {
        setWalletAdress(newAccount);
        /* getBalance(newAccount); */
    }

/*     const getBalance = (address) => {
        window.ethereum.request({method: 'eth_getBalance', params: [address, walletAddress]})
        .then(
            balanceGet => {
                setBalance(ethers.utils.formatEther(balanceGet));
            }
        )
    }
 */
    return (
        <nav className="flex flex-wrap items-center justify-between p-6">
            <div className="flex items-center flex-shrink-0 mr-6 text-white">
                <h1 className="text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-black to-slate-700">Walleto .</h1>
            </div>
            <div className="block lg:hidden">
                <button className="flex items-center px-3 py-2 text-teal-200 border border-teal-400 rounded hover:text-white hover:border-white">
                    <svg className="w-3 h-3 fill-current" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><title>Menu</title><path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z"/></svg>
                </button>
            </div>
            <div className="flex-grow hidden w-full lg:flex lg:items-center lg:w-auto">
                <div className="text-sm lg:flex-grow">

                </div>
                <div>
                    {   
                        connected !== null &&
                        <>
                            <button className="block mt-4 mr-8 text-white lg:inline-block lg:mt-0 hover:text-gray-300 animate-fade-in-down">
                                Send
                            </button>
                            <button className="block mt-4 mr-8 text-white lg:inline-block lg:mt-0 hover:text-gray-300 animate-fade-in-down">
                                Receive
                            </button>
                        </>
                    }
                    {
                        error != null &&
                        <p className="text-white">{error}</p>
                    }
                    {
                        connected !== null 
                        ? <h1 className="inline-block px-4 py-2 mt-4 text-sm leading-none text-white border-2 border-white rounded-xl lg:mt-0">{walletAddress}</h1>
                        : <button onClick={connectionHandler} className="inline-block px-4 py-2 mt-4 text-sm leading-none text-white transition duration-300 border-2 border-white rounded-xl hover:border-transparent hover:text-black hover:bg-white lg:mt-0 hover:ring hover:outline-none hover:ring-gray-600">Connect</button>
                    }
                </div>
            </div>
        </nav>
    )
}

export default Navbar;