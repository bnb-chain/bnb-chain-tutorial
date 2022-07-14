// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
import "@openzeppelin/contracts/security/Pausable.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

/** @title BSCNFT */ 
contract BSCNFT is ERC721, ERC721Enumerable, Pausable, Ownable {

    /* Property Variables */

    using Counters for Counters.Counter;

    Counters.Counter private _tokenIdCounter;

    uint256 public MINT_PRICE = 0.05 ether;  //Change this value as per your requirement
    uint public MAX_SUPPLY = 100;            //Change this value as per your requirement

    /** @dev Constructor to set Name and Initials for NFT
             and increment token counter 
     */
    constructor() ERC721("HappyMonkey", "HM") {
        // Start token ID at 1. By default is starts at 0.
        _tokenIdCounter.increment();
    }

    /** @dev Withdraw Tokens 
     */
    function withdraw() public onlyOwner() {
        require(address(this).balance > 0, "Balance is zero");
        payable(owner()).transfer(address(this).balance);
    }

    /** @dev Pause NFT Function
      */
    function pause() public onlyOwner {
        _pause();
    }
    /** @dev Unpause NFT Function
      */
    function unpause() public onlyOwner {
        _unpause();
    }

    /** @dev Function to Mint NFTs
      */

    function safeMint(address to) public payable {
        // Check that totalSupply is less than MAX_SUPPLY
        require(totalSupply() < MAX_SUPPLY, "Can't mint anymore tokens.");

        // Check if enough amount of Ethers are passed
        require(msg.value >= MINT_PRICE, "Not enough ether sent.");
        uint256 tokenId = _tokenIdCounter.current();
        _tokenIdCounter.increment();
        _safeMint(to, tokenId);
    }

    /** @dev Function to set the URI of the NFT
      */
    function _baseURI() internal pure override returns (string memory) {
        return "ipfs://happyMonkeyBaseURI/";    //change this for your token
    }

    /** @dev Sanity Checks before the token is transferrred
      */
    function _beforeTokenTransfer(address from, address to, uint256 tokenId)
        internal
        whenNotPaused
        override(ERC721, ERC721Enumerable)
    {
        super._beforeTokenTransfer(from, to, tokenId);
    }

    /** @dev The following functions are overrides required by Solidity.
      */
    function supportsInterface(bytes4 interfaceId)
        public
        view
        override(ERC721, ERC721Enumerable)
        returns (bool)
    {
        return super.supportsInterface(interfaceId);
    }
}
