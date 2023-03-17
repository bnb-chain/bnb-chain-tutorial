"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __classPrivateFieldSet = (this && this.__classPrivateFieldSet) || function (receiver, state, value, kind, f) {
    if (kind === "m") throw new TypeError("Private method is not writable");
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
    return (kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value)), value;
};
var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _HDWalletProvider_wallets, _HDWalletProvider_addresses;
const bip39_1 = require("ethereum-cryptography/bip39");
const english_1 = require("ethereum-cryptography/bip39/wordlists/english");
const EthUtil = __importStar(require("ethereumjs-util"));
const tx_1 = require("@ethereumjs/tx");
const common_1 = __importDefault(require("@ethereumjs/common"));
const web3_provider_engine_1 = __importDefault(require("web3-provider-engine"));
// @ts-ignore - web3-provider-engine doesn't have declaration files for these subproviders
const filters_1 = __importDefault(require("web3-provider-engine/subproviders/filters"));
// @ts-ignore
const nonce_tracker_1 = __importDefault(require("web3-provider-engine/subproviders/nonce-tracker"));
// @ts-ignore
const hooked_wallet_1 = __importDefault(require("web3-provider-engine/subproviders/hooked-wallet"));
// @ts-ignore
const provider_1 = __importDefault(require("web3-provider-engine/subproviders/provider"));
// @ts-ignore
const rpc_1 = __importDefault(require("web3-provider-engine/subproviders/rpc"));
// @ts-ignore
const websocket_1 = __importDefault(require("web3-provider-engine/subproviders/websocket"));
const url_1 = __importDefault(require("url"));
const getOptions_1 = require("./constructor/getOptions");
const getPrivateKeys_1 = require("./constructor/getPrivateKeys");
const getMnemonic_1 = require("./constructor/getMnemonic");
const eth_sig_util_1 = require("@metamask/eth-sig-util");
const hdwallet_1 = require("@truffle/hdwallet");
// Important: do not use debug module. Reason: https://github.com/trufflesuite/truffle/issues/2374#issuecomment-536109086
// This line shares nonce state across multiple provider instances. Necessary
// because within truffle the wallet is repeatedly newed if it's declared in the config within a
// function, resetting nonce from tx to tx. An instance can opt out
// of this behavior by passing `shareNonce=false` to the constructor.
// See issue #65 for more
const singletonNonceSubProvider = new nonce_tracker_1.default();
class HDWalletProvider {
    constructor(...args) {
        _HDWalletProvider_wallets.set(this, void 0);
        _HDWalletProvider_addresses.set(this, void 0);
        const _a = (0, getOptions_1.getOptions)(...args), { provider, url, providerOrUrl, addressIndex = 0, numberOfAddresses = 10, shareNonce = true, derivationPath = `m/44'/60'/0'/0/`, pollingInterval = 4000, chainId, chainSettings = {} } = _a, 
        // what's left is either a mnemonic or a list of private keys
        signingAuthority = __rest(_a, ["provider", "url", "providerOrUrl", "addressIndex", "numberOfAddresses", "shareNonce", "derivationPath", "pollingInterval", "chainId", "chainSettings"]);
        const mnemonic = (0, getMnemonic_1.getMnemonic)(signingAuthority);
        const privateKeys = (0, getPrivateKeys_1.getPrivateKeys)(signingAuthority);
        this.walletHdpath = derivationPath;
        __classPrivateFieldSet(this, _HDWalletProvider_wallets, {}, "f");
        __classPrivateFieldSet(this, _HDWalletProvider_addresses, [], "f");
        this.chainSettings = chainSettings;
        this.engine = new web3_provider_engine_1.default({
            pollingInterval
        });
        let providerToUse;
        if (HDWalletProvider.isValidProvider(provider)) {
            providerToUse = provider;
        }
        else if (HDWalletProvider.isValidProvider(url)) {
            providerToUse = url;
        }
        else {
            providerToUse = providerOrUrl;
        }
        if (!HDWalletProvider.isValidProvider(providerToUse)) {
            throw new Error([
                `No provider or an invalid provider was specified: '${providerToUse}'`,
                "Please specify a valid provider or URL, using the http, https, " +
                    "ws, or wss protocol.",
                ""
            ].join("\n"));
        }
        if (mnemonic && mnemonic.phrase) {
            this.checkBIP39Mnemonic(Object.assign(Object.assign({}, mnemonic), { addressIndex,
                numberOfAddresses }));
        }
        else if (privateKeys) {
            const options = Object.assign({}, { privateKeys }, { addressIndex });
            this.ethUtilValidation(options);
        } // no need to handle else case here, since matchesNewOptions() covers it
        if (__classPrivateFieldGet(this, _HDWalletProvider_addresses, "f").length === 0) {
            throw new Error(`Could not create addresses from your mnemonic or private key(s). ` +
                `Please check that your inputs are correct.`);
        }
        const tmpAccounts = __classPrivateFieldGet(this, _HDWalletProvider_addresses, "f");
        const tmpWallets = __classPrivateFieldGet(this, _HDWalletProvider_wallets, "f");
        // if user supplied the chain id, use that - otherwise fetch it
        if (typeof chainId !== "undefined" ||
            (chainSettings && typeof chainSettings.chainId !== "undefined")) {
            this.chainId = chainId || chainSettings.chainId;
            this.initialized = Promise.resolve();
        }
        else {
            this.initialized = this.initialize();
        }
        // EIP155 compliant transactions are enabled for hardforks later
        // than or equal to "spurious dragon"
        this.hardfork =
            chainSettings && chainSettings.hardfork
                ? chainSettings.hardfork
                : "london";
        const self = this;
        this.engine.addProvider(new hooked_wallet_1.default({
            getAccounts(cb) {
                cb(null, tmpAccounts);
            },
            getPrivateKey(address, cb) {
                if (!tmpWallets[address]) {
                    cb("Account not found");
                    return;
                }
                else {
                    cb(null, tmpWallets[address].toString("hex"));
                }
            },
            signTransaction(txParams, cb) {
                return __awaiter(this, void 0, void 0, function* () {
                    yield self.initialized;
                    // we need to rename the 'gas' field
                    txParams.gasLimit = txParams.gas;
                    delete txParams.gas;
                    let pkey;
                    const from = txParams.from.toLowerCase();
                    if (tmpWallets[from]) {
                        pkey = tmpWallets[from];
                    }
                    else {
                        cb("Account not found");
                        return;
                    }
                    const chain = self.chainId;
                    const KNOWN_CHAIN_IDS = new Set([1, 3, 4, 5, 42]);
                    let txOptions;
                    if (typeof chain !== "undefined" && KNOWN_CHAIN_IDS.has(chain)) {
                        txOptions = {
                            common: new common_1.default({ chain, hardfork: self.hardfork })
                        };
                    }
                    else if (typeof chain !== "undefined") {
                        txOptions = {
                            common: common_1.default.forCustomChain(1, {
                                name: "custom chain",
                                chainId: chain
                            }, self.hardfork)
                        };
                    }
                    // Taken from https://github.com/ethers-io/ethers.js/blob/2a7ce0e72a1e0c9469e10392b0329e75e341cf18/packages/abstract-signer/src.ts/index.ts#L215
                    const hasEip1559 = txParams.maxFeePerGas !== undefined ||
                        txParams.maxPriorityFeePerGas !== undefined;
                    const tx = hasEip1559
                        ? tx_1.FeeMarketEIP1559Transaction.fromTxData(txParams, txOptions)
                        : tx_1.Transaction.fromTxData(txParams, txOptions);
                    const signedTx = tx.sign(pkey);
                    const rawTx = `0x${signedTx.serialize().toString("hex")}`;
                    cb(null, rawTx);
                });
            },
            signMessage({ data, from }, cb) {
                const dataIfExists = data;
                if (!dataIfExists) {
                    cb("No data to sign");
                    return;
                }
                if (!tmpWallets[from]) {
                    cb("Account not found");
                    return;
                }
                let pkey = tmpWallets[from];
                const dataBuff = EthUtil.toBuffer(dataIfExists);
                const msgHashBuff = EthUtil.hashPersonalMessage(dataBuff);
                const sig = EthUtil.ecsign(msgHashBuff, pkey);
                const rpcSig = EthUtil.toRpcSig(sig.v, sig.r, sig.s);
                cb(null, rpcSig);
            },
            signPersonalMessage(...args) {
                this.signMessage(...args);
            },
            signTypedMessage({ data, from }, cb) {
                if (!data) {
                    cb("No data to sign");
                    return;
                }
                // convert address to lowercase in case it is in checksum format
                const fromAddress = from.toLowerCase();
                if (!tmpWallets[fromAddress]) {
                    cb("Account not found");
                    return;
                }
                const signature = (0, eth_sig_util_1.signTypedData)({
                    data: JSON.parse(data),
                    privateKey: tmpWallets[fromAddress],
                    version: eth_sig_util_1.SignTypedDataVersion.V4
                });
                cb(null, signature);
            }
        }));
        !shareNonce
            ? this.engine.addProvider(new nonce_tracker_1.default())
            : this.engine.addProvider(singletonNonceSubProvider);
        this.engine.addProvider(new filters_1.default());
        if (typeof providerToUse === "string") {
            const url = providerToUse;
            const providerProtocol = (url_1.default.parse(url).protocol || "http:").toLowerCase();
            switch (providerProtocol) {
                case "ws:":
                case "wss:":
                    this.engine.addProvider(new websocket_1.default({ rpcUrl: url }));
                    break;
                default:
                    this.engine.addProvider(new rpc_1.default({ rpcUrl: url }));
            }
        }
        else {
            this.engine.addProvider(new provider_1.default(providerToUse));
        }
        // Required by the provider engine.
        this.engine.start();
    }
    initialize() {
        return new Promise((resolve, reject) => {
            this.engine.sendAsync({
                jsonrpc: "2.0",
                id: Date.now(),
                method: "eth_chainId",
                params: []
            }, 
            // @ts-ignore - the type doesn't take into account the possibility
            // that response.error could be a thing
            (error, response) => {
                if (error) {
                    reject(error);
                    return;
                }
                else if (response.error) {
                    reject(response.error);
                    return;
                }
                if (isNaN(parseInt(response.result, 16))) {
                    const message = "When requesting the chain id from the node, it" +
                        `returned the malformed result ${response.result}.`;
                    throw new Error(message);
                }
                this.chainId = parseInt(response.result, 16);
                resolve();
            });
        });
    }
    // private helper to check if given mnemonic uses BIP39 passphrase protection
    checkBIP39Mnemonic({ addressIndex, numberOfAddresses, phrase, password }) {
        if (!(0, bip39_1.validateMnemonic)(phrase, english_1.wordlist)) {
            throw new Error("Mnemonic invalid or undefined");
        }
        const hdwallet = (0, hdwallet_1.createAccountGeneratorFromSeedAndPath)((0, bip39_1.mnemonicToSeedSync)(phrase, password), this.walletHdpath.replace(/\/$/, "").split("/"));
        // crank the addresses out
        for (let i = addressIndex; i < addressIndex + numberOfAddresses; i++) {
            const wallet = hdwallet(i);
            const addr = `0x${Buffer.from((0, hdwallet_1.uncompressedPublicKeyToAddress)(wallet.publicKey)).toString("hex")}`;
            __classPrivateFieldGet(this, _HDWalletProvider_addresses, "f").push(addr);
            __classPrivateFieldGet(this, _HDWalletProvider_wallets, "f")[addr] = wallet.privateKey;
        }
    }
    // private helper leveraging ethUtils to populate wallets/addresses
    ethUtilValidation({ addressIndex, privateKeys }) {
        // crank the addresses out
        for (let i = addressIndex; i < privateKeys.length; i++) {
            const privateKey = Buffer.from(privateKeys[i].replace("0x", ""), "hex");
            if (EthUtil.isValidPrivate(privateKey)) {
                const wallet = EthUtil.privateToAddress(privateKey);
                const address = `0x${wallet.toString("hex")}`;
                __classPrivateFieldGet(this, _HDWalletProvider_addresses, "f").push(address);
                __classPrivateFieldGet(this, _HDWalletProvider_wallets, "f")[address] = privateKey;
            }
        }
    }
    send(payload, 
    // @ts-ignore we patch this method so it doesn't conform to type
    callback) {
        this.initialized.then(() => {
            this.engine.sendAsync(payload, callback);
        });
    }
    sendAsync(payload, callback) {
        this.initialized.then(() => {
            this.engine.sendAsync(payload, callback);
        });
    }
    getAddress(idx) {
        if (!idx) {
            return __classPrivateFieldGet(this, _HDWalletProvider_addresses, "f")[0];
        }
        else {
            return __classPrivateFieldGet(this, _HDWalletProvider_addresses, "f")[idx];
        }
    }
    getAddresses() {
        return __classPrivateFieldGet(this, _HDWalletProvider_addresses, "f");
    }
    static isValidProvider(provider) {
        if (!provider)
            return false;
        if (typeof provider === "string") {
            const validProtocols = ["http:", "https:", "ws:", "wss:"];
            const url = url_1.default.parse(provider.toLowerCase());
            return !!(validProtocols.includes(url.protocol || "") && url.slashes);
        }
        else if ("request" in provider) {
            // provider is an 1193 provider
            return true;
        }
        else if ("send" in provider) {
            // provider is a "legacy" provider
            return true;
        }
        return false;
    }
}
_HDWalletProvider_wallets = new WeakMap(), _HDWalletProvider_addresses = new WeakMap();
module.exports = HDWalletProvider;
//# sourceMappingURL=index.js.map