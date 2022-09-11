// SPDX-License-Identifier: UNLICENSED
pragma solidity >=0.8.0;

import "openzeppelin-contracts/contracts/token/ERC721/ERC721.sol";

contract Mock721 is ERC721("CommunityValueToken", "CVT") {
    uint256 public tokenID;

    constructor() {
        tokenID = 2345;
        _mint(address(1337), tokenID);
        _mint(address(99), tokenID + 1);
        _mint(address(421), tokenID + 2);
    }
}
