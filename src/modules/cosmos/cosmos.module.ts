import { Module } from '@nestjs/common';
import { CosmosController } from './cosmos.controller';
import { CosmosService } from './cosmos.service';

@Module({
  imports: [],
  controllers: [CosmosController],
  providers: [CosmosService],
  exports: [CosmosService],
})
export class CosmosModule {}
