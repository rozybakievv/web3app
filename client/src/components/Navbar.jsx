import { addressContext } from "../App";
import { useContext, useState } from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
    const [error, setError] = useState(null);
    const [connected, setConnected] = useState(null);
    const walletAddress = useContext(addressContext);

    // connection handler on connect button click
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

    // handles if there is a new account connected
    const accountChangeHandler = (newAccount) => {
        walletAddress.setAddress(newAccount);
    }

    return (
        <nav className="flex flex-wrap items-center justify-between p-6">
            <div className="flex items-center flex-shrink-0 mr-6">
                <Link to="/">
                    <h1 className="text-3xl font-bold">CrypteX</h1>
                </Link>
            </div>
            <div className="block md:hidden">
                <button className="flex items-center px-3 py-2 text-black border border-black rounded hover:text-gray-500 hover:border-gray-500">
                    <svg className="w-3 h-3 fill-current" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><title>Menu</title><path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z"/></svg>
                </button>
            </div>
            <div className="items-center flex-grow hidden w-full md:flex md:items-center md:w-auto">
                <div className="text-sm md:flex-grow">

                </div>
                <div>
                    {   
                        connected !== null &&
                        <>
                            <Link to="/send">
                                <button type="button" className="block mt-4 mr-8 transition-colors duration-200 md:inline-block md:mt-0 hover:text-gray-300 animate-fade-in-down">
                                    Send
                                </button>
                            </Link>
                            <Link to="/transfers">
                                <button type="button" id="receiveBtn" className="block mt-4 mr-8 transition-colors duration-200 md:inline-block md:mt-0 hover:text-gray-300 animate-fade-in-down">
                                    Transfers
                                </button>
                            </Link>
                        </>
                    }
                    {
                        error != null &&
                        <p>{error}</p>
                    }
                    {
                        connected !== null 
                        ? <h1 className="inline-block px-4 py-2 mt-4 text-sm leading-none border-2 border-b-4 border-neutral-700 rounded-xl md:mt-0">{walletAddress.address}</h1>
                        : <button onClick={connexionHandler} className="inline-block px-4 py-1 text-sm transition duration-200 ease-in-out border-2 border-b-4 shadow-effect rounded-xl border-neutral-700 hover:translate-y-1">Connect</button>
                    }
                </div>
            </div>
        </nav>
    )
}

export default Navbar;