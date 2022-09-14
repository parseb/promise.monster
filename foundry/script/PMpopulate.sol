// SPDX-License-Identifier: UNLICENSED
pragma solidity 0.8.15;

import "forge-std/Script.sol";
import "../src/Monster.sol";

contract PMpopulate is Script {

    PromiseMonster PM = PromiseMonster(0x85bD8246Ea54B20D18A582b4c5400833A04c926e);
    
    function testSetupDelegation(address to_) public returns (SignedDelegation memory) {
        
        Delegation memory d1;
        SignedDelegation memory signedD1;

        d1.delegate = to_;

        /// @dev  --frontend Delegation
        d1.authority = 0x0;
        /// @dev --fontentd Delegation

        signedD1.delegation = d1;

        /// @dev Delegation passed in Signed Delegation

        bytes32 digest = PM.getDelegationTypedDataHash(d1);

        (uint8 v, bytes32 r, bytes32 s) = vm.sign($GOERLI_NUM_PVK, digest);
        signedD1.signature = abi.encodePacked(r, s, v);
        /// @dev Signed Delegation Signature of Dlegation digest.

        address didDelegate = PM.verifyDelegationSignature(signedD1);

        return signedD1;
    }

    function run() external {

        vm.startBroadcast();
        PM.mintPromise(
            testSetupDelegation(0xBD1302Ce69e65cAA2c85bB686A27437EaE00C6Fd),
            0xBD1302Ce69e65cAA2c85bB686A27437EaE00C6Fd,
            abi.encodeWithSignature("burnAsset(uint256,address)", 20, 0xBD1302Ce69e65cAA2c85bB686A27437EaE00C6Fd),
            [block.timestamp, block.timestamp + 3245000]
        );
        vm.stopBroadcast();
    }
}
