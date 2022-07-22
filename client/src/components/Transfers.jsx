import { useContext, useEffect } from "react";
import { TransactionContext } from "../App";
import TransferRows from "./TransferRows";

const Receive = () => {
    const { transactCountContext, getAllTransactions, checkTransactions, transactionList } = useContext(TransactionContext);

    // gets the transactions and the transaction count from the contract
    useEffect(() => {
        checkTransactions();
        getAllTransactions();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
    
    return (
        <div className="flex flex-col justify-center p-6">
            <h1 className="pb-12 text-6xl text-center animate-fade-in-down drop-shadow-lg">Latest Transactions</h1>
            <h1 className="pb-12 text-center">Number of transactions : {transactCountContext.transactCount}</h1>
            <div className="overflow-x-auto shadow-md sm:rounded-lg">
                <div className="inline-block min-w-full align-middle">
                    <div className="overflow-hidden">
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-neutral-300">
                                <tr>
                                    <th className="px-6 py-3 text-left">
                                        From
                                    </th>
                                    <th className="px-6 py-3 text-left">
                                        To
                                    </th>
                                    <th className="px-6 py-3 text-left">
                                        Time
                                    </th>
                                    <th className="px-6 py-3 text-left">
                                        Amount (eth)
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-300">
                                {
                                    transactionList.reverse().map((transaction, i) => (
                                        <TransferRows key={i} addressFrom={transaction.addressFrom} addressTo={transaction.addressTo} timestamp={transaction.timestamp} amount={transaction.amount}/>
                                    ))
                                }
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Receive;