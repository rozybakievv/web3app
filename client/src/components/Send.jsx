import { useContext, useEffect, useState } from "react";
import { TransactionContext } from "../App";
import Footer from "./Footer";

const Send = () => {
    const { formAddressContext, formAmountContext, sendTransaction, successContext } = useContext(TransactionContext);
    const [usd, setUsd] = useState(0);
    const [usdValue, setUsdValue] = useState("");

    const sendT = async () => {
        const address = document.getElementById("address");
        const amount = document.getElementById("amountEth");

        formAddressContext.setFormAddress(address.value);
        formAmountContext.setFormAmount(amount.value);

        await sendTransaction();
    }

    useEffect(() => {
        const fetchPrice = async () => {
            const response = await fetch('https://min-api.cryptocompare.com/data/price?fsym=ETH&tsyms=USD');
            const data = await response.json();
            setUsd(data.USD);
        }

        fetchPrice()
        .catch(console.error);
    }, [])

    const ethChange = (e) => {
        e.preventDefault();
        const ethAmount = document.getElementById("amountEth");
        const newUsdValue = ethAmount.value * usd;
        setUsdValue(`~` + newUsdValue + `$`);
    }

    return (
        <div className="flex flex-col items-center justify-center p-6">
            <div className="relative max-w-sm p-4 mb-16 shadow-lg rounded-xl bg-card h-44 w-80">
                <div className="flex items-center">
                    <svg fill="white" role="img" viewBox="0 0 24 24" width="24px" height="24px" xmlns="http://www.w3.org/2000/svg"><title>Ethereum</title><path d="M11.944 17.97L4.58 13.62 11.943 24l7.37-10.38-7.372 4.35h.003zM12.056 0L4.69 12.223l7.365 4.354 7.365-4.35L12.056 0z"/></svg>
                    <h1 className="ml-2 font-bold text-white">Ethereum</h1>
                </div>
            </div>

            <form autoComplete="off" className="w-96 px-4 md:p-0">
                <div className="mb-6">
                    <label htmlFor="address" className="block mb-2 text-md text-neutral-700">Address</label>
                    <input type="text" id="address" placeholder="0x" required className="block w-full p-2 border-2 outline-none graycolor rounded-xl border-neutral-700" />
                </div>
                <div className="mb-6">
                    <div className="grid grid-cols-2 gap-2">
                        <div>
                            <label htmlFor="address" className="block mb-2 text-md text-neutral-700">Amount (ETH)</label>
                            <input onChange={ethChange} type="number" min="0" id="amountEth" placeholder="0 eth" required className="block w-full p-2 border-2 outline-none graycolor rounded-xl border-neutral-700" />
                        </div>
                        <div>
                            <label htmlFor="address" className="block mb-2 text-md text-neutral-700">Amount (USD)</label>
                            <input readOnly disabled value={usdValue} id="amountEth" placeholder="0$" required className="block w-full p-2 border-2 outline-none graycolor rounded-xl border-neutral-700" />
                        </div>
                    </div>
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
            <Footer></Footer>
        </div>
    )
}

export default Send;