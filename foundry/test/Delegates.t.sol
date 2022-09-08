// SPDX-License-Identifier: UNLICENSED
pragma solidity 0.8.15;

import "forge-std/Test.sol";
import "../src/Monster.sol";
import "./mocks/mockERC20.sol";
import "./mocks/mockERC721.sol";

contract MonsterTest is Test {
    PromiseMonster PM;
    MockERC20 mToken;
    Mock721 mNFT;

    address GREEN;
    address RED;
    address ORANGE;

    function setUp() public {
        PM = new PromiseMonster();
        mToken = new MockERC20();
        mNFT = new Mock721();

        GREEN = address(1337);
        RED = address(99);
        ORANGE = address(421);

    }

    function createNFTAssetTokenTo(address to) internal {
        vm.startPrank(GREEN, GREEN);
        mNFT.approve(address(PM), mNFT.tokenID());
        PM.makeAsset(address(mNFT), 2, mNFT.tokenID(), to);
        assertTrue(mNFT.balanceOf(address(PM))> 0 );
        vm.stopPrank();
        assertTrue(PM.balanceOf(to) >= 1);
    }

    function mintSoul(address to) internal {
        vm.prank(to, to);
        PM.mintSoul();
    }


    // Delegation memory d1;
    // SignedDelegation memory signedD1;
    // Transaction memory t1;
    // Invocation memory I1;
    // SignedInvocation memory SI1;




}


