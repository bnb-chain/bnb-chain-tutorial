// SPDX-License-Identifier: GPL-3.0
pragma solidity ^0.8.19;
//deploy to remix

contract GiveForever { 
    //1. Obtain the Contract's ABI
    //2. Obtain the Contract's Deployment address
    string hi = "Hello World"; 
    function hello() external view returns (string memory){ 
        return hi;
    }
}