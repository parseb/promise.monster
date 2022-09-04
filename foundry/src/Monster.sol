// SPDX-License-Identifier: UNLICENSED
pragma solidity 0.8.15;

/// @title Promise.Monster (P.M)
/// @author parseb.eth
/// @notice promise and reputation building support structure
/// @dev Experimental. Do not use.
/// @custom:security contact: petra306@protonmail.com

import "openzeppelin-contracts/contracts/token/ERC721/ERC721.sol";
import "delegatable-sol/Delegatable.sol";

//import "aave-v3-core/contracts/interfaces/.... .sol"

contract PromiseMonster is 
ERC721("Promise.Monster", unicode"👾"), 
Delegatable("Promise.Monster", "1") {
    
    address public AAVE;
    uint256 public globalID;

    /// @notice stores IDs for address' relevant promises [historical]
    /// first item is reserved for soulbinding token
    mapping(address => uint256[]) hasOrIsPromised;


    /// @notice stores the address of a claim
    mapping(uint256 => Promise) getPromise;

    /// @notice moral responsibility
    /// issuer and all liable are responsible for the existence of the debt
    /// pull transfer pattern only for indebted souls
    mapping(uint => address[]) chainedSouls;

    enum Standing {
        Created,
        Active,
        Honored,
        Broken,
        Indeterminate
    }

    struct Promise {
        Standing state; /// lifecycle state
        uint liableID; /// 
        address claimOwnerId;
        bytes content;
    }

  constructor()  {
    AAVE = address(7743);
  }


  //// Errors
  
  error Blasphemy();
  error UnpassableBuck();

  ///// Events

  event idIncremented();
  event newSoulAcquired(address indexed who, uint indexed soulID);
  event burdenTransfer(uint indexed claim, uint indexed destinationSoul);
  
  //// Modifiers

  modifier isSoul(){
    require (getSoulID(msg.sender) != 0, "unreppenting soul");
    _;
  }

  /// Public
  
  /// @notice permantently registers sender as indebtness capable soul
  function mintSoul() public returns (uint) {
    require(_isEOA(), "soulless machine");
    require(hasOrIsPromised[msg.sender].length == 0 || hasOrIsPromised[msg.sender][0] == 0, "already owned");
    _incrementID();
    if( globalID % 2 == 0) _incrementID();
    _mint(msg.sender, globalID);
    emit newSoulAcquired(msg.sender, globalID);
    
    return globalID;
  }


  ///// External

  function mintPromise() external returns (uint) {
    return 1+1;
  }


  ///// Private

  /// @notice increments global ID
  function _incrementID() private {
    unchecked {
        ++ globalID;
    }
    emit idIncremented();
  }
    //// @notice checks if sender is EOA
    function _isEOA() private view returns (bool) {
        return (msg.sender == tx.origin);
    }


  //// View

    function getSoulID(address eoa_) public view returns (uint) {
        return hasOrIsPromised[eoa_][0]; 
    }


    function getPromiseHistory() public view {}
    function getSoulRecord() public view {}
  




























//////// Override

    function _beforeTokenTransfer(
        address from,
        address to,
        uint256 tokenId
    ) internal virtual override {
        if (from == address(0)) {
            hasOrIsPromised[msg.sender].push(tokenId);
            return;
        }
        if (tokenId % 2 == 0) {
            /// not soulbound
            /// liability transfer possible only through pull pattern

            if (getSoulID(msg.sender) == getPromise[tokenId].liableID) revert UnpassableBuck();
            /// mints soul if none
            /// @dev @note contract might gain soul
            uint toSoul = getSoulID(to) == 0 ? mintSoul() : getSoulID(to);
            /// liable for promise
            getPromise[tokenId].liableID = globalID;
            /// shared moral responsibility
            chainedSouls[tokenId].push(msg.sender);
            /// add claimed burden to soul
            hasOrIsPromised[msg.sender].push(tokenId);

            emit burdenTransfer(tokenId, toSoul);
        } else {
            /// soulbound
            revert Blasphemy();
        }
    }

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
