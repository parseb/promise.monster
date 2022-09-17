// SPDX-License-Identifier: UNLICENSED
pragma solidity 0.8.15;

/// @title Promise.Monster (P.M)
/// @author parseb.eth
/// @notice promise and reputation building support structure
/// @dev Experimental. Do not use.
/// @custom:security contact: petra306@protonmail.com

import "openzeppelin-contracts/contracts/token/ERC721/ERC721.sol";
import "openzeppelin-contracts/contracts/token/ERC20/IERC20.sol";
import "delegatable-sol/Delegatable.sol";
import "delegatable-sol/TypesAndDecoders.sol";

//import "aave-v3-core/contracts/interfaces/.... .sol"

struct Promise {
    Standing state;
    /// lifecycle state
    uint256 liableID;
    /// liable soul
    address claimOwner;
    /// creditor
    uint256[2] times;
    /// executable within timeframe [starting with | until].
    SignedDelegation delegation;
    /// signed delegation
    bytes callData;
}
/// encoded function call() data

struct Asset {
    uint256 howMuch;
    /// type 2: (NFT) id of token | type 1: (ERC20)
    address tokenAddress;
    uint8 assetType;
}

enum Standing {
    Uninitialized,
    Created,
    Honored,
    Broken,
    Expired
}

contract PromiseMonster is ERC721("Promise.Monster", unicode"👾"), Delegatable("Promise.Monster", "1") {
    address public AAVE;
    address deployer;
    uint256 public globalID;

    /// @notice promise function allowlist
    mapping(bytes4 => bool) caveat;

    /// @notice stores IDs for address' relevant promises [historical]
    /// first item is reserved for soulbinding token
    mapping(address => uint256[]) public hasOrIsPromised;

    /// @notice stores the address of a claim
    mapping(uint256 => Promise) getPromise;

    /// @notice moral responsibility
    /// issuer and all liable are responsible for the existence of the debt
    /// pull transfer pattern only for indebted souls
    mapping(uint256 => address[]) chainedSouls;
    /// @dev might not be needed since record and association is present in hasOrIsPromised;

    /// @notice registers asset bearing token
    mapping(uint256 => Asset) assetToken;

    /*//////////////////////////////////////////////////////////////
                        Constructor
    //////////////////////////////////////////////////////////////*/

    constructor() {
        AAVE = address(bytes20("placeholder"));
        globalID = 11;
        _caveatInit();
        deployer = msg.sender;
    }

    /*//////////////////////////////////////////////////////////////
                        Errors
    //////////////////////////////////////////////////////////////*/

    error Blasphemy();
    error UnpassableBuck();
    error SoullessMachine();
    error Unreachable();

    /*//////////////////////////////////////////////////////////////
                        Events
    //////////////////////////////////////////////////////////////*/

    event IDincremented();
    event NewSoulAcquired(address indexed who, uint256 indexed soulID);
    event BurdenTransfer(uint256 indexed claim, uint256 indexed destinationSoul);
    event AssetTokenCreated(address contractAsset, uint256 quantity, address assetOwner);
    event MintedPromise(address indebted, address honored, uint256 tokenID);
    event BrokenPromise(uint256 pID);
    event KeptPromise(uint256 pID);

    /*//////////////////////////////////////////////////////////////
                        Modifiers
    //////////////////////////////////////////////////////////////*/

    /// @notice modifier checks the sender has
    modifier isSoul() {
        require(getSoulID(msg.sender) != 0, "unreppenting soul");
        _;
    }

    /*//////////////////////////////////////////////////////////////
                        Public
    //////////////////////////////////////////////////////////////*/

    /// @notice permantently registers sender as indebtness capable soul
    function mintSoul() public returns (uint256) {
        if (!_isEOA()) {
            revert SoullessMachine();
            /// @dev contracts might have souls. don't know yet.
        }
        require(hasOrIsPromised[msg.sender].length == 0 || hasOrIsPromised[msg.sender][0] == 0, "already owned");
        _incrementID();
        if (globalID % 2 == 0) {
            _incrementID();
        }
        _mint(msg.sender, globalID);
        hasOrIsPromised[msg.sender][0] == globalID;

        emit NewSoulAcquired(msg.sender, globalID);
        return globalID;
    }

    /*//////////////////////////////////////////////////////////////
                        External
    //////////////////////////////////////////////////////////////*/

    /// @notice wraps any ERC20 or ERC721 assets in a Promise Monster ERC721 token
    /// @param contract_ address of the token contract
    /// @param howmuch_ quantity of ERC20 or ERC721 token ID
    function makeAsset(address contract_, uint8 assetType, uint256 howmuch_, address to_) external returns (bool s) {
        globalID = incrementIDAsset();
        ///@dev noticed potential promise/2 and asset/10 id override. untested

        if (to_ == address(0)) {
            to_ = _msgSender();
        }
        assetToken[globalID].tokenAddress = contract_;
        assetToken[globalID].assetType = assetType;
        assetToken[globalID].howMuch = howmuch_;

        uint256 balance;

        if (assetType == 1) {
            balance = IERC20(contract_).balanceOf(address(this));
            s = IERC20(contract_).transferFrom(_msgSender(), address(this), howmuch_);
            /// how much ERC20
            if (s) {
                s = (balance + howmuch_ <= IERC20(contract_).balanceOf(address(this)));
            }
        }
        if (assetType == 2) {
            balance = IERC721(contract_).balanceOf(address(this));
            IERC721(contract_).transferFrom(_msgSender(), address(this), howmuch_);
            /// tokenID ERC721
            s = (balance < IERC721(contract_).balanceOf(address(this)));
        }
        require(s, "Failed to register asset");
        _mint(to_, globalID);

        emit AssetTokenCreated(contract_, howmuch_, to_);
    }

    /// @notice burns asset token, transfers underlying to specified address or sender
    /// @param assetID_: ID of token
    /// @param to_: address to transfer the underlying to. if 0x0 new ower will be _msgSender();
    function burnAsset(uint256 assetID_, address to_) external returns (bool s) {
        require(ownerOf(assetID_) == msg.sender || msg.sender == address(this), "Unauthorized");

        if (to_ == address(0)) {
            to_ = _msgSender();
        }
        Asset memory A = assetToken[assetID_];
        if (A.assetType == 1) {
            s = IERC20(A.tokenAddress).transfer(to_, A.howMuch);
        }
        if (!s) {
            IERC721(A.tokenAddress).transferFrom(address(this), to_, A.howMuch);
            s = IERC721(A.tokenAddress).ownerOf(A.howMuch) != address(this);
        }
        require(s, "Failed to Burn Asset");
        delete assetToken[assetID_];
        _burn(assetID_);
    }

    // function mintPromisedView(address logicContract, bytes calldata call_) external returns (bool s) {
    //     require(address(logicContract).code.length > 1, 'Not a contract');
    //     (s,) = logicContract.call(call_);
    // }

    /// @notice mints promise
    /// @param to_: who is being promised
    /// @param delegation_: what is being delegated / promised
    function mintPromise(
        SignedDelegation memory delegation_,
        address to_,
        bytes memory callData_,
        uint256[2] memory times_
    )
        external
        isSoul
        returns (uint256 pID)
    {
        address liable = verifyDelegationSignature(delegation_);
        require(to_ == delegation_.delegation.delegate, "to_ is not delegated");
        require(msg.sender == liable, "not your signed delegation");
        require(!caveat[bytes4(callData_)], "unreachable function");
        //// @dev ?promise resubmission check

        Promise memory newP;

        newP.state = Standing.Created;
        newP.liableID = getSoulID(liable);
        newP.claimOwner = to_;
        newP.delegation = delegation_;
        newP.callData = callData_;
        newP.times = times_;

        pID = _incrementID();
        if (pID % 10 == 0) {
            pID += 1;
        }
        if (pID % 2 != 0) {
            pID += 1;
        }
        /// @dev
        globalID = pID;

        if (hasOrIsPromised[to_].length == 0) {
            hasOrIsPromised[to_].push(0);
        }
        hasOrIsPromised[liable].push(pID);

        getPromise[pID] = newP;

        _mint(to_, pID);

        emit MintedPromise(msg.sender, to_, pID);
    }

    /// @notice executes a promise. sender needs to be the claim owner or delegated
    /// @param promiseID: identifier of promise to execute
    function executePromise(uint256 promiseID) external returns (bool s) {
        Promise memory P;
        P = getPromise[promiseID];

        require(P.state == Standing.Created);
        if (P.times[0] > block.timestamp) {
            revert("soon");
        }
        require(msg.sender == P.claimOwner || msg.sender == P.delegation.delegation.delegate, "Not promised to you");
        if (P.times[1] < block.timestamp) {
            P.state = Standing.Expired;
            return false;
        }

        delete getPromise[promiseID].delegation;

        (s,) = address(this).call(P.callData);
        if (s) {
            P.state = Standing.Honored;
            emit KeptPromise(promiseID);
        } else {
            P.state = Standing.Broken;
            revert("FFF");
            emit BrokenPromise(promiseID);
        }

        _tricklePromiseEndState(promiseID);
        _burn(promiseID);

        /// @dev sufficient replay protection ?
    }

    /*//////////////////////////////////////////////////////////////
                        private
    //////////////////////////////////////////////////////////////*/

    /// @notice increments global ID
    function _incrementID() private returns (uint256) {
        unchecked {
            ++globalID;
        }
        emit IDincremented();
        return globalID;
    }

    function incrementIDAsset() private returns (uint256 gid_) {
        gid_ = globalID + (10 - (globalID % 10));
    }
    //// @notice checks if sender is EOA

    function _isEOA() private view returns (bool) {
        return (msg.sender == tx.origin);
    }

    /// @notice trickles promise state if liability transfered. @dev might lead to duplicates
    function _tricklePromiseEndState(uint256 promiseID_) private {
        uint256 i;
        for (; i < chainedSouls[promiseID_].length;) {
            hasOrIsPromised[chainedSouls[promiseID_][i]].push(promiseID_);
            unchecked {
                ++i;
            }
        }
    }

    /*//////////////////////////////////////////////////////////////
                         View
    //////////////////////////////////////////////////////////////*/

    function getSoulID(address eoa_) public view returns (uint256 id) {
        id = hasOrIsPromised[eoa_].length == 0 ? 0 : hasOrIsPromised[eoa_][0];
    }

    function getPromiseByID(uint256 id_) public view returns (Promise memory P) {
        P = getPromise[id_];
    }

    function getAssetsOf(address who_) public view returns (Asset[] memory X) {
        uint256[] memory pids = hasOrIsPromised[who_];
        Asset[] memory A = new Asset[](pids.length);
        /// @dev
        uint256 i;
        uint256 c;
        for (; i < pids.length;) {
            if (pids[i] % 10 == 0 && ownerOf(pids[i]) == who_) {
                A[i] = assetToken[pids[i]];
                unchecked {
                    ++c;
                }
                pids[i] = 0;
            }
            unchecked {
                ++i;
            }
        }

        X = new Asset[](c);
        for (; i < pids.length;) {
            if (pids[i] != 0) {
                X[c] = (assetToken[i]);
                unchecked {
                    --c;
                }
            }
            unchecked {
                --i;
            }
        }
    }

    function getAssetByID(uint256 id_) external view returns (Asset memory A) {
        A = assetToken[id_];
    }

    function getPIDS(address ofWho_) external view returns (uint256[] memory) {
        return hasOrIsPromised[ofWho_];
    }

    function getPromiseHistory(address who_) public view returns (Promise[] memory) {
        uint256 x = hasOrIsPromised[who_].length;

        Promise[] memory P;
        if (x < 2) {
            return P;
        }
        P = new Promise[](x);
        uint256 i = 1;
        for (; i < x;) {
            if (hasOrIsPromised[who_][i] == 0) {
                continue;
            }
            P[i] = getPromiseByID(hasOrIsPromised[who_][i]);
            unchecked {
                ++i;
            }
        }
        return P;
    }

    /// @notice  returns two arrays of Promises (liabilities, assets)
    /// @param who_: for  what address to return associated promises
    function getLiabilitiesAssetsFor(address who_) external view returns (Promise[] memory Pl, Promise[] memory Pa) {
        Pl = getPromiseHistory(who_);
        uint256 len = Pl.length;
        Pa = new  Promise[](len);
        uint256 i;
        for (; i < len;) {
            if (Pl[i].claimOwner == who_) {
                Pa[i] = Pl[i];
                delete Pl[i];
            }
            unchecked {
                ++i;
            }
        }
        return (Pl, Pa);
    }

    function getSoulRecord() public view {}

    /*//////////////////////////////////////////////////////////////
                        Override
    //////////////////////////////////////////////////////////////*/

    function _beforeTokenTransfer(address from, address to, uint256 tokenId) internal virtual override {
        if (tokenId % 10 == 0) {
            return;
        } // token is asset

        if (from == address(0)) {
            hasOrIsPromised[msg.sender].push(tokenId);
            return;
        }
        if (tokenId % 2 == 0) {
            /// not soulbound
            /// liability transfer possible only through pull pattern

            if (getSoulID(msg.sender) == getPromise[tokenId].liableID) {
                revert UnpassableBuck();
            }

            if (getPromise[tokenId].claimOwner == msg.sender) {
                getPromise[tokenId].claimOwner = to;
                return;
            }
            /// mints soul if none
            /// @dev @note contract might gain soul
            uint256 toSoul = getSoulID(to) == 0 ? mintSoul() : getSoulID(to);
            /// liable for promise
            getPromise[tokenId].liableID = globalID;
            /// shared moral responsibility
            chainedSouls[tokenId].push(msg.sender);
            /// @dev potential trickle state duplication
            /// add claimed burden to soul
            hasOrIsPromised[msg.sender].push(tokenId);

            emit BurdenTransfer(tokenId, toSoul);
        } else {
            /// soulbound
            revert Blasphemy();
        }
    }

    /*//////////////////////////////////////////////////////////////
                        Misc
    //////////////////////////////////////////////////////////////*/

    function _msgSender() internal view override (Context, DelegatableCore) returns (address sender) {
        if (msg.sender == address(this)) {
            bytes memory array = msg.data;
            uint256 index = msg.data.length;
            assembly {
                // Load the 32 bytes word from memory with the address on the lower 20 bytes, and mask those.
                sender := and(mload(add(array, index)), 0xffffffffffffffffffffffffffffffffffffffff)
            }
            if (caveat[bytes4(msg.data[0:4])]) {
                revert Unreachable();
            }
        } else {
            sender = msg.sender;
        }

        return sender;
    }

    function _caveatInit() private {
        caveat[this.mintSoul.selector] = true;
        caveat[this.mintPromise.selector] = true;
        caveat[this.getSoulID.selector] = true;
        caveat[this.getPromiseHistory.selector] = true;
        caveat[this.getSoulRecord.selector] = true;
        caveat[this.mintSoul.selector] = true;
        caveat[this.approve.selector] = true;
        caveat[this.setApprovalForAll.selector] = true;
        caveat[this.transferFrom.selector] = true;
        ///
        caveat[0x42842e0e] = true;
        caveat[0xb88d4fde] = true;
    }

    /*//////////////////////////////////////////////////////////////
                        Only deployer
    //////////////////////////////////////////////////////////////*/

    /// @notice adds, removes or flips caveats
    /// @param sig: 4 byte signature of function to allow/dissalow list
    function flipCaveat(bytes4 sig) external returns (bool) {
        require(msg.sender == deployer);
        caveat[sig] = !caveat[sig];
        return caveat[sig];
    }
}
