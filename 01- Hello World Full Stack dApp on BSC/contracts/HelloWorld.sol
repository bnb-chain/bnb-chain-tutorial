// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

/** @title Documents. */ 
contract HelloWorld {
     
string defaultName;
mapping (address => string) public accounts; 
 
constructor() public{
    defaultName = 'World';
}

/** @dev Retrieve Message to Print
      * @return The Message to Print, Hello, Concatenated with the User Name
      */ 
function getMessage() public view returns(string memory){
    string memory name = bytes(accounts[msg.sender]).length > 0 ? accounts[msg.sender] : defaultName;
    return concat("Hello, " , name);
}
 
/** @dev Set the Name to Greet 
      * @param  _name  user name
      * @return success Returns bool value (True or False) to indicate if save was successful or not
      */
function setName(string memory _name) public returns(bool success){
    require(bytes(_name).length > 0);
    accounts[msg.sender] = _name;
    return true;
}

/** @dev Set the Name to Greet 
      * @param  _base  contains the base value " Hello, "
      * @param  _value contains the name to append to message to display
      * @return the concatenated string of _base+_value i.e. Hello, Name
      */ 
 function concat(string memory _base, string memory _value) internal pure returns (string memory) {
        bytes memory _baseBytes = bytes(_base);
        bytes memory _valueBytes = bytes(_value);
 
        string memory _tmpValue = new string(_baseBytes.length + _valueBytes.length);
        bytes memory _newValue = bytes(_tmpValue);
 
        uint i;
        uint j;
 
        for(i=0; i<_baseBytes.length; i++) {
            _newValue[j++] = _baseBytes[i];
        }
 
        for(i=0; i<_valueBytes.length; i++) {
            _newValue[j++] = _valueBytes[i];
        }
        
        return string(_newValue);
    }
}
