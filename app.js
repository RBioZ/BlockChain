const SHA256 = require('crypto-js/sha256')

class Transaction{
    constructor(fromAddress,toAdress,amount){
        this.fromAddress = fromAddress;
        this.toAdress = toAdress;
        this.amount = amount;
    }
}


class Block{
    constructor(timestamp, transactions, previousHash = ''){
        this.previousHash = previousHash;
        this.timestamp = timestamp;
        this.transactions = transactions;
        this.hash = this.calculateHash();
        this.nonce = 0;
    }

    calculateHash(){
        return SHA256(this.index + this.previousHash + this.timestamp + JSON.stringify(this.data)+this.nonce).toString();
    }
    mineBlock(difficulty){
        while(this.hash.substring(0,difficulty) !== Array(difficulty+1).join("0")){
            this.nonce++;
            this.hash = this.calculateHash();
        }
        console.log("Block mined: " + this.hash);
    }
}

class BlockChain{
    constructor(){
        this.chain = [this.createGenesisBlock()];
        this.difficulty = 5
        this.pendingTransactions = [];
        this.miningReward = 100;
    }

    createGenesisBlock(){
        return new Block('01/01/2020','Genesis Block', '0');
    }
    getLatestBlock(){
        return this.chain[this.chain.length - 1]
    }

    minePendingTransactions(miningRewardAddress){
        let block = new Block(Date.now(),this.pendingTransactions);
        block.mineBlock(this.difficulty);

        console.log('Block successfully mined!')
        this.chain.push(block)

        this.pendingTransactions = [
            new Transaction(null,miningRewardAddress, this.miningReward)
        ];
    }

    createTransaction(transaction){
        this.pendingTransactions.push(transaction);
    }

    getBalanceOfAddress(address){
        let balance = 0;

        for(const block of this.chain){
            for(const trans of block.transactions){
                if(trans.fromAddress === address){
                    balance -= trans.amount;
                }

                if(trans.toAdress === address){
                    balance += trans.amount;
                }
            } 
        }

        return balance;
    }

    isChainValid(){
        for(let i = 1;i < this.chain.length; i++){
            const currentBlock = this.chain[i];
            const previusBlock = this.chain[i - 1];

            if(currentBlock.hash !== currentBlock.calculateHash()){
                return false
            }
            if(currentBlock.previousHash !== previusBlock.hash){
                return false
            }
        }
        return true;
    }
}

let savjeeCoin = new BlockChain();

savjeeCoin.createTransaction(new Transaction('address1','address2', 100));
savjeeCoin.createTransaction(new Transaction('address1','address2', 50));

console.log('\nStarting the miner...');
savjeeCoin.minePendingTransactions('xaviers-address');

console.log('\nBalance of xavier is',savjeeCoin.getBalanceOfAddress('xaviers-address'));

console.log('\nStarting the miner...');
savjeeCoin.minePendingTransactions('xaviers-address');

console.log('\nBalance of xavier is',savjeeCoin.getBalanceOfAddress('xaviers-address'));