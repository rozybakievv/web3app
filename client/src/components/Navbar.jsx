import { useEffect, useState } from "react";
import { ethers } from "ethers";

const Navbar = () => {
    /* variables */
    const [error, setError] = useState(null);
    const [connected, setConnected] = useState(null);
    const [walletAddress, setWalletAdress] = useState(null);
    const [balance, setBalance] = useState(null);

    /* function to open the send modal */
    const openSendModal = () => {
        const sendModal = document.querySelector('#send-modal');
        sendModal.classList.remove('hidden');
        sendModal.classList.add("flex");
    }

    /* function to close the send modal */
    const closeSendModal = () => {
        const sendModal = document.querySelector('#send-modal');
        sendModal.classList.remove('flex');
        sendModal.classList.add('hidden');
    }

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
            <div className="flex items-center flex-shrink-0 mr-6">
                <h1 className="text-3xl font-bold text-transparent text-shadow bg-clip-text bg-gradient-to-br from-black to-gray-500">CrypteX</h1>
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
                            <button type="button" onClick={openSendModal} className="block mt-4 mr-8 text-black transition-colors duration-200 md:inline-block md:mt-0 hover:text-gray-300 animate-fade-in-down">
                                Send
                            </button>
                            <button type="button" id="receiveBtn" className="block mt-4 mr-8 text-black transition-colors duration-200 md:inline-block md:mt-0 hover:text-gray-300 animate-fade-in-down">
                                Receive
                            </button>
                        </>
                    }
                    {
                        error != null &&
                        <p className="text-black">{error}</p>
                    }
                    {
                        connected !== null 
                        ? <h1 className="inline-block px-4 py-2 mt-4 text-sm leading-none text-black border-2 border-black rounded-xl md:mt-0">{walletAddress}</h1>
                        : <button onClick={connexionHandler} className="inline-block px-4 py-2 mt-4 text-sm leading-none text-black transition duration-300 border-2 border-black rounded-xl hover:border-transparent hover:text-black lg:mt-0 hover:ring hover:outline-none hover:ring-gray-600">Connect</button>
                    }
                </div>
            </div>

            {/* send modal */}
            <div id="send-modal" className="absolute inset-0 items-center justify-center hidden transition duration-200 ease-in-out bg-black bg-opacity-60">
                <div className="max-w-sm p-6 bg-white shadow-lg rounded-xl">
                    <h1 className="pb-2 text-4xl text-center text-black">Send</h1>
                    <div className="w-full mb-4 border border-gray-200"></div>
                    <div>
                        <form className="w-full max-w-lg">
                            <div className="flex flex-wrap mb-6 -mx-3">
                                <div className="w-full px-3 mb-6 md:w-1/2 md:mb-0">
                                    <label className="block mb-2 text-xs font-bold tracking-wide text-gray-700 uppercase">
                                        Amount ($)
                                    </label>
                                    <input className="block w-full px-4 py-3 leading-tight text-gray-700 bg-white border border-gray-200 appearance-none rounded-xl focus:outline-none focus:bg-white focus:border-gray-500" id="input-amount-dollar" type="number" placeholder="0$"/>
                                </div>
                                <div className="w-full px-3 md:w-1/2">
                                    <label className="block mb-2 text-xs font-bold tracking-wide text-gray-700 uppercase">
                                        Amount (ETH)
                                    </label>
                                    <input className="block w-full px-4 py-3 leading-tight text-gray-700 bg-white border border-gray-200 appearance-none rounded-xl focus:outline-none focus:bg-white focus:border-gray-500" id="input-amount-eth" type="number" placeholder="0.00 ETH"/>
                                </div>
                            </div>
                            <div className="flex flex-wrap mb-6 -mx-3">
                                <div className="w-full px-3">
                                    <label className="block mb-2 text-xs font-bold tracking-wide text-gray-700 uppercase">
                                        Address
                                    </label>
                                    <input className="block w-full px-4 py-3 mb-3 leading-tight text-gray-700 bg-white border border-gray-200 appearance-none rounded-xl focus:outline-none focus:border-gray-500" id="input-address" type="text"/>
                                </div>
                            </div>
                            <div className="flex flex-wrap mb-2 -mx-3">
                                <div className="flex w-full px-3 mb-6 md:w-1/3 md:mb-0">
                                    <button type="button" className="px-3 py-2 mr-4 text-white transition duration-300 bg-black shadow-md rounded-xl hover:border-transparent hover:animate-pulse lg:mt-0 hover:ring hover:outline-none hover:ring-gray-600">Send</button>
                                    <button type="button" onClick={closeSendModal} className="px-3 py-2 text-white transition duration-300 bg-orange-400 shadow-md rounded-xl hover:border-transparent lg:mt-0 hover:ring hover:outline-none hover:ring-orange-300">Cancel</button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>

            {/* receive modal */}
            <div id="receiveModal">

            </div>
        </nav>
    )
}

export default Navbar;