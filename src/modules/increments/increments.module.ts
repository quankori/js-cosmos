import { Module } from '@nestjs/common';
import { CosmosModule } from '../cosmos/cosmos.module';
import { IncrementsController } from './increments.controller';
import { IncrementsService } from './increments.service';

@Module({
  imports: [CosmosModule],
  controllers: [IncrementsController],
  providers: [IncrementsService],
  exports: [IncrementsService],
})
export class IncrementsModule {}
