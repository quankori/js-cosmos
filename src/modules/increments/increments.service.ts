import { HttpException, Injectable } from '@nestjs/common';
import config from 'src/configs/config';
import { CosmosService } from '../cosmos/cosmos.service';

@Injectable()
export class IncrementsService {
  constructor(private cosmosService: CosmosService) {}

  async getNumber(): Promise<any> {
    const signer = await this.cosmosService.getSigner();
    const query = {
      get_count: {},
    };
    const result = await this.cosmosService.query(
      signer,
      config.smc.increments,
      query,
    );
    return result;
  }

  async incrementNumber(): Promise<any> {
    const signer = await this.cosmosService.getSigner();
    const account = await this.cosmosService.getAccount(signer);
    const query = { increment: {} };
    const result = await this.cosmosService.execute(
      signer,
      account.address,
      config.smc.increments,
      query,
    );
    return result;
  }
}
