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
    // address RED;
    // address ORANGE;

    address willDelegate;
    address hasDelegation;
    address third;

    bytes32 BASE_AUTH = 0x0000000000000000000000000000000000000000000000000000000000000000;
    string mnemonic = "test test test test test test test test test test test junk";
    uint256 pvk1;
    uint256 pvk2;
    uint256 pvk3;

    function setUp() public {
        PM = new PromiseMonster();
        mToken = new MockERC20();
        mNFT = new Mock721();

        GREEN = address(1337);
        // RED = address(99);
        // ORANGE = address(421);

        pvk1 = vm.deriveKey(mnemonic, 1);
        pvk2 = vm.deriveKey(mnemonic, 6);
        pvk3 = vm.deriveKey(mnemonic, 9);

        willDelegate = vm.addr(pvk1);
        hasDelegation = vm.addr(pvk2);
        third = vm.addr(pvk3);
    }

    function createNFTAssetTokenTo(address to) internal returns (uint256 assetID) {
        vm.startPrank(GREEN, GREEN);
        mNFT.approve(address(PM), mNFT.tokenID());
        PM.makeAsset(address(mNFT), 2, mNFT.tokenID(), to);
        assertTrue(mNFT.balanceOf(address(PM)) > 0);
        vm.stopPrank();
        assertTrue(PM.balanceOf(to) >= 1);

        assetID = PM.globalID();
    }

    function mintSoul(address to) internal {
        vm.prank(to, to);
        PM.mintSoul();
    }

    function testSetupDelegation(address to_) public returns (SignedDelegation memory) {
        Delegation memory d1;
        SignedDelegation memory signedD1;

        d1.delegate = to_;

        /// @dev  --frontend Delegation
        d1.authority = BASE_AUTH;
        /// @dev --fontentd Delegation

        signedD1.delegation = d1;

        /// @dev Delegation passed in Signed Delegation

        bytes32 digest = PM.getDelegationTypedDataHash(d1);

        (uint8 v, bytes32 r, bytes32 s) = vm.sign(pvk1, digest);
        signedD1.signature = abi.encodePacked(r, s, v);
        /// @dev Signed Delegation Signature of Dlegation digest.

        address didDelegate = PM.verifyDelegationSignature(signedD1);
        console.log("has delegated : ", willDelegate);
        console.log("has delegation : ", didDelegate);
        assertTrue(didDelegate == willDelegate);

        return signedD1;
    }

    function testCreatesPromise() public returns (uint256 promiseID) {
        uint256 assetID = createNFTAssetTokenTo(willDelegate);
        assertTrue(PM.balanceOf(willDelegate) > 0);

        /// @dev has delegation to do 'everything' a delegation ca do
        SignedDelegation memory signedD1 = testSetupDelegation(hasDelegation);

        vm.prank(hasDelegation);
        vm.expectRevert("Unauthorized");
        PM.burnAsset(assetID, address(1));

        vm.prank(willDelegate);
        vm.expectRevert("unreppenting soul");
        PM.mintPromise(
            signedD1,
            hasDelegation,
            abi.encodeWithSignature("burnAsset(uint256,address)", assetID, third),
            [block.timestamp, block.timestamp + 3245]
        );

        vm.prank(willDelegate, willDelegate);
        PM.mintSoul();

        assertTrue(PM.balanceOf(hasDelegation) == 0, "Already has a token");

        /// no sbt

        vm.prank(willDelegate, willDelegate);
        promiseID = PM.mintPromise(
            signedD1,
            hasDelegation,
            abi.encodeWithSignature("burnAsset(uint256,address)", assetID, third),
            [block.timestamp, block.timestamp + 3245]
        );
        assertTrue(PM.balanceOf(hasDelegation) == 1, "Already has a token");
        /// bearer of tokenized promise, still no sbt
    }

    function testExecutesPromise() public {
        uint256 promiseID;
        promiseID = testCreatesPromise();
        assertTrue(promiseID % 2 == 0);

        Promise memory P;
        P = PM.getPromiseByID(promiseID);
        assertFalse(P.times[0] > block.timestamp);

        uint256 checkpoint = vm.snapshot();

        /// ---

        vm.prank(hasDelegation, hasDelegation);
        PM.executePromise(promiseID);

        vm.revertTo(checkpoint);
        checkpoint = vm.snapshot();

        vm.prank(hasDelegation, hasDelegation);
        PM.transferFrom(hasDelegation, third, promiseID);

        vm.prank(third, third);
        PM.executePromise(promiseID);

        vm.revertTo(checkpoint);
        checkpoint = vm.snapshot();

        vm.prank(address(5), address(5));
        vm.expectRevert("Not promised to you");
        PM.executePromise(promiseID);

        vm.revertTo(checkpoint);
        checkpoint = vm.snapshot();

        vm.prank(hasDelegation, hasDelegation);
        PM.transferFrom(hasDelegation, third, promiseID);

        assertTrue(PM.balanceOf(third) == 1);
        assertFalse(mNFT.balanceOf(third) == 1);

        vm.prank(third, third);
        PM.executePromise(promiseID);

        /// has nft
        assertTrue(mNFT.balanceOf(third) == 1);
        /// has no sbt/promsise(burned)/asset
        assertTrue(PM.balanceOf(third) == 0);
    }

    function testPromiseToExecutePromise() public {}

    function testZZZCannotDelegateCaveatFunction() public {
        uint256 assetID = createNFTAssetTokenTo(willDelegate);
        SignedDelegation memory signedD1 = testSetupDelegation(hasDelegation);

        vm.prank(hasDelegation);
        vm.expectRevert("ERC721: approve caller is not token owner or approved for all");
        PM.approve(address(5), assetID);

        vm.prank(hasDelegation);
        vm.expectRevert("unreppenting soul");
        uint promiseId = PM.mintPromise(
            signedD1,
            hasDelegation,
            abi.encodeWithSignature("setApprovalForAll(address,bool)", address(4354), true),
            [block.timestamp, block.timestamp + 3245]
        );

        vm.prank(willDelegate,willDelegate);
        PM.mintSoul();

        vm.prank(willDelegate);
        vm.expectRevert("unreachable function");
        PM.mintPromise(
            signedD1,
            hasDelegation,
            abi.encodeWithSignature("setApprovalForAll(address,bool)", address(4354), true),
            [block.timestamp, block.timestamp + 3245]
        );

        //// urelated : test view function
        Promise[] memory P = PM.getPromiseHistory(hasDelegation);
        assertTrue(P.length == 0);


        vm.prank(willDelegate,willDelegate);
        PM.mintPromise(
            signedD1,
            hasDelegation,
            abi.encodeWithSignature("RandFunction(address)", address(4354), true),
            [block.timestamp, block.timestamp + 3245]
        );

        P = PM.getPromiseHistory(willDelegate);
        assertTrue(P.length > 0);
        assertFalse(P[2].state == Standing.Uninitialized); ///@dev potential duplication. retrace
        console.log(PM.getSoulID(willDelegate));
        console.log(P[1].liableID);

        assertTrue(P[1].liableID == P[2].liableID ); /// @dev ^ take this
        assertTrue(P[0].liableID == 0);
    }
}