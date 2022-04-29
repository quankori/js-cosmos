import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CosmosModule } from './modules/cosmos/cosmos.module';
import { IncrementsModule } from './modules/increments/increments.module';

@Module({
  imports: [IncrementsModule, CosmosModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
