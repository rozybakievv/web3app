// file that executes when the contract Send_Ethereum has to be deployed on the Ropsten network

const hre = require("hardhat");

const main = async() => {
    const Send_Ethereum = await hre.ethers.getContractFactory("Send_Ethereum");
    const send_eth = await Send_Ethereum.deploy();

    await send_eth.deployed();

    console.log("Contract deployed to : ", send_eth.address);
}

const executeMain = async() => {
    try {
        await main();
        process.exit(0);
    } catch (error) {
        console.error(error);
        process.exit(1);
    }
}

executeMain();