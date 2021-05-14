// SPDX-License-Identifier: GPL-3.0
pragma solidity ^0.8.1;

import "./Ownable.sol";
import "./Item.sol";

contract ItemManager is Ownable {
    
    enum SupplyChainState{
        Created,
        Paid,
        Delivered
    }
    
    struct S_Item{
        Item _item;
        string _identifier;
        uint _itemPrice;
        uint _itemIndex;
        SupplyChainState _state;
    }
    
    mapping(uint => S_Item) public items;
    uint public itemIndex;
    
    event SupplyChainStep(uint _itemIndex, uint _step, address _itemAddress);
    
    function createItem(string memory _identifier, uint _itemPrice) public onlyOwner{
        Item item = new Item(this, _itemPrice, itemIndex);
        items[itemIndex]._item = item;
        items[itemIndex]._identifier = _identifier;
        items[itemIndex]._itemPrice = _itemPrice;
        items[itemIndex]._itemIndex = itemIndex;
        items[itemIndex]._state = SupplyChainState.Created;
        
        emit SupplyChainStep(itemIndex, uint(items[itemIndex]._state), address(item));
        itemIndex++;
    }
    
    function triggerPayment(uint _itemIndex) public payable {
        require(items[_itemIndex]._itemPrice == msg.value, "Only fully payment appcepted");
        require(items[_itemIndex]._state == SupplyChainState.Created, "Item is futher in a chain");
        
        items[_itemIndex]._state = SupplyChainState.Paid;
        emit SupplyChainStep(_itemIndex, uint(items[_itemIndex]._state), address(items[_itemIndex]._item));
    }
    
    function triggerDelivery(uint _itemIndex) public {
        require(items[_itemIndex]._state == SupplyChainState.Paid, "Item is futher in a chain");
        
        items[_itemIndex]._state = SupplyChainState.Delivered;
        emit SupplyChainStep(_itemIndex, uint(items[_itemIndex]._state), address(items[_itemIndex]._item));
    }
}