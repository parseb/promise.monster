// // SPDX-License-Identifier: UNLICENSED
// pragma solidity 0.8.15;

// import "forge-std/Script.sol";
// import "../src/Monster.sol";
// import "../test/mocks/mockERC20.sol";
// import "../test/mocks/mockERC721.sol";

// contract PMpopulate is Script {

//     PromiseMonster PM = PromiseMonster(0x532b93bf868c0D50296CA4c09a0578335aA96Fa5);
//     MockERC20 E20;
//     Mock721 E721;

// function stringToUint(string memory s) public pure returns (uint) {
//         bytes memory b = bytes(s);
//         uint result = 0;
//         for (uint256 i = 0; i < b.length; i++) {
//             uint256 c = uint256(uint8(b[i]));
//             if (c >= 48 && c <= 57) {
//                 result = result * 10 + (c - 48);
//             }
//         }
//         return result;
//     }
//     function setupDelegation(address to_) public returns (SignedDelegation memory) {
        
//         Delegation memory d1;
//         SignedDelegation memory signedD1;

//         d1.delegate = to_;

//         /// @dev  --frontend Delegation
//         d1.authority = 0x0;
//         /// @dev --fontentd Delegation

//         signedD1.delegation = d1;

//         /// @dev Delegation passed in Signed Delegation

//         bytes32 digest = PM.getDelegationTypedDataHash(d1);

//         (uint8 v, bytes32 r, bytes32 s) = vm.sign(stringToUint(vm.envString("NUM_PVK_1")), digest);
//         signedD1.signature = abi.encodePacked(r, s, v);
//         /// @dev Signed Delegation Signature of Dlegation digest.

//         address didDelegate = PM.verifyDelegationSignature(signedD1);

//         return signedD1;
//     }

//     function run() external {


//         vm.startBroadcast();
//         E20 = new MockERC20();
//         E721 = new Mock721();

//         E20.approve(address(PM), 11234567890 * 10 ** 18);
//         E721.approve(address(PM), 1111);
//         E721.approve(address(PM), 2222);
//         E721.approve(address(PM), 3333);

//         PM.makeAsset(address(E20), 1,  2* 10 ** 18, address(0));
//         PM.mintSoul(); /// once

//         PM.mintPromise(
//             setupDelegation(0xBD1302Ce69e65cAA2c85bB686A27437EaE00C6Fd),
//             0xBD1302Ce69e65cAA2c85bB686A27437EaE00C6Fd,
//             abi.encodeWithSignature("makeAsset(address,uint8,uint256,address)", address(E20),1,10*10**18, 0xBD1302Ce69e65cAA2c85bB686A27437EaE00C6Fd),
//             [block.timestamp, block.timestamp + 3245000]
//         );

//         PM.mintPromise(
//             setupDelegation(0xBD1302Ce69e65cAA2c85bB686A27437EaE00C6Fd),
//             0xBD1302Ce69e65cAA2c85bB686A27437EaE00C6Fd,
//             abi.encodeWithSignature("burnAsset(uint256,address)", 20, 0xBD1302Ce69e65cAA2c85bB686A27437EaE00C6Fd),
//             [block.timestamp, block.timestamp + 3245000]
//         );


//         PM.mintPromise(
//             setupDelegation(0xBD1302Ce69e65cAA2c85bB686A27437EaE00C6Fd),
//             0xBD1302Ce69e65cAA2c85bB686A27437EaE00C6Fd,
//             abi.encodeWithSignature("makeAsset(address,uint8,uint256,address)", address(E20),1,20*10**18, 0xBD1302Ce69e65cAA2c85bB686A27437EaE00C6Fd),
//             [block.timestamp, block.timestamp + 3245000]
//         );
//         PM.mintPromise(
//             setupDelegation(0xBD1302Ce69e65cAA2c85bB686A27437EaE00C6Fd),
//             0xBD1302Ce69e65cAA2c85bB686A27437EaE00C6Fd,
//             abi.encodeWithSignature("makeAsset(address,uint8,uint256,address)", address(E721),2,1111, 0xBD1302Ce69e65cAA2c85bB686A27437EaE00C6Fd),
//             [block.timestamp, block.timestamp + 3245000]
//         );
//         PM.mintPromise(
//             setupDelegation(0xBD1302Ce69e65cAA2c85bB686A27437EaE00C6Fd),
//             0xBD1302Ce69e65cAA2c85bB686A27437EaE00C6Fd,
//             abi.encodeWithSignature("makeAsset(address,uint8,uint256,address)", address(E721),2,2222, 0xBD1302Ce69e65cAA2c85bB686A27437EaE00C6Fd),
//             [block.timestamp, block.timestamp + 3245000]
//         );

//         vm.stopBroadcast();
//     }
// }
