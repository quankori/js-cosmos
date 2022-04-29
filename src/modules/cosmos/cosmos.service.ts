import {
  AccountData,
  DirectSecp256k1HdWallet,
  isOfflineDirectSigner,
  OfflineSigner,
} from '@cosmjs/proto-signing';
import { HttpException, Injectable } from '@nestjs/common';
import {
  calculateFee,
  GasPrice,
  SigningStargateClient,
} from '@cosmjs/stargate';
import config from 'src/configs/config';
import {
  ExecuteResult,
  SigningCosmWasmClient,
} from '@cosmjs/cosmwasm-stargate';
@Injectable()
export class CosmosService {
  constructor() {}

  /**
   * Get wallet with mnemonic
   * @returns
   */
  async getSigner(): Promise<DirectSecp256k1HdWallet> {
    const mnemonic = config.network.mnemonic;
    return await DirectSecp256k1HdWallet.fromMnemonic(mnemonic, {
      prefix: config.network.prefix,
    });
  }

  /**
   * Get client with rpc
   * @param wallet
   * @returns
   */
  async getClient(
    wallet: DirectSecp256k1HdWallet,
  ): Promise<SigningStargateClient> {
    const rpcEndpoint = config.network.rpc;
    return await SigningStargateClient.connectWithSigner(rpcEndpoint, wallet);
  }

  /**
   * Get account data by wallet
   * @param wallet
   * @returns
   */
  async getAccount(wallet: DirectSecp256k1HdWallet): Promise<AccountData> {
    const accounts = await wallet.getAccounts();
    return accounts[0];
  }

  /**
   * Query smart contract
   * @param signer
   * @param contractAddress
   * @param queryMsg
   * @returns
   */
  async query(
    signer: OfflineSigner,
    contractAddress: string,
    queryMsg: Record<string, unknown>,
  ): Promise<any> {
    const cosmWasmClient = await SigningCosmWasmClient.connectWithSigner(
      config.network.rpc,
      signer,
    );
    return await cosmWasmClient.queryContractSmart(contractAddress, queryMsg);
  }

  /**
   * Execute smart contract
   * @param signer 
   * @param fromWallet 
   * @param handleMsg 
   * @returns 
   */
  async execute(
    signer: OfflineSigner,
    fromWallet: string,
    contractAddress: string,
    handleMsg: Record<string, unknown>,
  ): Promise<ExecuteResult> {
    const check = isOfflineDirectSigner(signer);
    if (!check) throw new HttpException('Signer is not correct', 400);
    const cosmWasmClient = await SigningCosmWasmClient.connectWithSigner(
      config.network.rpc,
      signer,
    );
    const gasPrice = GasPrice.fromString(config.network.gasPrice);
    const txFee = calculateFee(config.network.gasLimit, gasPrice);
    return await cosmWasmClient.execute(
      fromWallet,
      contractAddress,
      handleMsg,
      txFee,
    );
  }
}
