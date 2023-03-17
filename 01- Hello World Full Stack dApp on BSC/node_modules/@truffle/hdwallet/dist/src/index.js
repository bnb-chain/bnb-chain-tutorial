"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.uncompressedPublicKeyToAddress = exports.createAccountGeneratorFromSeedAndPath = void 0;
const keccak_1 = require("ethereum-cryptography/keccak");
const crypto_1 = require("crypto");
const secp256k1_1 = __importDefault(require("secp256k1"));
const HARDENED_OFFSET = 0x80000000;
const MASTER_SECRET = Buffer.from("Bitcoin seed", "utf8");
function createAccountGeneratorFromSeedAndPath(seedBuffer, hdPath) {
    const parent = createAccountFromSeed(seedBuffer);
    const path = deriveFromPath(hdPath, parent);
    return (index) => {
        return deriveFromIndex(index, path);
    };
}
exports.createAccountGeneratorFromSeedAndPath = createAccountGeneratorFromSeedAndPath;
const uncompressedPublicKeyToAddress = (uncompressedPublicKey) => {
    const address = Buffer.from(secp256k1_1.default.publicKeyConvert(uncompressedPublicKey, false));
    // first byte is discarded
    const hash = (0, keccak_1.keccak256)(address.slice(1));
    return hash.slice(-20); // address is the last 20
};
exports.uncompressedPublicKeyToAddress = uncompressedPublicKeyToAddress;
function createAccountFromSeed(seedBuffer) {
    const I = (0, crypto_1.createHmac)("sha512", MASTER_SECRET).update(seedBuffer).digest();
    const privateKey = I.slice(0, 32);
    const chainCode = I.slice(32);
    const publicKey = makePublicKey(privateKey);
    return {
        privateKey,
        chainCode,
        publicKey
    };
}
function deriveFromPath(fullPath, child) {
    fullPath.forEach(function (c, i) {
        if (i === 0) {
            if (!/^[mM]{1}/.test(c)) {
                throw new Error('Path must start with "m" or "M"');
            }
            return;
        }
        const hardened = c.length > 1 && c[c.length - 1] === "'";
        let childIndex = parseInt(c, 10);
        if (childIndex >= HARDENED_OFFSET)
            throw new Error("Invalid index");
        if (hardened)
            childIndex += HARDENED_OFFSET;
        child = deriveChild(childIndex, hardened, child.privateKey, child.publicKey, child.chainCode);
    });
    return child;
}
function deriveFromIndex(index, child) {
    if (index >= HARDENED_OFFSET)
        throw new Error("Invalid index");
    return deriveChild(index, false, child.privateKey, child.publicKey, child.chainCode);
}
function makePublicKey(privateKey) {
    return secp256k1_1.default.publicKeyCreate(privateKey);
}
/**
 * A buffer of size 4 that can be reused as long as all changes are consumed
 * within the same event loop.
 */
const SHARED_BUFFER_4 = Buffer.allocUnsafe(4);
function deriveChild(index, isHardened, privateKey, publicKey, chainCode) {
    const indexBuffer = SHARED_BUFFER_4;
    indexBuffer.writeUInt32BE(index, 0);
    let data;
    const privateKeyLength = privateKey.length;
    if (isHardened) {
        // Hardened child
        // privateKeyLength + 1 (BUFFER_ZERO.length) + 4 (indexBuffer.length)
        const dataLength = privateKeyLength + 1 + 4;
        data = Buffer.concat([Buffer.allocUnsafe(1).fill(0), privateKey, indexBuffer], dataLength);
    }
    else {
        // Normal child
        data = Buffer.concat([publicKey, indexBuffer], publicKey.length + 4);
    }
    const I = (0, crypto_1.createHmac)("sha512", chainCode).update(data).digest();
    const IL = I.slice(0, 32);
    try {
        const privK = Buffer.allocUnsafe(privateKeyLength);
        privateKey.copy(privK, 0, 0, privateKeyLength);
        const newPrivK = secp256k1_1.default.privateKeyTweakAdd(privK, IL);
        return {
            privateKey: Buffer.from(newPrivK),
            publicKey: makePublicKey(newPrivK),
            chainCode: I.slice(32)
        };
    }
    catch (_a) {
        return deriveChild(index + 1, isHardened, privateKey, publicKey, chainCode);
    }
}
//# sourceMappingURL=index.js.map