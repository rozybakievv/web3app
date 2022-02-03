import { useState } from "react";
import { ethers } from "ethers";

const Navbar = () => {
    /* variables */
    const [error, setError] = useState(null);
    const [connected, setConnected] = useState(null);
    const [walletAddress, setWalletAdress] = useState(null);
    const [balance, setBalance] = useState(null);

    /* handler for the connect button that pop ups metamask and asks the user to connect an account */
    const connexionHandler = () => {
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

    /* handler that handles when an account is changed and sets the wallet address and call the getBalane function */
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
                <h1 className="text-3xl font-bold text-shadow">Wallet</h1>
            </div>
            <div className="block md:hidden">
                <button className="flex items-center px-3 py-2 text-white border border-white rounded hover:text-gray-800 hover:border-gray-800">
                    <svg className="w-3 h-3 fill-current" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><title>Menu</title><path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z"/></svg>
                </button>
            </div>
            <div className="flex-grow hidden w-full md:flex md:items-center md:w-auto">
                <div className="text-sm md:flex-grow">

                </div>
                <div>
                    {   
                        connected !== null &&
                        <>
                            <button className="block mt-4 mr-8 text-white md:inline-block md:mt-0 hover:text-gray-300 animate-fade-in-down">
                                Send
                            </button>
                            <button className="block mt-4 mr-8 text-white md:inline-block md:mt-0 hover:text-gray-300 animate-fade-in-down">
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
                        ? <h1 className="inline-block px-4 py-2 mt-4 text-sm leading-none text-white border-2 border-white rounded-xl md:mt-0">{walletAddress}</h1>
                        : <button onClick={connexionHandler} className="inline-block px-4 py-2 mt-4 text-sm leading-none text-white transition duration-300 border-2 border-white rounded-xl hover:border-transparent hover:text-black hover:bg-white lg:mt-0 hover:ring hover:outline-none hover:ring-gray-600">Connect</button>
                    }
                </div>
            </div>
        </nav>
    )
}

export default Navbar;