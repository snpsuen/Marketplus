# Marketplus
Marketplus is a refined version on the Marketplace Dapp featured in the Solidity/Ethereum [tutorial](https://www.dappuniversity.com/articles/how-to-build-a-blockchain-app), whereby changes are primarily applied to the structure and purchase of products on a smart contract.
1. Each product on sale is assigned a random but unique product ID.
2. Each product on sale is recorded with a quantity in stock.
3. Need to indicate how many items to buy when purchasing a product.

Just follow the quick steps below to take to build and test the Dapp.

### 1. Use the bundled Dockerfile to spin up the project container
```
sudo docker build -t snpsuen/marketplus:v01 .
sudo docker run --name mpcon -p 8545:8545 -p 3000:3000 -d snpsuen/marketplus:v01
sudo docker exec -it mpcon bash
```
### 2. Deploy the smart contract on the Ganache blockchain
```
view src/contracts/Marketplus.sol
view migrations/2_deploy_contracts.js
truffle compile
truffle migrate --reset
```
### 3. Deploy the ReactJS frontend to interact with the smart contract
```
view src/components/App.js
view src/components/Main.js
view src/components/Navbar.js
npm run start &
```
### 4. Test it out
*  Make sure your local desktop ports 3000 and 8545, i.e. localhost:3000 & 8545, are forwarded respectively to the same ports on the project container.
*  Open your desktop browser at http://localhost:3000
*  Open the Metamask extension and login to the wallet.
*  Connect Metamask to the Ganache blockchain network, RPC URL: HTTP:localhost:8545, Chain ID: 1337
*  Refer to /web3/ganache.log inside the project container and import accounts to Metamask.
*  You are now ready to add or purchase products from Marketplus as different account owners in the frontend.





