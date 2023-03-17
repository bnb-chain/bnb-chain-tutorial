import ProviderEngine from "web3-provider-engine";
import type { JSONRPCRequestPayload, JSONRPCResponsePayload } from "ethereum-protocol";
import type { ConstructorArguments } from "./constructor/ConstructorArguments";
declare class HDWalletProvider {
    #private;
    private walletHdpath;
    private chainId?;
    private chainSettings;
    private hardfork;
    private initialized;
    engine: ProviderEngine;
    constructor(...args: ConstructorArguments);
    private initialize;
    private checkBIP39Mnemonic;
    private ethUtilValidation;
    send(payload: JSONRPCRequestPayload, callback: (error: null | Error, response: JSONRPCResponsePayload) => void): void;
    sendAsync(payload: JSONRPCRequestPayload, callback: (error: null | Error, response: JSONRPCResponsePayload) => void): void;
    getAddress(idx?: number): string;
    getAddresses(): string[];
    static isValidProvider(provider: any): boolean;
}
export = HDWalletProvider;
