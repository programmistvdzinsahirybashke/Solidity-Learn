// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

contract MyShop {
    // 0xa131AD247055FD2e2aA8b156A11bdEc81b9eAD95
    address public owner;
    mapping (address => uint) public payments;
    
    constructor() {
        owner = msg.sender;
    }
    function payForItem() public payable {
        payments[msg.sender] = msg.value;
    }

    function withdrawAll () public {
        address payable _to = payable(owner);
        address _thisContract = address(this);
        _to.transfer(_thisContract.balance);
    }
}