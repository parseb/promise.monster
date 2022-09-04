// SPDX-License-Identifier: UNLICENSED
pragma solidity 0.8.15;

import "forge-std/Test.sol";
import "../src/Monster.sol";

contract MonsterTest is Test {
    PromiseMonster PM;

    address GREEN;
    address RED;
    address ORANGE;


    function setUp() public {
        PM = new PromiseMonster();
        
        GREEN = address(1337);
        RED = address(99);
        ORANGE = address(420);

    }

    function testDeployed() public {
        assertTrue(address(PM) != address(0), "Not deployed");
        assertTrue(PM.AAVE() != address(0), "AAVE undefined");
    }

    function testSoulMint() public {
        vm.expectRevert("soulless machine");
        PM.mintSoul();
        vm.prank(GREEN,GREEN);
        uint soulID = PM.mintSoul();
        assertTrue( soulID > 0, "globalId is 0");
        assertTrue( soulID % 2 != 0, "soulID is even");
        ORANGE = GREEN;
        
        vm.expectRevert("already owned");
        vm.prank(ORANGE,ORANGE);
        PM.mintSoul();

    }
     
}
