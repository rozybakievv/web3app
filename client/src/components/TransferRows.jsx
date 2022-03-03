const TransferRows = (props) => {
    return (
        <tr className="transition duration-200 hover:bg-neutral-300">
            <td className="px-6 py-4 whitespace-nowrap">{props.addressFrom}</td>
            <td className="px-6 py-4 whitespace-nowrap">{props.addressTo}</td>
            <td className="px-6 py-4 whitespace-nowrap">{props.timestamp}</td>
            <td className="px-6 py-4 whitespace-nowrap">{props.amount}</td>
        </tr>
    )
}

export default TransferRows;
