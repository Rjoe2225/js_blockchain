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
}

let potatCoin = new Blockchain();
potatCoin.addBlock(new Block(1,"09/11/2021",{amount:4}));
potatCoin.addBlock(new Block(1,"09/11/2021",{amount:16}));

console.log(JSON.stringify(potatCoin,null,4));