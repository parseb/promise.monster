

 const getPMAddress =  {
    1: "",
    5: "0xd3AB598CA12D50B36a786286c04aEd4E49434E48",
    10:"",
    420:"sdfsdfs",
    80001: "0x5F5A0FD112e9307209751094912BD7C689CEdeEe"
  }


 const PMabi =  [
{
"inputs": [],
"stateMutability": "nonpayable",
"type": "constructor"
},
{
"inputs": [],
"name": "Blasphemy",
"type": "error"
},
{
"inputs": [],
"name": "SoullessMachine",
"type": "error"
},
{
"inputs": [],
"name": "UnpassableBuck",
"type": "error"
},
{
"inputs": [],
"name": "Unreachable",
"type": "error"
},
{
"anonymous": false,
"inputs": [
  {
    "indexed": true,
    "internalType": "address",
    "name": "owner",
    "type": "address"
  },
  {
    "indexed": true,
    "internalType": "address",
    "name": "approved",
    "type": "address"
  },
  {
    "indexed": true,
    "internalType": "uint256",
    "name": "tokenId",
    "type": "uint256"
  }
],
"name": "Approval",
"type": "event"
},
{
"anonymous": false,
"inputs": [
  {
    "indexed": true,
    "internalType": "address",
    "name": "owner",
    "type": "address"
  },
  {
    "indexed": true,
    "internalType": "address",
    "name": "operator",
    "type": "address"
  },
  {
    "indexed": false,
    "internalType": "bool",
    "name": "approved",
    "type": "bool"
  }
],
"name": "ApprovalForAll",
"type": "event"
},
{
"anonymous": false,
"inputs": [
  {
    "indexed": false,
    "internalType": "address",
    "name": "contractAsset",
    "type": "address"
  },
  {
    "indexed": false,
    "internalType": "uint256",
    "name": "quantity",
    "type": "uint256"
  },
  {
    "indexed": false,
    "internalType": "address",
    "name": "assetOwner",
    "type": "address"
  }
],
"name": "AssetTokenCreated",
"type": "event"
},
{
"anonymous": false,
"inputs": [
  {
    "indexed": false,
    "internalType": "uint256",
    "name": "pID",
    "type": "uint256"
  }
],
"name": "BrokenPromise",
"type": "event"
},
{
"anonymous": false,
"inputs": [
  {
    "indexed": true,
    "internalType": "uint256",
    "name": "claim",
    "type": "uint256"
  },
  {
    "indexed": true,
    "internalType": "uint256",
    "name": "destinationSoul",
    "type": "uint256"
  }
],
"name": "BurdenTransfer",
"type": "event"
},
{
"anonymous": false,
"inputs": [],
"name": "IDincremented",
"type": "event"
},
{
"anonymous": false,
"inputs": [
  {
    "indexed": false,
    "internalType": "uint256",
    "name": "pID",
    "type": "uint256"
  }
],
"name": "KeptPromise",
"type": "event"
},
{
"anonymous": false,
"inputs": [
  {
    "indexed": false,
    "internalType": "address",
    "name": "indebted",
    "type": "address"
  },
  {
    "indexed": false,
    "internalType": "address",
    "name": "honored",
    "type": "address"
  },
  {
    "indexed": false,
    "internalType": "uint256",
    "name": "tokenID",
    "type": "uint256"
  }
],
"name": "MintedPromise",
"type": "event"
},
{
"anonymous": false,
"inputs": [
  {
    "indexed": true,
    "internalType": "address",
    "name": "who",
    "type": "address"
  },
  {
    "indexed": true,
    "internalType": "uint256",
    "name": "soulID",
    "type": "uint256"
  }
],
"name": "NewSoulAcquired",
"type": "event"
},
{
"anonymous": false,
"inputs": [
  {
    "indexed": true,
    "internalType": "address",
    "name": "from",
    "type": "address"
  },
  {
    "indexed": true,
    "internalType": "address",
    "name": "to",
    "type": "address"
  },
  {
    "indexed": true,
    "internalType": "uint256",
    "name": "tokenId",
    "type": "uint256"
  }
],
"name": "Transfer",
"type": "event"
},
{
"inputs": [],
"name": "AAVE",
"outputs": [
  {
    "internalType": "address",
    "name": "",
    "type": "address"
  }
],
"stateMutability": "view",
"type": "function"
},
{
"inputs": [
  {
    "components": [
      {
        "internalType": "address",
        "name": "delegate",
        "type": "address"
      },
      {
        "internalType": "bytes32",
        "name": "authority",
        "type": "bytes32"
      }
    ],
    "internalType": "struct Delegation",
    "name": "_input",
    "type": "tuple"
  }
],
"name": "GET_DELEGATION_PACKETHASH",
"outputs": [
  {
    "internalType": "bytes32",
    "name": "",
    "type": "bytes32"
  }
],
"stateMutability": "pure",
"type": "function"
},
{
"inputs": [
  {
    "components": [
      {
        "components": [
          {
            "components": [
              {
                "internalType": "address",
                "name": "to",
                "type": "address"
              },
              {
                "internalType": "uint256",
                "name": "gasLimit",
                "type": "uint256"
              },
              {
                "internalType": "bytes",
                "name": "data",
                "type": "bytes"
              }
            ],
            "internalType": "struct Transaction",
            "name": "transaction",
            "type": "tuple"
          },
          {
            "components": [
              {
                "components": [
                  {
                    "internalType": "address",
                    "name": "delegate",
                    "type": "address"
                  },
                  {
                    "internalType": "bytes32",
                    "name": "authority",
                    "type": "bytes32"
                  }
                ],
                "internalType": "struct Delegation",
                "name": "delegation",
                "type": "tuple"
              },
              {
                "internalType": "bytes",
                "name": "signature",
                "type": "bytes"
              }
            ],
            "internalType": "struct SignedDelegation[]",
            "name": "authority",
            "type": "tuple[]"
          }
        ],
        "internalType": "struct Invocation[]",
        "name": "batch",
        "type": "tuple[]"
      },
      {
        "components": [
          {
            "internalType": "uint256",
            "name": "nonce",
            "type": "uint256"
          },
          {
            "internalType": "uint256",
            "name": "queue",
            "type": "uint256"
          }
        ],
        "internalType": "struct ReplayProtection",
        "name": "replayProtection",
        "type": "tuple"
      }
    ],
    "internalType": "struct Invocations",
    "name": "_input",
    "type": "tuple"
  }
],
"name": "GET_INVOCATIONS_PACKETHASH",
"outputs": [
  {
    "internalType": "bytes32",
    "name": "",
    "type": "bytes32"
  }
],
"stateMutability": "pure",
"type": "function"
},
{
"inputs": [
  {
    "components": [
      {
        "components": [
          {
            "internalType": "address",
            "name": "to",
            "type": "address"
          },
          {
            "internalType": "uint256",
            "name": "gasLimit",
            "type": "uint256"
          },
          {
            "internalType": "bytes",
            "name": "data",
            "type": "bytes"
          }
        ],
        "internalType": "struct Transaction",
        "name": "transaction",
        "type": "tuple"
      },
      {
        "components": [
          {
            "components": [
              {
                "internalType": "address",
                "name": "delegate",
                "type": "address"
              },
              {
                "internalType": "bytes32",
                "name": "authority",
                "type": "bytes32"
              }
            ],
            "internalType": "struct Delegation",
            "name": "delegation",
            "type": "tuple"
          },
          {
            "internalType": "bytes",
            "name": "signature",
            "type": "bytes"
          }
        ],
        "internalType": "struct SignedDelegation[]",
        "name": "authority",
        "type": "tuple[]"
      }
    ],
    "internalType": "struct Invocation[]",
    "name": "_input",
    "type": "tuple[]"
  }
],
"name": "GET_INVOCATION_ARRAY_PACKETHASH",
"outputs": [
  {
    "internalType": "bytes32",
    "name": "",
    "type": "bytes32"
  }
],
"stateMutability": "pure",
"type": "function"
},
{
"inputs": [
  {
    "components": [
      {
        "components": [
          {
            "internalType": "address",
            "name": "to",
            "type": "address"
          },
          {
            "internalType": "uint256",
            "name": "gasLimit",
            "type": "uint256"
          },
          {
            "internalType": "bytes",
            "name": "data",
            "type": "bytes"
          }
        ],
        "internalType": "struct Transaction",
        "name": "transaction",
        "type": "tuple"
      },
      {
        "components": [
          {
            "components": [
              {
                "internalType": "address",
                "name": "delegate",
                "type": "address"
              },
              {
                "internalType": "bytes32",
                "name": "authority",
                "type": "bytes32"
              }
            ],
            "internalType": "struct Delegation",
            "name": "delegation",
            "type": "tuple"
          },
          {
            "internalType": "bytes",
            "name": "signature",
            "type": "bytes"
          }
        ],
        "internalType": "struct SignedDelegation[]",
        "name": "authority",
        "type": "tuple[]"
      }
    ],
    "internalType": "struct Invocation",
    "name": "_input",
    "type": "tuple"
  }
],
"name": "GET_INVOCATION_PACKETHASH",
"outputs": [
  {
    "internalType": "bytes32",
    "name": "",
    "type": "bytes32"
  }
],
"stateMutability": "pure",
"type": "function"
},
{
"inputs": [
  {
    "components": [
      {
        "internalType": "uint256",
        "name": "nonce",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "queue",
        "type": "uint256"
      }
    ],
    "internalType": "struct ReplayProtection",
    "name": "_input",
    "type": "tuple"
  }
],
"name": "GET_REPLAYPROTECTION_PACKETHASH",
"outputs": [
  {
    "internalType": "bytes32",
    "name": "",
    "type": "bytes32"
  }
],
"stateMutability": "pure",
"type": "function"
},
{
"inputs": [
  {
    "components": [
      {
        "components": [
          {
            "internalType": "address",
            "name": "delegate",
            "type": "address"
          },
          {
            "internalType": "bytes32",
            "name": "authority",
            "type": "bytes32"
          }
        ],
        "internalType": "struct Delegation",
        "name": "delegation",
        "type": "tuple"
      },
      {
        "internalType": "bytes",
        "name": "signature",
        "type": "bytes"
      }
    ],
    "internalType": "struct SignedDelegation[]",
    "name": "_input",
    "type": "tuple[]"
  }
],
"name": "GET_SIGNEDDELEGATION_ARRAY_PACKETHASH",
"outputs": [
  {
    "internalType": "bytes32",
    "name": "",
    "type": "bytes32"
  }
],
"stateMutability": "pure",
"type": "function"
},
{
"inputs": [
  {
    "components": [
      {
        "components": [
          {
            "internalType": "address",
            "name": "delegate",
            "type": "address"
          },
          {
            "internalType": "bytes32",
            "name": "authority",
            "type": "bytes32"
          }
        ],
        "internalType": "struct Delegation",
        "name": "delegation",
        "type": "tuple"
      },
      {
        "internalType": "bytes",
        "name": "signature",
        "type": "bytes"
      }
    ],
    "internalType": "struct SignedDelegation",
    "name": "_input",
    "type": "tuple"
  }
],
"name": "GET_SIGNEDDELEGATION_PACKETHASH",
"outputs": [
  {
    "internalType": "bytes32",
    "name": "",
    "type": "bytes32"
  }
],
"stateMutability": "pure",
"type": "function"
},
{
"inputs": [
  {
    "components": [
      {
        "internalType": "address",
        "name": "to",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "gasLimit",
        "type": "uint256"
      },
      {
        "internalType": "bytes",
        "name": "data",
        "type": "bytes"
      }
    ],
    "internalType": "struct Transaction",
    "name": "_input",
    "type": "tuple"
  }
],
"name": "GET_TRANSACTION_PACKETHASH",
"outputs": [
  {
    "internalType": "bytes32",
    "name": "",
    "type": "bytes32"
  }
],
"stateMutability": "pure",
"type": "function"
},
{
"inputs": [
  {
    "internalType": "address",
    "name": "to",
    "type": "address"
  },
  {
    "internalType": "uint256",
    "name": "tokenId",
    "type": "uint256"
  }
],
"name": "approve",
"outputs": [],
"stateMutability": "nonpayable",
"type": "function"
},
{
"inputs": [
  {
    "internalType": "address",
    "name": "owner",
    "type": "address"
  }
],
"name": "balanceOf",
"outputs": [
  {
    "internalType": "uint256",
    "name": "",
    "type": "uint256"
  }
],
"stateMutability": "view",
"type": "function"
},
{
"inputs": [
  {
    "internalType": "uint256",
    "name": "assetID_",
    "type": "uint256"
  },
  {
    "internalType": "address",
    "name": "to_",
    "type": "address"
  }
],
"name": "burnAsset",
"outputs": [
  {
    "internalType": "bool",
    "name": "s",
    "type": "bool"
  }
],
"stateMutability": "nonpayable",
"type": "function"
},
{
"inputs": [
  {
    "components": [
      {
        "components": [
          {
            "internalType": "address",
            "name": "to",
            "type": "address"
          },
          {
            "internalType": "uint256",
            "name": "gasLimit",
            "type": "uint256"
          },
          {
            "internalType": "bytes",
            "name": "data",
            "type": "bytes"
          }
        ],
        "internalType": "struct Transaction",
        "name": "transaction",
        "type": "tuple"
      },
      {
        "components": [
          {
            "components": [
              {
                "internalType": "address",
                "name": "delegate",
                "type": "address"
              },
              {
                "internalType": "bytes32",
                "name": "authority",
                "type": "bytes32"
              }
            ],
            "internalType": "struct Delegation",
            "name": "delegation",
            "type": "tuple"
          },
          {
            "internalType": "bytes",
            "name": "signature",
            "type": "bytes"
          }
        ],
        "internalType": "struct SignedDelegation[]",
        "name": "authority",
        "type": "tuple[]"
      }
    ],
    "internalType": "struct Invocation[]",
    "name": "batch",
    "type": "tuple[]"
  }
],
"name": "contractInvoke",
"outputs": [
  {
    "internalType": "bool",
    "name": "",
    "type": "bool"
  }
],
"stateMutability": "nonpayable",
"type": "function"
},
{
"inputs": [],
"name": "domainHash",
"outputs": [
  {
    "internalType": "bytes32",
    "name": "",
    "type": "bytes32"
  }
],
"stateMutability": "view",
"type": "function"
},
{
"inputs": [
  {
    "internalType": "uint256",
    "name": "promiseID",
    "type": "uint256"
  }
],
"name": "executePromise",
"outputs": [
  {
    "internalType": "bool",
    "name": "s",
    "type": "bool"
  }
],
"stateMutability": "nonpayable",
"type": "function"
},
{
"inputs": [
  {
    "internalType": "bytes4",
    "name": "sig",
    "type": "bytes4"
  }
],
"name": "flipCaveat",
"outputs": [
  {
    "internalType": "bool",
    "name": "",
    "type": "bool"
  }
],
"stateMutability": "nonpayable",
"type": "function"
},
{
"inputs": [
  {
    "internalType": "uint256",
    "name": "tokenId",
    "type": "uint256"
  }
],
"name": "getApproved",
"outputs": [
  {
    "internalType": "address",
    "name": "",
    "type": "address"
  }
],
"stateMutability": "view",
"type": "function"
},
{
"inputs": [
  {
    "internalType": "uint256",
    "name": "id_",
    "type": "uint256"
  }
],
"name": "getAssetByID",
"outputs": [
  {
    "components": [
      {
        "internalType": "uint256",
        "name": "howMuch",
        "type": "uint256"
      },
      {
        "internalType": "address",
        "name": "tokenAddress",
        "type": "address"
      },
      {
        "internalType": "uint8",
        "name": "assetType",
        "type": "uint8"
      }
    ],
    "internalType": "struct Asset",
    "name": "A",
    "type": "tuple"
  }
],
"stateMutability": "view",
"type": "function"
},
{
"inputs": [
  {
    "components": [
      {
        "internalType": "address",
        "name": "delegate",
        "type": "address"
      },
      {
        "internalType": "bytes32",
        "name": "authority",
        "type": "bytes32"
      }
    ],
    "internalType": "struct Delegation",
    "name": "delegation",
    "type": "tuple"
  }
],
"name": "getDelegationTypedDataHash",
"outputs": [
  {
    "internalType": "bytes32",
    "name": "",
    "type": "bytes32"
  }
],
"stateMutability": "view",
"type": "function"
},
{
"inputs": [
  {
    "internalType": "string",
    "name": "contractName",
    "type": "string"
  },
  {
    "internalType": "string",
    "name": "version",
    "type": "string"
  },
  {
    "internalType": "uint256",
    "name": "chainId",
    "type": "uint256"
  },
  {
    "internalType": "address",
    "name": "verifyingContract",
    "type": "address"
  }
],
"name": "getEIP712DomainHash",
"outputs": [
  {
    "internalType": "bytes32",
    "name": "",
    "type": "bytes32"
  }
],
"stateMutability": "pure",
"type": "function"
},
{
"inputs": [
  {
    "components": [
      {
        "components": [
          {
            "components": [
              {
                "internalType": "address",
                "name": "to",
                "type": "address"
              },
              {
                "internalType": "uint256",
                "name": "gasLimit",
                "type": "uint256"
              },
              {
                "internalType": "bytes",
                "name": "data",
                "type": "bytes"
              }
            ],
            "internalType": "struct Transaction",
            "name": "transaction",
            "type": "tuple"
          },
          {
            "components": [
              {
                "components": [
                  {
                    "internalType": "address",
                    "name": "delegate",
                    "type": "address"
                  },
                  {
                    "internalType": "bytes32",
                    "name": "authority",
                    "type": "bytes32"
                  }
                ],
                "internalType": "struct Delegation",
                "name": "delegation",
                "type": "tuple"
              },
              {
                "internalType": "bytes",
                "name": "signature",
                "type": "bytes"
              }
            ],
            "internalType": "struct SignedDelegation[]",
            "name": "authority",
            "type": "tuple[]"
          }
        ],
        "internalType": "struct Invocation[]",
        "name": "batch",
        "type": "tuple[]"
      },
      {
        "components": [
          {
            "internalType": "uint256",
            "name": "nonce",
            "type": "uint256"
          },
          {
            "internalType": "uint256",
            "name": "queue",
            "type": "uint256"
          }
        ],
        "internalType": "struct ReplayProtection",
        "name": "replayProtection",
        "type": "tuple"
      }
    ],
    "internalType": "struct Invocations",
    "name": "invocations",
    "type": "tuple"
  }
],
"name": "getInvocationsTypedDataHash",
"outputs": [
  {
    "internalType": "bytes32",
    "name": "",
    "type": "bytes32"
  }
],
"stateMutability": "view",
"type": "function"
},
{
"inputs": [
  {
    "internalType": "address",
    "name": "who_",
    "type": "address"
  }
],
"name": "getLiabilitiesAssetsFor",
"outputs": [
  {
    "components": [
      {
        "internalType": "enum Standing",
        "name": "state",
        "type": "uint8"
      },
      {
        "internalType": "uint256",
        "name": "liableID",
        "type": "uint256"
      },
      {
        "internalType": "address",
        "name": "claimOwner",
        "type": "address"
      },
      {
        "internalType": "uint256[2]",
        "name": "times",
        "type": "uint256[2]"
      },
      {
        "components": [
          {
            "components": [
              {
                "internalType": "address",
                "name": "delegate",
                "type": "address"
              },
              {
                "internalType": "bytes32",
                "name": "authority",
                "type": "bytes32"
              }
            ],
            "internalType": "struct Delegation",
            "name": "delegation",
            "type": "tuple"
          },
          {
            "internalType": "bytes",
            "name": "signature",
            "type": "bytes"
          }
        ],
        "internalType": "struct SignedDelegation",
        "name": "delegation",
        "type": "tuple"
      },
      {
        "internalType": "bytes",
        "name": "callData",
        "type": "bytes"
      }
    ],
    "internalType": "struct Promise[]",
    "name": "Pl",
    "type": "tuple[]"
  },
  {
    "components": [
      {
        "internalType": "enum Standing",
        "name": "state",
        "type": "uint8"
      },
      {
        "internalType": "uint256",
        "name": "liableID",
        "type": "uint256"
      },
      {
        "internalType": "address",
        "name": "claimOwner",
        "type": "address"
      },
      {
        "internalType": "uint256[2]",
        "name": "times",
        "type": "uint256[2]"
      },
      {
        "components": [
          {
            "components": [
              {
                "internalType": "address",
                "name": "delegate",
                "type": "address"
              },
              {
                "internalType": "bytes32",
                "name": "authority",
                "type": "bytes32"
              }
            ],
            "internalType": "struct Delegation",
            "name": "delegation",
            "type": "tuple"
          },
          {
            "internalType": "bytes",
            "name": "signature",
            "type": "bytes"
          }
        ],
        "internalType": "struct SignedDelegation",
        "name": "delegation",
        "type": "tuple"
      },
      {
        "internalType": "bytes",
        "name": "callData",
        "type": "bytes"
      }
    ],
    "internalType": "struct Promise[]",
    "name": "Pa",
    "type": "tuple[]"
  }
],
"stateMutability": "view",
"type": "function"
},
{
"inputs": [
  {
    "internalType": "address",
    "name": "intendedSender",
    "type": "address"
  },
  {
    "internalType": "uint256",
    "name": "queue",
    "type": "uint256"
  }
],
"name": "getNonce",
"outputs": [
  {
    "internalType": "uint256",
    "name": "",
    "type": "uint256"
  }
],
"stateMutability": "view",
"type": "function"
},
{
"inputs": [
  {
    "internalType": "address",
    "name": "ofWho_",
    "type": "address"
  }
],
"name": "getPIDS",
"outputs": [
  {
    "internalType": "uint256[]",
    "name": "",
    "type": "uint256[]"
  }
],
"stateMutability": "view",
"type": "function"
},
{
"inputs": [
  {
    "internalType": "uint256",
    "name": "id_",
    "type": "uint256"
  }
],
"name": "getPromiseByID",
"outputs": [
  {
    "components": [
      {
        "internalType": "enum Standing",
        "name": "state",
        "type": "uint8"
      },
      {
        "internalType": "uint256",
        "name": "liableID",
        "type": "uint256"
      },
      {
        "internalType": "address",
        "name": "claimOwner",
        "type": "address"
      },
      {
        "internalType": "uint256[2]",
        "name": "times",
        "type": "uint256[2]"
      },
      {
        "components": [
          {
            "components": [
              {
                "internalType": "address",
                "name": "delegate",
                "type": "address"
              },
              {
                "internalType": "bytes32",
                "name": "authority",
                "type": "bytes32"
              }
            ],
            "internalType": "struct Delegation",
            "name": "delegation",
            "type": "tuple"
          },
          {
            "internalType": "bytes",
            "name": "signature",
            "type": "bytes"
          }
        ],
        "internalType": "struct SignedDelegation",
        "name": "delegation",
        "type": "tuple"
      },
      {
        "internalType": "bytes",
        "name": "callData",
        "type": "bytes"
      }
    ],
    "internalType": "struct Promise",
    "name": "P",
    "type": "tuple"
  }
],
"stateMutability": "view",
"type": "function"
},
{
"inputs": [
  {
    "internalType": "address",
    "name": "who_",
    "type": "address"
  }
],
"name": "getPromiseHistory",
"outputs": [
  {
    "components": [
      {
        "internalType": "enum Standing",
        "name": "state",
        "type": "uint8"
      },
      {
        "internalType": "uint256",
        "name": "liableID",
        "type": "uint256"
      },
      {
        "internalType": "address",
        "name": "claimOwner",
        "type": "address"
      },
      {
        "internalType": "uint256[2]",
        "name": "times",
        "type": "uint256[2]"
      },
      {
        "components": [
          {
            "components": [
              {
                "internalType": "address",
                "name": "delegate",
                "type": "address"
              },
              {
                "internalType": "bytes32",
                "name": "authority",
                "type": "bytes32"
              }
            ],
            "internalType": "struct Delegation",
            "name": "delegation",
            "type": "tuple"
          },
          {
            "internalType": "bytes",
            "name": "signature",
            "type": "bytes"
          }
        ],
        "internalType": "struct SignedDelegation",
        "name": "delegation",
        "type": "tuple"
      },
      {
        "internalType": "bytes",
        "name": "callData",
        "type": "bytes"
      }
    ],
    "internalType": "struct Promise[]",
    "name": "",
    "type": "tuple[]"
  }
],
"stateMutability": "view",
"type": "function"
},
{
"inputs": [
  {
    "internalType": "address",
    "name": "eoa_",
    "type": "address"
  }
],
"name": "getSoulID",
"outputs": [
  {
    "internalType": "uint256",
    "name": "id",
    "type": "uint256"
  }
],
"stateMutability": "view",
"type": "function"
},
{
"inputs": [],
"name": "getSoulRecord",
"outputs": [],
"stateMutability": "view",
"type": "function"
},
{
"inputs": [],
"name": "globalID",
"outputs": [
  {
    "internalType": "uint256",
    "name": "",
    "type": "uint256"
  }
],
"stateMutability": "view",
"type": "function"
},
{
"inputs": [
  {
    "internalType": "address",
    "name": "",
    "type": "address"
  },
  {
    "internalType": "uint256",
    "name": "",
    "type": "uint256"
  }
],
"name": "hasOrIsPromised",
"outputs": [
  {
    "internalType": "uint256",
    "name": "",
    "type": "uint256"
  }
],
"stateMutability": "view",
"type": "function"
},
{
"inputs": [
  {
    "components": [
      {
        "components": [
          {
            "components": [
              {
                "components": [
                  {
                    "internalType": "address",
                    "name": "to",
                    "type": "address"
                  },
                  {
                    "internalType": "uint256",
                    "name": "gasLimit",
                    "type": "uint256"
                  },
                  {
                    "internalType": "bytes",
                    "name": "data",
                    "type": "bytes"
                  }
                ],
                "internalType": "struct Transaction",
                "name": "transaction",
                "type": "tuple"
              },
              {
                "components": [
                  {
                    "components": [
                      {
                        "internalType": "address",
                        "name": "delegate",
                        "type": "address"
                      },
                      {
                        "internalType": "bytes32",
                        "name": "authority",
                        "type": "bytes32"
                      }
                    ],
                    "internalType": "struct Delegation",
                    "name": "delegation",
                    "type": "tuple"
                  },
                  {
                    "internalType": "bytes",
                    "name": "signature",
                    "type": "bytes"
                  }
                ],
                "internalType": "struct SignedDelegation[]",
                "name": "authority",
                "type": "tuple[]"
              }
            ],
            "internalType": "struct Invocation[]",
            "name": "batch",
            "type": "tuple[]"
          },
          {
            "components": [
              {
                "internalType": "uint256",
                "name": "nonce",
                "type": "uint256"
              },
              {
                "internalType": "uint256",
                "name": "queue",
                "type": "uint256"
              }
            ],
            "internalType": "struct ReplayProtection",
            "name": "replayProtection",
            "type": "tuple"
          }
        ],
        "internalType": "struct Invocations",
        "name": "invocations",
        "type": "tuple"
      },
      {
        "internalType": "bytes",
        "name": "signature",
        "type": "bytes"
      }
    ],
    "internalType": "struct SignedInvocation[]",
    "name": "signedInvocations",
    "type": "tuple[]"
  }
],
"name": "invoke",
"outputs": [
  {
    "internalType": "bool",
    "name": "success",
    "type": "bool"
  }
],
"stateMutability": "nonpayable",
"type": "function"
},
{
"inputs": [
  {
    "internalType": "address",
    "name": "owner",
    "type": "address"
  },
  {
    "internalType": "address",
    "name": "operator",
    "type": "address"
  }
],
"name": "isApprovedForAll",
"outputs": [
  {
    "internalType": "bool",
    "name": "",
    "type": "bool"
  }
],
"stateMutability": "view",
"type": "function"
},
{
"inputs": [
  {
    "internalType": "address",
    "name": "contract_",
    "type": "address"
  },
  {
    "internalType": "uint8",
    "name": "assetType",
    "type": "uint8"
  },
  {
    "internalType": "uint256",
    "name": "howmuch_",
    "type": "uint256"
  },
  {
    "internalType": "address",
    "name": "to_",
    "type": "address"
  }
],
"name": "makeAsset",
"outputs": [
  {
    "internalType": "bool",
    "name": "s",
    "type": "bool"
  }
],
"stateMutability": "nonpayable",
"type": "function"
},
{
"inputs": [
  {
    "components": [
      {
        "components": [
          {
            "internalType": "address",
            "name": "delegate",
            "type": "address"
          },
          {
            "internalType": "bytes32",
            "name": "authority",
            "type": "bytes32"
          }
        ],
        "internalType": "struct Delegation",
        "name": "delegation",
        "type": "tuple"
      },
      {
        "internalType": "bytes",
        "name": "signature",
        "type": "bytes"
      }
    ],
    "internalType": "struct SignedDelegation",
    "name": "delegation_",
    "type": "tuple"
  },
  {
    "internalType": "address",
    "name": "to_",
    "type": "address"
  },
  {
    "internalType": "bytes",
    "name": "callData_",
    "type": "bytes"
  },
  {
    "internalType": "uint256[2]",
    "name": "times_",
    "type": "uint256[2]"
  }
],
"name": "mintPromise",
"outputs": [
  {
    "internalType": "uint256",
    "name": "pID",
    "type": "uint256"
  }
],
"stateMutability": "nonpayable",
"type": "function"
},
{
"inputs": [],
"name": "mintSoul",
"outputs": [
  {
    "internalType": "uint256",
    "name": "",
    "type": "uint256"
  }
],
"stateMutability": "nonpayable",
"type": "function"
},
{
"inputs": [],
"name": "name",
"outputs": [
  {
    "internalType": "string",
    "name": "",
    "type": "string"
  }
],
"stateMutability": "view",
"type": "function"
},
{
"inputs": [
  {
    "internalType": "uint256",
    "name": "tokenId",
    "type": "uint256"
  }
],
"name": "ownerOf",
"outputs": [
  {
    "internalType": "address",
    "name": "",
    "type": "address"
  }
],
"stateMutability": "view",
"type": "function"
},
{
"inputs": [
  {
    "internalType": "address",
    "name": "from",
    "type": "address"
  },
  {
    "internalType": "address",
    "name": "to",
    "type": "address"
  },
  {
    "internalType": "uint256",
    "name": "tokenId",
    "type": "uint256"
  }
],
"name": "safeTransferFrom",
"outputs": [],
"stateMutability": "nonpayable",
"type": "function"
},
{
"inputs": [
  {
    "internalType": "address",
    "name": "from",
    "type": "address"
  },
  {
    "internalType": "address",
    "name": "to",
    "type": "address"
  },
  {
    "internalType": "uint256",
    "name": "tokenId",
    "type": "uint256"
  },
  {
    "internalType": "bytes",
    "name": "data",
    "type": "bytes"
  }
],
"name": "safeTransferFrom",
"outputs": [],
"stateMutability": "nonpayable",
"type": "function"
},
{
"inputs": [
  {
    "internalType": "address",
    "name": "operator",
    "type": "address"
  },
  {
    "internalType": "bool",
    "name": "approved",
    "type": "bool"
  }
],
"name": "setApprovalForAll",
"outputs": [],
"stateMutability": "nonpayable",
"type": "function"
},
{
"inputs": [
  {
    "internalType": "bytes4",
    "name": "interfaceId",
    "type": "bytes4"
  }
],
"name": "supportsInterface",
"outputs": [
  {
    "internalType": "bool",
    "name": "",
    "type": "bool"
  }
],
"stateMutability": "view",
"type": "function"
},
{
"inputs": [],
"name": "symbol",
"outputs": [
  {
    "internalType": "string",
    "name": "",
    "type": "string"
  }
],
"stateMutability": "view",
"type": "function"
},
{
"inputs": [
  {
    "internalType": "uint256",
    "name": "tokenId",
    "type": "uint256"
  }
],
"name": "tokenURI",
"outputs": [
  {
    "internalType": "string",
    "name": "",
    "type": "string"
  }
],
"stateMutability": "view",
"type": "function"
},
{
"inputs": [
  {
    "internalType": "address",
    "name": "from",
    "type": "address"
  },
  {
    "internalType": "address",
    "name": "to",
    "type": "address"
  },
  {
    "internalType": "uint256",
    "name": "tokenId",
    "type": "uint256"
  }
],
"name": "transferFrom",
"outputs": [],
"stateMutability": "nonpayable",
"type": "function"
},
{
"inputs": [
  {
    "components": [
      {
        "components": [
          {
            "internalType": "address",
            "name": "delegate",
            "type": "address"
          },
          {
            "internalType": "bytes32",
            "name": "authority",
            "type": "bytes32"
          }
        ],
        "internalType": "struct Delegation",
        "name": "delegation",
        "type": "tuple"
      },
      {
        "internalType": "bytes",
        "name": "signature",
        "type": "bytes"
      }
    ],
    "internalType": "struct SignedDelegation",
    "name": "signedDelegation",
    "type": "tuple"
  }
],
"name": "verifyDelegationSignature",
"outputs": [
  {
    "internalType": "address",
    "name": "",
    "type": "address"
  }
],
"stateMutability": "view",
"type": "function"
},
{
"inputs": [
  {
    "components": [
      {
        "components": [
          {
            "components": [
              {
                "components": [
                  {
                    "internalType": "address",
                    "name": "to",
                    "type": "address"
                  },
                  {
                    "internalType": "uint256",
                    "name": "gasLimit",
                    "type": "uint256"
                  },
                  {
                    "internalType": "bytes",
                    "name": "data",
                    "type": "bytes"
                  }
                ],
                "internalType": "struct Transaction",
                "name": "transaction",
                "type": "tuple"
              },
              {
                "components": [
                  {
                    "components": [
                      {
                        "internalType": "address",
                        "name": "delegate",
                        "type": "address"
                      },
                      {
                        "internalType": "bytes32",
                        "name": "authority",
                        "type": "bytes32"
                      }
                    ],
                    "internalType": "struct Delegation",
                    "name": "delegation",
                    "type": "tuple"
                  },
                  {
                    "internalType": "bytes",
                    "name": "signature",
                    "type": "bytes"
                  }
                ],
                "internalType": "struct SignedDelegation[]",
                "name": "authority",
                "type": "tuple[]"
              }
            ],
            "internalType": "struct Invocation[]",
            "name": "batch",
            "type": "tuple[]"
          },
          {
            "components": [
              {
                "internalType": "uint256",
                "name": "nonce",
                "type": "uint256"
              },
              {
                "internalType": "uint256",
                "name": "queue",
                "type": "uint256"
              }
            ],
            "internalType": "struct ReplayProtection",
            "name": "replayProtection",
            "type": "tuple"
          }
        ],
        "internalType": "struct Invocations",
        "name": "invocations",
        "type": "tuple"
      },
      {
        "internalType": "bytes",
        "name": "signature",
        "type": "bytes"
      }
    ],
    "internalType": "struct SignedInvocation",
    "name": "signedInvocation",
    "type": "tuple"
  }
],
"name": "verifyInvocationSignature",
"outputs": [
  {
    "internalType": "address",
    "name": "",
    "type": "address"
  }
],
"stateMutability": "view",
"type": "function"
}
];

