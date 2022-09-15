// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

contract Demo {
    address owner;

    event newPayment(address indexed _from , uint _amount , uint _timestamp);

	constructor(){
        owner = msg.sender;
    }

    modifier onlyOwner(address _to) {
        require(msg.sender == owner, "You are not owner!");
        _;
    }

    function pay() external payable {
        emit newPayment( msg.sender , msg.value , block.timestamp);

    }
    function withdraw(address payable _to) external onlyOwner(_to) {
        
        _to.transfer(address(this).balance);

    }
}