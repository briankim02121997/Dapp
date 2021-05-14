// SPDX-License-Identifier: GPL-3.0
pragma solidity ^0.8.1;

import "./ItemManager.sol";

contract Item {
    uint public priceInWei;
    uint public pricePaid;
    uint public index;
    
    ItemManager parentContract;
    
    constructor(ItemManager _parentContract, uint _priceInWei, uint _index){
        parentContract = _parentContract;
        priceInWei = _priceInWei;
        index = _index;
    }
    
    receive() external payable {
        require(pricePaid == 0, "Item is already paid");
        require(msg.value == priceInWei, "Only fully payment accepted");
        pricePaid += msg.value;
        (bool success, ) = address(parentContract).call{value:msg.value}(abi.encodeWithSignature("triggerPayment(uint256)", index));
        require(success, "The transaction wasn't successful, canceling ...");
    }
    
    fallback() external {
    }
}