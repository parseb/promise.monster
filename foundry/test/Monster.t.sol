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
        vm.prank(GREEN, GREEN);
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
        assertTrue(mToken.approve(address(PM), 1000 * 10 ** 18));
        bool t = PM.makeAsset(address(mToken), 1, 10 ** 18, address(0));
        assertTrue(t);
        vm.stopPrank();
        assertTrue(PM.balanceOf(GREEN) >= 1);
    }

    /// can create ERC721 Asset
    function testCreate7210Asset() public {
        vm.startPrank(GREEN, GREEN);
        mNFT.approve(address(PM), mNFT.tokenID());
        PM.makeAsset(address(mNFT), 2, mNFT.tokenID(), address(0));
        assertTrue(mNFT.balanceOf(address(PM)) > 0);
        vm.stopPrank();
        assertTrue(PM.balanceOf(GREEN) >= 1);
    }

    function testBurnsAsset() public {
        vm.startPrank(GREEN, GREEN);

        mNFT.approve(address(PM), mNFT.tokenID());
        PM.makeAsset(address(mNFT), 2, mNFT.tokenID(), address(0));
        PM.burnAsset(PM.globalID(), address(0));

        assertTrue(mToken.approve(address(PM), 1000 * 10 ** 18));
        bool t = PM.makeAsset(address(mToken), 1, 10 ** 18, address(0));
        assertTrue(t);
        PM.burnAsset(PM.globalID(), address(0));

        vm.stopPrank();
    }

    function testCreate7210AssetTO() public {
        vm.startPrank(GREEN, GREEN);
        mNFT.approve(address(PM), mNFT.tokenID());
        PM.makeAsset(address(mNFT), 2, mNFT.tokenID(), address(79));
        assertTrue(mNFT.balanceOf(address(PM)) > 0);
        vm.stopPrank();
        assertTrue(PM.balanceOf(address(79)) >= 1);
    }

    function testBurnsAssetTO() public {
        assertTrue(mNFT.ownerOf(mNFT.tokenID()) == GREEN, "not owner");
        vm.prank(GREEN);
        mNFT.approve(address(PM), 2345);
        vm.prank(GREEN, GREEN);
        PM.makeAsset(address(mNFT), 2, 2345, address(79));

        assertTrue(PM.ownerOf(PM.globalID()) == address(79), "not owner");
        uint256 id = PM.globalID();
        vm.prank(address(79), address(79));
        PM.burnAsset(id, address(1));

        vm.startPrank(GREEN, GREEN);
        assertTrue(mToken.approve(address(PM), 1000 * 10 ** 18));
        bool t = PM.makeAsset(address(mToken), 1, 10 ** 18, address(79));
        assertTrue(t);

        vm.stopPrank();
        id = PM.globalID();
        assertTrue(PM.ownerOf(id) == address(79));
        vm.prank(address(79), address(79));
        PM.burnAsset(id, address(0));
    }

    function testGetsAssets() public {
        testCreate7210AssetTO();
        assertTrue( PM.assetsOf(address(79)).length > 0, 'no assets retrieved');
    }

    function testPromiseMintAssetTo() public {}

    // function testCheckIntuition(uint x) public {
    //     vm.assume(x > 10);
    //     vm.assume(x < 100000000000);
    //     assertTrue(  (( x % 2) ) == 0, "FFF" );
    //     assertTrue( ( x % 10) !=0 , "ZZ");
    // }


    function testCannotMintMultipleSouls() public {
        vm.prank(address(111222),address(111222));
        PM.mintSoul();
        assertTrue(PM.getSoulID(address(111222)) != 0, "failed to get sbt");
        
        vm.prank(address(111222),address(111222));
        vm.expectRevert('already owned');
        PM.mintSoul();

        uint sID = PM.getSoulID(address(111222));
        assertTrue(sID !=0, "hasOrIsPromised[0] is reserved for soul id but soulID not saved at mint -likely cause:mint returns in beforeTransfer before saved at[0]");


        //// test is claimOnwer on promise and has soul but cannot mint another

    }
}
