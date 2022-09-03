// SPDX-License-Identifier: UNLICENSED
pragma solidity 0.8.15;

import "forge-std/Test.sol";
import "../src/Monster.sol";

contract MonsterTest is Test {
    PromiseMonster PM;

    function setUp() public {
        PM = new PromiseMonster();
    }

    function testDeployed() public {
        assertTrue(address(PM) != address(0), "Not deployed");
    }
}
