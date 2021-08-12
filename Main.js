const SHA256 = require('crypto-js/sha256');

class Transaction{
	constructor(fromAddress,toAddress, amount){
		this.fromAddress = fromAddress;
		this.toAddress =toAddress;
		this.amount=amount;
	}
}

class Block{
	constructor(timestamp,transactions,previousHash = ''){
		this.timestamp = timestamp;
		this.previousHash = previousHash;
		this.hash = this.calculateHash();
		this.nonce = 0;
		this.transactions = transactions;
	}


	calculateHash(){
		return SHA256(this.previousHash + this.timestamp + JSON.stringify(this.data)+this.nonce).toString();


	}
	mineBlock(difficulty){
		while(this.hash.substring(0,difficulty) !== Array(difficulty+1).join("0")){
			this.nonce++;
			this.hash = this.calculateHash();
		}

		console.log(this.hash);
	}
}

class Blockchain{
	constructor(){
		this.chain =[this.creatGenesisBlock()];
		this.difficulty = 2;
		this.pendingTransactions=[];
		this.miningReward = 100;
	}

	creatGenesisBlock(){
		return new Block("08/11/2021","Geneis block","0");
	}
	getLatestBlock(){
		return this.chain[this.chain.length-1];
	}

	minePendingTransaction(miningRewardAddress){
		let block = new Block(Date.now(), this.pendingTransactions, this.getLatestBlock().hash);
		block.mineBlock(this.difficulty);

		console.log('Block Successfully mined!');
		this.chain.push(block);
		this.pendingTransactions =[
			new Transaction(null, miningRewardAddress, this.miningReward)
		]
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

				if(trans.toAddress === address){
					balance += trans.amount;
				}
			}
		}

		return balance;
	}



	isChainValid(){
		for(let i = 1; i<this.chain.length; i++){
			const currentBlock = this.chain[i];
			const previousBlock = this.chain[i-1];

			if(currentBlock.hash !== currentBlock.calculateHash()){
				return false;
			}

			if(currentBlock.previousHash !== previousBlock.hash){
				return false;
			}
		}

		return true;
	}
}

let testCoin = new Blockchain();

testCoin.createTransaction(new Transaction('address1','address2',100));
testCoin.createTransaction(new Transaction('address2','address1',10));

console.log('\n Starting the miner...')
testCoin.minePendingTransaction('my_address');


console.log('\n Your balance is'+' '+ testCoin.getBalanceOfAddress('my_address'))

testCoin.minePendingTransaction('my_address');

console.log('\n Your balance is'+ ' '+testCoin.getBalanceOfAddress('my_address'))



