import { Injectable } from '@nestjs/common';
import { DirectSecp256k1HdWallet, isOfflineDirectSigner, OfflineSigner } from '@cosmjs/proto-signing';
import { SigningStargateClient } from '@cosmjs/stargate';
import config from './configs/config';
import { SigningCosmWasmClient } from '@cosmjs/cosmwasm-stargate';
import { calculateFee, GasPrice } from '@cosmjs/stargate';
import { encodeSecp256k1Pubkey, EnigmaUtils, pubkeyToAddress, Secp256k1Pen } from 'secretjs';
@Injectable()
export class AppService {
  async getHello(): Promise<any> {
    const mnemonic = config.network.mnemonic;
    const wallet = await DirectSecp256k1HdWallet.fromMnemonic(mnemonic, {
      prefix: 'archway',
    });
    const [firstAccount] = await wallet.getAccounts();
    console.log(firstAccount.address);

    const rpcEndpoint = config.network.rpc;
    const client = await SigningStargateClient.connectWithSigner(
      rpcEndpoint,
      wallet,
    );
    const tx = await client.getAllBalances(firstAccount.address);
    await this.sendData(wallet, firstAccount.address);
    await this.getData(firstAccount);
    return firstAccount.address;
  }

  async getData(signer) {
    const cosmWasmClient = await SigningCosmWasmClient.connectWithSigner(
      config.network.rpc,
      signer,
    );
    const contractAddress = config.smc.claim;
    let queryResult = await cosmWasmClient.queryContractSmart(contractAddress, {
      get_count: {},
    });
    console.log(queryResult);
  }

  async sendData(signer, wallet) {
    const check = isOfflineDirectSigner(signer);
    console.log(check)
    const cosmWasmClient = await SigningCosmWasmClient.connectWithSigner(
      config.network.rpc,
      signer,
    );
    const contractAddress = config.smc.claim;
    const handleMsg = { increment: {} };
    const gasPrice = GasPrice.fromString('0.002uconst');
    const txFee = calculateFee(300000, gasPrice);
    console.log('ok');
    let queryResult = await cosmWasmClient.execute(
      wallet,
      contractAddress,
      handleMsg,
      txFee,
    );
    console.log(queryResult);
  }
}
