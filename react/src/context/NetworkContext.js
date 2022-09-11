

export const getPMAddress = async (web3) => {
    const chainID = await web3.provider.chainId;
    const chainAddresses = {
        1: {},

        10:{
            PMaddress: ""
        },
        80001: {
            PMaddress: "",
        },
        420:{
            name : "optimism-goerli",
            PMaddress: "sdfsdfs"
        },
        42161: {},
        136: {}
      }

      return chainAddresses[chainID].PMaddress;
}

export const getPMabi = () => {
    const abi=[]
    return abi
}
