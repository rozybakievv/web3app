import { addressContext } from "../App";
import { useContext, useEffect, useState } from "react";
import Coin from "./Coin.jsx";
import Footer from "./Footer";
import HomeInformation from "./HomeInformation";

const Home = () => {
    const walletAddress = useContext(addressContext);
    const [coins, setCoins] = useState([]);
    const [allcoins, setAllCoins] = useState([]);
    const [pagecoins, setPageCoins] = useState([]);

    // fetching all the coins from the api
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
    
    // function that dynamically displays new coins based on search input
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
        <div className="pt-6 flex-column h-auto">
            {
                walletAddress.address === "" && coins !== []
                ?   
                    <div>
                        <div className="p-6 flex justify-center">
                            <div className="flex flex-col text-center">
                                <h1 className="md:text-6xl text-4xl animate-fade-in-down title">Explore the world of Cryptocurency</h1>
                                <p className="pt-4 italic animate-fade-in-down text-xs md:text-base">⚡ Connect your wallet to start using CrypteX ⚡</p>
                            </div>
                        </div>
                        
                        <div className="flex justify-center mt-20 px-6 h-[400px]">
                            <HomeInformation />
                        </div>

                        <Footer></Footer>
                    </div>
                : 
                    <div>
                        <div className="flex justify-center px-6">
                            <input id="searchInput" className="mb-12 block md:w-1/4 sm:w-full p-2 border-2 border-b-4 outline-none rounded-xl border-neutral-700" placeholder="Search" onChange={newSearch}></input>
                        </div>
                        <div className="flex justify-center px-6 pb-4">
                            <div className="grid grid-cols-1 gap-4 lg:grid-cols-4">
                                {
                                    coins.map((coin, i) => {
                                        return <Coin key={i} name={coin.name} symbol={coin.symbol} image={coin.image} price={coin.current_price} 
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