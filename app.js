const {Blockchain, Transaction} = require('./blockchain');
const EC = require('elliptic').ec;
const ec = new EC('secp256k1');

const myKey = ec.keyFromPrivate('be522c72c6a007cc24c87387dacfb9ff7090ef3e6cdd1d848980ac7d94f46db9')
const myWalletAddress = myKey.getPublic('hex')

let savjeeCoin = new Blockchain();

const tx1 = new Transaction(myWalletAddress,'public key goes here', 10)
tx1.signTransaction(myKey);
savjeeCoin.addTransaction(tx1);


console.log('\nStarting the miner...');
savjeeCoin.minePendingTransactions(myWalletAddress);

console.log('\nBalance of xavier is',savjeeCoin.getBalanceOfAddress(myWalletAddress));

console.log('Is chain valid?', savjeeCoin.isChainValid())