// SPDX-License-Identifier: MIT

pragma solidity ^0.8.10;

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

    function sendEth(address payable receiver, uint amount) public {
        transactionCount += 1;
        transactions.push(SendStructure(msg.sender, receiver, amount, block.timestamp));

        emit Send(msg.sender, receiver, amount, block.timestamp);
    }

    function getAllTransactions() public  view returns (SendStructure[] memory) {
        return transactions;
    }

    function getTransactionCount() public view returns (uint256) {
        return transactionCount;
    }
}