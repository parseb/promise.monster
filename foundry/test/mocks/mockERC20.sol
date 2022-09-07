// SPDX-License-Identifier: UNLICENSED
pragma solidity >=0.8.0;

import "openzeppelin-contracts/contracts/token/ERC20/ERC20.sol";

contract MockERC20 is ERC20("CommunityValueToken","CVT") {
    address public ofthis;
    constructor(){
        ofthis = address(this);
        _mint(address(1337),(10000000000000 * 10 ** 18));
        _mint(address(99),(900000 * 10 ** 18));
        _mint(address(421),(900000 * 10 ** 18));
    }

}
