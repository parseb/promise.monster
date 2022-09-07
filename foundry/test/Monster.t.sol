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

    function testDeployed() public {
        assertTrue(address(PM) != address(0), "Not deployed");
        assertTrue(PM.AAVE() != address(0), "AAVE undefined");
    }

    function testSoulMint() public {
        vm.expectRevert(PromiseMonster.SoullessMachine.selector);
        PM.mintSoul();
        vm.prank(GREEN, GREEN);
        uint256 soulID = PM.mintSoul();
        assertTrue(soulID > 0, "globalId is 0");
        assertTrue(soulID % 2 != 0, "soulID is even");
        ORANGE = GREEN;

        vm.expectRevert("already owned");
        vm.prank(ORANGE, ORANGE);
        PM.mintSoul();
    }

    function testNoSouldTransfer() public {
        vm.startPrank(GREEN, GREEN);
        uint256 soulID = PM.mintSoul();
        assertTrue(PM.balanceOf(GREEN) >= 1);
        assertTrue(soulID >= 1);

        /// SBT Cannot be transfered
        vm.expectRevert(PromiseMonster.Blasphemy.selector);
        PM.transferFrom(GREEN, address(1), soulID);
        vm.stopPrank();
    }

    /// can create ERC20 Asset
    function testCreateERC20Asset() public {
        vm.startPrank(GREEN, GREEN);
        assertTrue(mToken.approve(address(PM), 1000*10**18));
        bool t = PM.makeAsset(address(mToken), 1, 10**18);
        assertTrue(t);
        vm.stopPrank();
        assertTrue(PM.balanceOf(GREEN) >= 1);
    }

    /// can create ERC721 Asset
    function testCreate7210Asset() public {
        vm.startPrank(GREEN, GREEN);
        mNFT.approve(address(PM), mNFT.tokenID());
        PM.makeAsset(address(mNFT), 2, mNFT.tokenID());
        assertTrue(mNFT.balanceOf(address(PM))> 0 );
        vm.stopPrank();
        assertTrue(PM.balanceOf(GREEN) >= 1);
    }

    function testBurnsAsset() public {
        vm.startPrank(GREEN, GREEN);
        
        mNFT.approve(address(PM), mNFT.tokenID());
        PM.makeAsset(address(mNFT), 2, mNFT.tokenID());
        PM.burnAsset(PM.globalID()) ;   

        assertTrue(mToken.approve(address(PM), 1000*10**18));
        bool t = PM.makeAsset(address(mToken), 1, 10**18);
        assertTrue(t);
        PM.burnAsset(PM.globalID()) ;   

        vm.stopPrank();
    }

}
