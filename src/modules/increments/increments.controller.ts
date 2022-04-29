import { Controller, Get } from '@nestjs/common';
import { IncrementsService } from './increments.service';

@Controller('increments')
export class IncrementsController {
  constructor(private readonly incrementsService: IncrementsService) {}

  @Get('')
  async listNumber() {
    return await this.incrementsService.getNumber();
  }

  @Get('add')
  async addNumber() {
    return await this.incrementsService.incrementNumber();
  }
}
