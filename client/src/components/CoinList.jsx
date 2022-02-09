import Coin from "./Coin";

const CoinList = (props) => {
    return (
        <div class="flex flex-col h-full pt-12">
            <div class="overflow-x-auto">
                <div class="inline-block px-8 min-w-full ">
                    <div class="overflow-hidden shadow-md sm:rounded-lg lg:rounded-lg">
                        <table class="min-w-full">
                            <thead class="bg-gray-50 dark:bg-gray-600">
                                <tr>
                                    <th scope="col" class="py-3 px-6 text-xs font-medium tracking-wider text-left text-gray-700 uppercase dark:text-gray-400">
                                        Name
                                    </th>
                                    <th scope="col" class="py-3 px-6 text-xs font-medium tracking-wider text-left text-gray-700 uppercase dark:text-gray-400">
                                        Symbol
                                    </th>
                                    <th scope="col" class="py-3 px-6 text-xs font-medium tracking-wider text-left text-gray-700 uppercase dark:text-gray-400">
                                        24h %
                                    </th>
                                    <th scope="col" class="py-3 px-6 text-xs font-medium tracking-wider text-left text-gray-700 uppercase dark:text-gray-400">
                                        Price
                                    </th>
                                    <th scope="col" class="py-3 px-6 text-xs font-medium tracking-wider text-left text-gray-700 uppercase dark:text-gray-400">
                                        Market Cap
                                    </th>
                                    <th scope="col" class="py-3 px-6 text-xs font-medium tracking-wider text-left text-gray-700 uppercase dark:text-gray-400">
                                        Circulating Supply
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                <Coin></Coin>
                                <Coin></Coin>
                                <Coin></Coin>
                                <Coin></Coin>
                                <Coin></Coin>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CoinList;

// eslint-disable-next-line no-lone-blocks
{/* <th className="pb-4">Rank</th>
<th className="pb-4">Name</th>
<th className="pb-4">Symbol</th>
<th className="pb-4">24h %</th>
<th className="pb-4">Market Cap</th>
<th className="pb-4">Circulating Supply</th> */}