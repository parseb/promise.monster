// // SPDX-License-Identifier: UNLICENSED
// pragma solidity 0.8.15;

// import "forge-std/Script.sol";
// import "../src/Monster.sol";

// contract DeployScript is Script {
//     function run() external {
//         uint256 deployerPrivateKey = uint(bytes32(vm.envString("MUMBAI_PVK")));
//         vm.startBroadcast(deployerPrivateKey);

//         PromiseMonster nft = new PromiseMonster();

//         vm.stopBroadcast();
//     }
