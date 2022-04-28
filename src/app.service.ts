import { Injectable } from '@nestjs/common';
import { DirectSecp256k1HdWallet } from '@cosmjs/proto-signing';
import { SigningStargateClient } from '@cosmjs/stargate';
import config from './configs/config';
import { stringToPath } from '@cosmjs/crypto';
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
    console.log(tx);
    return firstAccount.address;
  }
}
