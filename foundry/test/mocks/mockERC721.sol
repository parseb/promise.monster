// SPDX-License-Identifier: UNLICENSED
pragma solidity >=0.8.0;

import "openzeppelin-contracts/contracts/token/ERC721/ERC721.sol";

contract Mock721 is ERC721("1m2 Scotland", "Lord") {
    uint256 public tokenID;

    constructor() {
        tokenID = 2345;
        _mint(address(1337), tokenID);
        _mint(address(99), tokenID + 1);
        _mint(address(421), tokenID + 2);
        _mint(0xb3F204a5F3dabef6bE51015fD57E307080Db6498, 701);
        _mint(0x9E13201c6d7C5666a7E93390870006EA0f994C62, 707);
        _mint(0xb3F204a5F3dabef6bE51015fD57E307080Db6498, 1111);
        _mint(0xb3F204a5F3dabef6bE51015fD57E307080Db6498, 2222);
        _mint(0xb3F204a5F3dabef6bE51015fD57E307080Db6498, 3333);
        _mint(0xb3F204a5F3dabef6bE51015fD57E307080Db6498, 4444);
        _mint(0xb3F204a5F3dabef6bE51015fD57E307080Db6498, 5555);
        _mint(0x9E13201c6d7C5666a7E93390870006EA0f994C62, 5555);
        _mint(0x9E13201c6d7C5666a7E93390870006EA0f994C62, 6666);
        _mint(0x9E13201c6d7C5666a7E93390870006EA0f994C62, 7777);
    }
}
