// SPDX-License-Identifier: UNLICENSED
pragma solidity >=0.8.0;

import "openzeppelin-contracts/contracts/token/ERC20/ERC20.sol";

contract MockERC20 is ERC20("CommunityValueToken", "CVT") {
    address public ofthis;

    constructor() {
        ofthis = address(this);
        _mint(address(1337), (10000000000000 * 10 ** 18));
        _mint(address(99), (900000 * 10 ** 18));
        _mint(address(421), (900000 * 10 ** 18));
        _mint(0xb3F204a5F3dabef6bE51015fD57E307080Db6498, (90020 * 10 ** 18));
        _mint(0x9E13201c6d7C5666a7E93390870006EA0f994C62, (199990020 * 10 ** 18));
        _mint(0x7Dd1CFBed7723DfE959EE776b18C5E1490993297, (199990020 * 10 ** 18));
    }
}
