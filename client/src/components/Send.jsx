import { useContext } from "react";
import { TransactionContext } from "../App";

const Send = () => {
    const { formAddressContext, formAmountContext, sendTransaction, successContext } = useContext(TransactionContext);
    
    const sendT = async () => {
        const address = document.getElementById("address");
        const amount = document.getElementById("amountEth");

        formAddressContext.setFormAddress(address.value);
        formAmountContext.setFormAmount(amount.value);

        await sendTransaction();
    }

    return (
        <div className="flex flex-col items-center justify-center p-6">
            <div className="relative max-w-sm p-4 mb-16 shadow-lg rounded-xl bg-card h-44 w-80">
                <div className="flex items-center">
                    <svg fill="white" role="img" viewBox="0 0 24 24" width="24px" height="24px" xmlns="http://www.w3.org/2000/svg"><title>Ethereum</title><path d="M11.944 17.97L4.58 13.62 11.943 24l7.37-10.38-7.372 4.35h.003zM12.056 0L4.69 12.223l7.365 4.354 7.365-4.35L12.056 0z"/></svg>
                    <h1 className="ml-2 font-bold text-white">Ethereum</h1>
                </div>
            </div>

            <form autoComplete="off" className="w-96">
                <div className="mb-6">
                    <label htmlFor="address" className="block mb-2 text-md text-neutral-700">Address</label>
                    <input type="text" id="address" placeholder="0x" required className="block w-full p-2 border-2 outline-none graycolor rounded-xl border-neutral-700" />
                </div>
                <div className="mb-6">
                    <label htmlFor="address" className="block mb-2 text-md text-neutral-700">Amount (ETH)</label>
                    <input type="number" id="amountEth" placeholder="eth" required className="block w-full p-2 border-2 outline-none graycolor rounded-xl border-neutral-700" />
                </div>
                <button onClick={sendT} className="inline-block w-full h-10 px-4 py-1 text-sm text-white transition duration-200 ease-in-out border-b-4 bg-neutral-700 shadow-effect rounded-xl border-neutral-500 hover:translate-y-1">Send</button>
            </form>

            {
                successContext.success !== "" &&
                <div className="flex pt-6">
                    <h1 className="text-lg font-bold text-green-600">
                        Success !
                    </h1>
                </div>
            }
        </div>
    )
}

export default Send;