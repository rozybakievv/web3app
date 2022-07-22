// SPDX-License-Identifier: MIT

pragma solidity ^0.8.10;

// contract used for the web 3 application client side and deployed on the ropsten network
contract Send_Ethereum{
    uint256 transactionCount;
    
    event Send(address from, address receiver, uint amount, uint256 timestamp);

    struct SendStructure{
        address sender;
        address receiver;
        uint amount;
        uint256 timestamp;
    }

    SendStructure[] transactions;

    // function that stores the transactions and its count. also emits a send to a receiver address
    function sendEth(address payable receiver, uint amount) public {
        transactionCount += 1;
        transactions.push(SendStructure(msg.sender, receiver, amount, block.timestamp));

        emit Send(msg.sender, receiver, amount, block.timestamp);
    }

    // function that returns all the transactions done with this contract
    function getAllTransactions() public  view returns (SendStructure[] memory) {
        return transactions;
    }

    // function that returns the transaction count
    function getTransactionCount() public view returns (uint256) {
        return transactionCount;
    }
}