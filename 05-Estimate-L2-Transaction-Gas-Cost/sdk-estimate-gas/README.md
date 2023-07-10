

## How to estimate opBNB Layer 2 transaction gas and gas cost

opBNB leverages the Optimism OP Stack to build the high performance and low cost Layer 2 solution. 

To develop and deploy your own Layer 2 applications on opBNB, you can use the [OP Stack SDK](https://sdk.optimism.io/), which provides a simple and intuitive interface for working with the OP Stack. The OP Stack SDK allows you to estimate the gas usage and gas cost of both the Layer 1 and Layer 2 components of your Layer 2 transactions, so you can optimize your code and minimize your fees.

Estimate the Layer 1 gas of a particular Layer 2 transaction

https://sdk.optimism.io/modules.html#estimateL1Gas

Estimate the Layer 1 gas cost of a particular Layer 2 transaction in wei

https://sdk.optimism.io/modules.html#estimateL1GasCost

Similar it also supports the Layer 2 part gas cost 

https://sdk.optimism.io/modules.html#estimateL2GasCost

And total cost of the Layer 2 transaction

https://sdk.optimism.io/modules.html#estimateL2GasCost

You only need to make minor changes to your existing codebase to use the OP Stack SDK.


**ENV settings** 

Please configure your mnemonic in the .env file, and the URL is preconfigured to the opBNB testnet and BSC testnet.


```shell
# Put the mnemonic for an account on opBNB here

MNEMONIC=""

# URL to access BNB smart chain testnet

L1URL="https://data-seed-prebsc-1-s1.bnbchain.org:8545"

# URL to access opBNB testnet

L2URL="https://opbnb-testnet-rpc.bnbchain.org"
```



**Steps to run**

Go the directory of the sdk-estimate-gas 

```shell
cd sdk-estimate-gas 
yarn install
node gas.js --network=testnet
```

