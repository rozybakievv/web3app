import { addressContext } from "../App";
import { useContext, useEffect, useState } from "react";
import Coin from "./Coin.jsx";


const Home = () => {
    const walletAddress = useContext(addressContext);
    const [coins, setCoins] = useState([]);

    useEffect(() => {
        const fetchCoins = async () => {
            const response = await fetch('https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=16&page=1&sparkline=false')
            const data = await response.json();
            setCoins(data);
        }

        fetchCoins()
        .catch(console.error);
    }, [])
    

    return (
        <div className="pt-6 flex-column">
            {
                walletAddress.address === "" && coins !== []
                ?   
                    <div className="p-6">
                        <h1 className="text-8xl animate-fade-in-down title">Fast <br></br> Easy <br></br> Secure </h1>
                        <p className="pt-4 italic animate-fade-in-down">⚡ Connect your wallet to start using CrypteX ⚡</p>
                    </div>
                : 
                    <div>
                        <h1 className="pb-12 text-6xl text-center animate-fade-in-down drop-shadow-lg">Welcome</h1>
                            <div className="flex justify-center px-6 pb-4">
                                <div className="grid grid-cols-1 gap-4 lg:grid-cols-4">
                                    {
                                        coins.map((coin) => {
                                            return <Coin name={coin.name} symbol={coin.symbol} image={coin.image} price={coin.current_price} 
                                            market_cap={coin.market_cap} price24={coin.price_change_percentage_24h} circulating_supply={coin.circulating_supply}>
                                            </Coin>
                                        })
                                    }
                                </div>
                            </div> 
                    </div>
            }
        </div>
    )
}

export default Home;