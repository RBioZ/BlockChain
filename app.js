
//Importações
const {Blockchain, Transaction} = require('./blockchain');
const EC = require('elliptic').ec;
const ec = new EC('secp256k1');

//Primeira Wallet
const myKey_1 = ec.keyFromPrivate('03c6b1d13c1894f87aa0a28d67806086638c01991f42d9e2fbbe4e66f12f80b3')
const myWalletAddress_1 = myKey_1.getPublic('hex')

//Segunda Wallet
const myKey_2 = ec.keyFromPrivate('0f7babd40da657545c5590a0f3a5ca4e2d48910f67b0d9e291d35141e6aefe2d')
const myWalletAddress_2 = myKey_2.getPublic('hex')


//Instanciando Moeda
let BitCoin = new Blockchain();


console.log('\nStarting the miner...');
BitCoin.minePendingTransactions(myWalletAddress_1);

const tx1 = new Transaction(myWalletAddress_1,'04317e90cee721821b842c94720df361c9a0683c761a1b7fcd93a2dfce8a6baa63dea5aba3766faf26b835ecb28cb87f5c20551415f11fa0c42c90522b13942fac', 50)
tx1.signTransaction(myKey_1);
BitCoin.addTransaction(tx1);


console.log('\nStarting the miner...');
BitCoin.minePendingTransactions(myWalletAddress_2);

console.log('\nBalance of 1_Wallet is',BitCoin.getBalanceOfAddress(myWalletAddress_1));
console.log('\nBalance of 2_Walletxavier is',BitCoin.getBalanceOfAddress(myWalletAddress_2));


console.log('Is chain valid?', BitCoin.isChainValid())

console.log(BitCoin.chain[2].transactions)
