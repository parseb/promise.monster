// SPDX-License-Identifier: UNLICENSED
pragma solidity 0.8.15;

/// @title Promise.Monster (P.M)
/// @author parseb.eth
/// @notice promise and reputation building support structure
/// @dev Experimental. Do not use.
/// @custom:security contact: petra306@protonmail.com

import "openzeppelin-contracts/contracts/token/ERC721/ERC721.sol";
import "delegatable-sol/Delegatable.sol";

contract PromiseMonster is ERC721("Promise.Monster", unicode"👾"), Delegatable("Promise.Monster", "1") {
    
    address AAVE;

  constructor()  {

  }




























//////// Override

  function _msgSender () internal view override(Context, DelegatableCore) returns (address sender) {
    if(msg.sender == address(this)) {
      bytes memory array = msg.data;
      uint256 index = msg.data.length;
      assembly {
        // Load the 32 bytes word from memory with the address on the lower 20 bytes, and mask those.
        sender := and(mload(add(array, index)), 0xffffffffffffffffffffffffffffffffffffffff)
      }
    } else {
      sender = msg.sender;
    }
    return sender;
  }


}
