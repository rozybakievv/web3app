import { addressContext } from "../App";
import { useContext, useEffect, useState } from "react";
import Coin from "./Coin.jsx";


const Home = () => {
    const walletAddress = useContext(addressContext);
    const [coins, setCoins] = useState([]);
    const [allcoins, setAllCoins] = useState([]);
    const [pagecoins, setPageCoins] = useState([]);

    useEffect(() => {
        const fetchCoins = async () => {
            const response = await fetch('https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=16&page=1&sparkline=false');
            const responseAll = await fetch('https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false');
            const dataAll = await responseAll.json();
            const data = await response.json();
            setCoins(data);
            setAllCoins(dataAll);
            setPageCoins(data);
        }

        fetchCoins()
        .catch(console.error);
    }, [])
    
    const newSearch = () => {
        const search = document.getElementById("searchInput").value;
        const newCoins = [];

        if(search === "") {
            setCoins(pagecoins);
        } else {
            allcoins.forEach(element => {
                let elementName = element.name.toUpperCase();
                if(elementName.includes(search.toUpperCase())){
                    newCoins.push(element);
                }
            });
            setCoins(newCoins);
        }
    }

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
                        <div className="flex justify-center px-6">
                            <input id="searchInput" className="mb-12 block md:w-1/4 sm:w-full p-2 border-2 border-b-4 outline-none graycolor rounded-xl border-neutral-700" placeholder="Search" onChange={newSearch}></input>
                        </div>
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