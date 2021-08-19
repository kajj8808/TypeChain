"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const CrytoJS = require("crypto-js");
class Block {
    constructor(index, hash, previousHash, data, timestamp) {
        this.index = index;
        this.hash = hash;
        this.previousHash = previousHash;
        this.data = data;
        this.timestamp = timestamp;
    }
}
/* static 으로써야 밖에서가능. */
Block.calculateBlockHash = (index, previousHash, timestamp, data) => CrytoJS.SHA256(index + previousHash + timestamp + data).toString();
Block.valudateStructure = (aBlock) => typeof aBlock.index === 'number' &&
    typeof aBlock.hash == 'string' &&
    typeof aBlock.previousHash === 'string' &&
    typeof aBlock.timestamp === 'number' &&
    typeof aBlock.data === 'string';
const genesisBlock = new Block(0, '20202020202', '', 'Hello World', 12345);
/* 블록체인은 블록들의 연결*/
let blockChain = [genesisBlock];
const getBlockChain = () => blockChain;
/* 가장 최근것을 가져옴 */
const getLatestBlock = () => blockChain[blockChain.length - 1];
/* 최근시간. */
const getNewTimeStamp = () => Math.round(new Date().getTime() / 1000);
const createNewBlock = (data) => {
    const previousBlock = getLatestBlock();
    const newIndex = previousBlock.index + 1;
    const newTimeStamp = getNewTimeStamp();
    const newHash = Block.calculateBlockHash(newIndex, previousBlock.hash, newTimeStamp, data);
    const newBlock = new Block(newIndex, newHash, previousBlock.hash, data, newTimeStamp);
    addBlock(newBlock);
    return newBlock;
};
const getHashForBlock = (aBlock) => Block.calculateBlockHash(aBlock.index, aBlock.previousHash, aBlock.timestamp, aBlock.data);
const isBlockValid = (candidateBlock, previousBlock) => {
    if (!Block.valudateStructure(candidateBlock)) {
        return false;
    }
    else if (previousBlock.index + 1 !== candidateBlock.index) {
        return false;
    }
    else if (previousBlock.hash !== candidateBlock.previousHash) {
        return false;
    }
    else if (getHashForBlock(candidateBlock) !== candidateBlock.hash) {
        return false;
    }
    else {
        return true;
    }
};
const addBlock = (candidateBlock) => {
    if (isBlockValid(candidateBlock, getLatestBlock())) {
        blockChain.push(candidateBlock);
    }
};
createNewBlock("Second Block");
createNewBlock("Third Block");
createNewBlock("Fourth Block");
console.log(blockChain);
//# sourceMappingURL=index.js.map