const SHA256 = require('crypto-js/sha256')


class Block{
	constructor(index,timestamp,data,previousHash = ''){
		this.index = index;
		this.timestamp = timestamp;
		this.data = data;
		this.previousHash = previousHash;
		this.hash = '';
	}


	calculateHash(){
		return SHA256(this.index + this.previousHash + this.timestamp + JSON.stringify(this.data)).toString();


	}
}

class Blockchain{
	constructor(){
		this.chain =[this.creatGenesisBlock()];
	}

	creatGenesisBlock(){
		return new Block(0,"08/11/2021","Geneis block","0");
	}
	getLatestBlock(){
		return this.chain[this.chain.length-1];
	}

	addBlock(newBlock){
		newBlock.previousHash = this.getLatestBlock().hash;
		newBlock.hash = newBlock.calculateHash();
		this.chain.push(newBlock);
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

let potatCoin = new Blockchain();
potatCoin.addBlock(new Block(1,"09/11/2021",{amount:4}));
potatCoin.addBlock(new Block(1,"09/11/2021",{amount:16}));

console.log('Is Blockchain valid?' + ' '+potatCoin.isChainValid());

potatCoin.chain[1].data = {amount: 100};


console.log('Is Blockchain valid?' + ' '+potatCoin.isChainValid());

//console.log(JSON.stringify(potatCoin,null,4));