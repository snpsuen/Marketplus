FROM node:latest
RUN apt-get update && \
apt-get install -y git \
	tree \
	nano \
	vim
WORKDIR /web3
RUN npm install --global --quiet npm truffle ganache
RUN git clone https://github.com/snpsuen/Marketplus.git
WORKDIR /web3/Marketplus
RUN npm install --quiet
EXPOSE 8545
EXPOSE 3000
ENTRYPOINT ["sh", "-c", "ganache -h 0.0.0.0 --wallet.accountKeysPath=/web3/ganache_account > /web3/ganache.log 2>&1"]
