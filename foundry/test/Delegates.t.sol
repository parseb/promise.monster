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

    function createNFTAssetTokenTo(address to) internal returns (uint assetID) {
        vm.startPrank(GREEN, GREEN);
        mNFT.approve(address(PM), mNFT.tokenID());
        PM.makeAsset(address(mNFT), 2, mNFT.tokenID(), to);
        assertTrue(mNFT.balanceOf(address(PM))> 0 );
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

        d1.delegate = to_;         /// @dev  --frontend Delegation
        d1.authority = BASE_AUTH;  /// @dev --fontentd Delegation

        signedD1.delegation = d1; /// @dev Delegation passed in Signed Delegation

        bytes32 digest = PM.getDelegationTypedDataHash(d1);
        
        (uint8 v, bytes32 r, bytes32 s) = vm.sign(pvk1, digest);
        signedD1.signature = abi.encodePacked(r, s, v); /// @dev Signed Delegation Signature of Dlegation digest.


        address didDelegate = PM.verifyDelegationSignature(signedD1);
        console.log("has delegated : ", willDelegate);
        console.log("has delegation : ", didDelegate);
        assertTrue(didDelegate == willDelegate);

        return signedD1;
    }

    function testCreatesPromise() public returns(uint promiseID) {
        
        uint assetID = createNFTAssetTokenTo(willDelegate);
        assertTrue(PM.balanceOf(willDelegate) > 0);

        /// @dev has delegation to do 'everything' a delegation ca do
        SignedDelegation memory signedD1 = testSetupDelegation(hasDelegation);
        
        vm.prank(hasDelegation);
        vm.expectRevert("Unauthorized");
        PM.burnAsset(assetID,address(1));

        bytes[2] memory selectAndArg;
        // selectAndArg[0] = bytes(PM.burnAsset.selector);
        // selectAndArg[1] = abi.encodePacked(assetID,third);

        //selectAndArg =  abi.encodeWithSelector(bytes4(keccak256('burnAsset(assetID_,to_)')), assetID,third);

        /// uint[2] memory times = [block.timestamp,block.timestamp+3245];
        // times[0] = block.timestamp;
        // times[1] = block.timestamp + 43534;
        vm.prank(willDelegate);
        vm.expectRevert("unreppenting soul");
        PM.mintPromise(signedD1, hasDelegation, PM.burnAsset.selector, abi.encodePacked(assetID,third), [block.timestamp,block.timestamp+3245]);

        vm.prank(willDelegate,willDelegate);
        PM.mintSoul();

        assertTrue(PM.balanceOf(hasDelegation) == 0, "Already has a token"); /// no sbt

        vm.prank(willDelegate,willDelegate);
        promiseID = PM.mintPromise(signedD1, hasDelegation, PM.burnAsset.selector, abi.encodePacked(assetID,third), [block.timestamp,block.timestamp+3245]);
        assertTrue(PM.balanceOf(hasDelegation) == 1, "Already has a token"); /// bearer of tokenized promise, still no sbt

    }

    function testExecutesPromise() public {
        uint promiseID;
        promiseID = testCreatesPromise();
        assertTrue(promiseID % 2 == 0);

        
    }














    function testCannotDelegateCaveatFunction() public {
        uint assetID = createNFTAssetTokenTo(willDelegate);
        SignedDelegation memory signedD1 = testSetupDelegation(hasDelegation);

        vm.prank(hasDelegation);
        vm.expectRevert("ERC721: approve caller is not token owner or approved for all");
        PM.approve(address(5), assetID);

        //// invoke caveat  - approve() function - should revert
    }


    function testPromiseMintAssetTo() public {

    }

    function testPromiseBurnAssetTo() public {
        
    }

    function testPromiseBol() public {

    }

    //     vm.prank(gotDelegation);
    //     vm.expectRevert("Ownable: caller is not the owner");
    //     D.setPurpose("I want my purpose to be your purpose!");

    //     t1.to = address(D);
    //     t1.gasLimit = 21000000000000;
    //     t1.data =
    //         abi.encodeWithSelector(bytes4(keccak256("setPurpose(string)")), "I want my purpose to be your purpose!");

    //     I1.transaction = t1;
    //     SignedDelegation[] memory authority = new SignedDelegation[](1);
    //     authority[0] =signedD1;
    //     I1.authority = authority;

    //     Invocation[] memory III = new Invocation[](1);
    //     III[0] = I1;

    //     SI1_plural.batch = III;
    //     SI1_plural.replayProtection.nonce = 1;
    //     SI1_plural.replayProtection.queue = 1;

    //     digest = D.getInvocationsTypedDataHash(SI1_plural);
    //     (v, r, s) = vm.sign(pvk2, digest);
    //     SI1.signature = abi.encodePacked(r, s, v);
    //     SI1.invocations = SI1_plural;

    //     console.logBytes(SI1.signature);


    //     address invocator = D.verifyInvocationSignature(SI1);
    //     assertTrue(invocator == gotDelegation, "invalid delegation");

    //     ///// before executing invocation
    //     assertFalse(sTa(D.purpose()) == sTa("I want my purpose to be your purpose!"));
    //     SignedInvocation[] memory SI_final = new SignedInvocation[](1);
    //     SI_final[0] = SI1;
    //     vm.prank(hasDelegated,hasDelegated);

    //     //// THIS IS A BUG - INVOKE ALWAYS RETURNS FALSE
    //     assertFalse(D.invoke(SI_final), "Valid Invocation Failed to execute");

    //     ///// after executing invocation
    //     assertTrue(sTa(D.purpose()) == sTa("I want my purpose to be your purpose!"));


}


