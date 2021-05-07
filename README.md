
# SmartContracts

Clone repository 
```git clone https://github.com/482solutions/SmartContract-Poll.git```

Then you have to download npm and nodejs by link [Download npm](https://nodejs.org/en/download/) 

## Deploy smartContracts:

### Use Remix IDE

For deploy smart-contracts you need to go to the [Remix IDE](http://remix.ethereum.org/) website and create two empty files named "Vote.sol" and "PollFactory.sol".

Inside these files, you need to copy and paste the code from the files of the same name [Vote.sol](https://github.com/482solutions/SmartContract-Poll/blob/master/contracts/Vote.sol) and [PollFactory.sol](https://github.com/482solutions/SmartContract-Poll/blob/master/contracts/PollFactory.sol).

### Use MetaMask

Go to the official [MetaMask](https://metamask.io/) website and find the [download](https://metamask.io/download.html) section. Download and install downloaded the chrome browser extension.

On the right in the browser, among all extensions, an icon in the form of a fox's face will appear by clicking on it you will see a pop-up window with the ability to create a new wallet, then blow off all the instructions and at the end you will have a new ether wallet.

Return to Remix IDE and file explorer, select the PollFactory.sol file, then switch to DEPLOY & RUN TRANSACTIONS

menu compile and click the Deploy button. After deploying

After creating a wallet, you need to replenish your account, for this there is a cash [faucet](http://remix.ethereum.org/).

## Configurate front-end

After deployment, a smart contract will appear in the section, by clicking on it you will copy the address of the smart contract. Then find .env file in cloned from the git folder, find there REACT_APP_ADDRESS variable, and paste copied address into this variable


  

## Available Scripts

  

In the project directory, you can run:

### `npm i`

and then  

### `npm start`
  

Runs the app in the development mode.\

Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

  

The page will reload if you make edits.\

You will also see any lint errors in the console.