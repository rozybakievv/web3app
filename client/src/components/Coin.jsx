const Coin = (props) => {
    return (
        <div className="max-w-xs overflow-hidden transition duration-200 ease-in-out border-2 rounded-lg shadow-lg max-h-sm border-neutral-700 hover:translate-y-1">
            {/* Image of coin */}
            <div className="flex justify-center p-4">
                <img src={props.image} alt={props.image} className="h-24" />
            </div>
            <div className="w-full px-6 py-4">
                {/* Title */}
                <h1 className="text-xl font-bold text-center">{props.name} ({props.symbol})</h1>

                <div className="w-full m-2 border border-neutral-400"></div>

                {/* Information */}
                <table className="w-full pt-4 table-fixed">
                    <tbody>
                        <tr>
                            <td>Price:</td>
                            <td className="text-right">{props.price}$</td>
                        </tr>
                        <tr>
                            <td>24%:</td>
                            {
                                props.price24 >= 0 ? <td className="text-right text-green-500">+{props.price24}%</td>
                                : <td className="text-right text-red-500">{props.price24}%</td>
                            }
                        </tr>
                        <tr>
                            <td>Market cap:</td>
                            <td className="text-right">{props.market_cap}$</td>
                        </tr>
                        <tr>
                            <td>Circulating Supply:</td>
                            <td className="text-right">{props.circulating_supply}$</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default Coin;