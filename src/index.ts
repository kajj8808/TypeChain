import * as CrytoJS from 'crypto-js';

class Block {
    public index: number;
    public hash: string;
    public previousHash: string;
    public data: string;
    public timestamp: number;
    /* static 으로써야 밖에서가능. */
    static calculateBlockHash = (
        index: number,
        previousHash: string,
        timestamp: number,
        data: string
    ): string =>
        CrytoJS.SHA256(index + previousHash + timestamp + data).toString();

    static valudateStructure = (aBlock: Block): boolean =>
        typeof aBlock.index === 'number' &&
        typeof aBlock.hash == 'string' &&
        typeof aBlock.previousHash === 'string' &&
        typeof aBlock.timestamp === 'number' &&
        typeof aBlock.data === 'string';

    constructor(
        index: number,
        hash: string,
        previousHash: string,
        data: string,
        timestamp: number
    ) {
        this.index = index;
        this.hash = hash;
        this.previousHash = previousHash;
        this.data = data;
        this.timestamp = timestamp;
    }
}

const genesisBlock: Block = new Block(
    0,
    '20202020202',
    '',
    'Hello World',
    12345
);

/* 블록체인은 블록들의 연결*/
let blockChain: Block[] = [genesisBlock];

const getBlockChain = (): Block[] => blockChain;

/* 가장 최근것을 가져옴 */
const getLatestBlock = (): Block => blockChain[blockChain.length - 1];

/* 최근시간. */
const getNewTimeStamp = (): number => Math.round(new Date().getTime() / 1000);

const createNewBlock = (data: string): Block => {
    const previousBlock: Block = getLatestBlock();
    const newIndex: number = previousBlock.index + 1;
    const newTimeStamp: number = getNewTimeStamp();
    const newHash: string = Block.calculateBlockHash(
        newIndex,
        previousBlock.hash,
        newTimeStamp,
        data
    );
    const newBlock: Block = new Block(
        newIndex,
        newHash,
        previousBlock.hash,
        data,
        newTimeStamp
    );
    addBlock(newBlock);
    return newBlock;
};

const getHashForBlock = (aBlock: Block): string =>
    Block.calculateBlockHash(
        aBlock.index,
        aBlock.previousHash,
        aBlock.timestamp,
        aBlock.data
    );

const isBlockValid = (candidateBlock: Block, previousBlock: Block): boolean => {
    if (!Block.valudateStructure(candidateBlock)) {
        return false;
    } else if (previousBlock.index + 1 !== candidateBlock.index) {
        return false;
    } else if (previousBlock.hash !== candidateBlock.previousHash) {
        return false;
    } else if (getHashForBlock(candidateBlock) !== candidateBlock.hash) {
        return false;
    } else {
        return true;
    }
};

const addBlock = (candidateBlock: Block) : void =>{
    if(isBlockValid(candidateBlock, getLatestBlock())){
        blockChain.push(candidateBlock)
    }
}

createNewBlock("Second Block")
createNewBlock("Third Block")
createNewBlock("Fourth Block")

console.log(blockChain);
export {};
