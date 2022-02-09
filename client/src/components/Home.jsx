import { addressContext } from "../App";
import { useContext } from "react";
import CoinList from "./CoinList.jsx";

const Home = () => {
    const walletAddress = useContext(addressContext);

    return (
        <div className="p-6 flex-column pt-14">
            {
                walletAddress.address === ""
                ?   
                    <div>
                        <h1 className="text-6xl font-bold text-center text-transparent animate-fade-in-down bg-clip-text bg-gradient-to-br from-white to-neutral-600 drop-shadow-lg">Fast and easy <br></br> worldwide crypto transfers</h1>
                        <p className="pt-4 italic text-center text-white animate-fade-in-down">⚡ Connect your wallet to start using CrypteX ⚡</p>
                    </div>
                : 
                    <div>
                        <h1 className="text-6xl font-bold text-center text-transparent animate-fade-in-down bg-clip-text bg-gradient-to-br from-white to-neutral-600 drop-shadow-lg">Welcome</h1>
                    </div>
            }
            <CoinList></CoinList>
        </div>
    )
}

export default Home;