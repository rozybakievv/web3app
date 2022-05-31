const TransferRows = (props) => {
    return (
        <tr className="transition duration-200 graycolor hover:bg-neutral-300">
            <td className="px-6 py-4">{props.addressFrom}</td>
            <td className="px-6 py-4">{props.addressTo}</td>
            <td className="px-6 py-4">{props.timestamp}</td>
            <td className="px-6 py-4">{props.amount}</td>
        </tr>
    )
}

export default TransferRows;
