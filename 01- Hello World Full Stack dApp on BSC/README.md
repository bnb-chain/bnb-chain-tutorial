# BSC Hello World Tutorial

## Overview
An easy-to-understand tutorial for newbies to develop smart contact on BNB Smart Chain. In this tutorial, we provide a  step-by-step guide on how to develop a full-stack Hello World Smart dApp that is used for storing and retrieving data from the BSC blockchain. The technology stack used includes Solidity, Truffle, Ganache, Web3.js, and Node js. This smart contract is then deployed on the BNB Smart Chain Testnet.

## What You Will Learn
Through this tutorial, you will learn 
- MetaMask Wallet connectivity to BSC Testnet;
- Smart-contract development;
- Using truffle and ganache for local development and testing;
- Unit testing of smart contracts;
- Deploying smart contracts on BSC Testnet;
- Front-end integration with smart contract using web3.js library;

## Target audience
This tutorial aims to provide adequate information to anyone who wants to learn dApp development on BNB Smart Chain.

## Prerequisites
  - node --version
    - v16.13.0
  - npm --version 
    - 8.1.0
  - truffle version
    - Truffle v5.5.19 (core: 5.5.19)
    - Ganache v7.2.0
    - Solidity - ^0.8.0 (solc-js)
    - Web3.js v1.5.3
  - MetaMask Wallet
    - 10.16.1

## Setup

1. **Clone the repository**
```gh repo clone https://github.com/bnb-chain/bnb-chain-tutorial```
2. **Change the current directory**
```cd 01- Hello World Full Stack dApp on BSC```
3. **Install all the dependencies (node modules)**
```npm install```
4. Create a ```.secret``` file with the secret phrase of MetaMask. Refer [here](https://metamask.zendesk.com/hc/en-us/articles/360015290032-How-to-reveal-your-Secret-Recovery-Phrase) for details on how to get MetaMask secret phrase.   
5. **Compile Smart Contracts**
```truffle compile```
6. **Migrate Smart Contracts**
```truffle migrate --reset --network bscTestnet```
7. **Create build**
```npm run build```
8. **Run the application** ```npm run dev```
  
>**Note:**    _Make Sure Nothing is Running on localhost:3000_

## npm Error Handling
- If you encounter an error while running on local host, run `npm install --save-dev lite-server`
  - then run `npm start`

- If your current version of Solidity is not compiling your contracts, try running the following steps to clear your cache
  - `rm -rf build/`
  - `rm -rf .cache/`
  ```Reinstall the node module --> ```
  1. `npm install @truffle/hdwallet-provider`
  2. `rm -rf node_modules`
  3. `npm install`
  4. `npm install -g truffle@latest`
```Once you do this, make sure `truffle-config.js` solc version is the same as your installed solidity version. check by running `$ truffle version` ```

## Available Scripts
```
  $ truffle compile
  $ truffle migrate
  $ truffle test
  $ npm run build
  $ npm run dev
```

## Structure
```sh
HelloWorld.
|   .env
|   .gitattributes
|   LICENSE
|   package-lock.json
|   package.json
|   README.md
|   truffle-config.js
|   webpack.config.js
|   yarn.lock
| 
+---build
|   \---contracts
|           HelloWorld.json
|           Migrations.json
|           
+---client
|   |   app.js
|   |   chain-smart-bsc-l.png
|   |   index.css
|   |   index.html
|   |   
|           
+---contracts
|       HelloWorld.sol
|       Migrations.sol
|       
+---migrations
|       1_initial_migration.js
|       2_hello_world.js
|                 
+---server
|       main.js
|       
+---test
|       .gitkeep
|       hello_world.js       
|       
```

## How it Works
### Checklist
- Make sure you have MetaMask installed and logged in on your browser.
- Make sure that your MetaMask wallet is correctly configured to connect to BSC Testnet. Refer to this [guide](https://academy.binance.com/en/articles/connecting-metamask-to-binance-smart-chain) for details.
- Create a file named ```.secret```, save your MetaMask Secret Phrase in this file.
- Run the command ```truffle compile``` to compile the smart contracts.
- Run the command ```truffle migrate --reset --network bscTestnet``` to deploy the contract on the BSC Testnet.
- Run the command ```npm run build``` to build the application.
- Run the command ```npm run dev``` to start the application.

### How to Use
1. Open browser and navigate to ```http://localhost:3000/```
2. Make sure that your MetaMask wallet is correctly installed and configured to connect to BSC Testnet. Refer to this [guide](https://academy.binance.com/en/articles/connecting-metamask-to-binance-smart-chain) for details.
3. Select your desired account of MetaMask that has BNB Test tokens to perform transactions.
4. To get test tokens use the [BNB Smart Chain Faucet](https://testnet.binance.org/faucet-smart).
5. Click on Greet Button to display message, by default its Hello World.
6. Enter a name in the input field, Click save button to save the name.
7. Confirm the transaction when MetaMask notification pops up.
8. Click on Greet Button to display message along with the last name saved with the current account.

## Unit Test of Smart Contracts
- Make sure that Ganache is running. This is important because testing is done on the local network.
- From the root directory of the project, open command prompt.
- Run the command ```truffle test``` to run the tests.
  
## Unit Test Coverage
```sh
  Contract: HelloWorld
    √ Default message should be hello, world (264ms)
    √ Should save name (796ms)
    √ Should be default message for other accounts (412ms)
    √ Should throw error on empty name (3306ms)


  4 passing (5s)
```
## Contact
For more inquiries and conversations, feel free to contact us at our [Discord Channel](https://discord.com/channels/789402563035660308/912296662834241597)
