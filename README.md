# Marketplus
Marketplus is a refined version on the Marketplace Dapp featured in the Solidity/Ethereum [tutorial](https://www.dappuniversity.com/articles/how-to-build-a-blockchain-app), whereby changes are primarily applied to the structure and purchase of products on a smart contract.
1. Each product on sale is assigned a random but unique product ID.
2. Each product on sale is recorded with a quantity in stock.
3. Need to indicate how many items to buy when purchasing a product.

Just follow the quick steps to build and test the Dapp.

### 1. Use the listed Dockerfile to spin up the project container
```
sudo docker build -t snpsuen/marketplus:v01 .
sudo docker run --name mpcon -p 8545:8545 -p 3000:3000 -d snpsuen/marketplus:v01
sudo docker exec -it mpcon bash
```


