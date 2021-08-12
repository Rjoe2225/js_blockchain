const {Blockchain,Transaction} = require('./blockchain');
const EC = require('elliptic').ec;
const ec = new EC('secp256k1');


const myKey = ec.keyFromPrivate('661f4bba7760dbb82af8429d8c83b4b94ced96da0d32a8dea477ac943432e04d')
const myWalletAddress = myKey.getPublic('hex')


let testCoin = new Blockchain();

const tx1 = new Transaction(myWalletAddress, 'public key goes here', 10);
tx1.signTransaction(myKey);
testCoin.addTransaction(tx1);





console.log('\n Starting the miner...')
testCoin.minePendingTransaction(myWalletAddress);


console.log('\n Your balance is'+' '+ testCoin.getBalanceOfAddress(myWalletAddress));



