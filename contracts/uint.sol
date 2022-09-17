// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

contract Pom {

    uint public maximum;

    function demo() public {
        maximum = type(uint256).max;
    }
}


