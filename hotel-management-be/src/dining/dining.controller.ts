import { Body, Controller, Get, HttpException, Param } from '@nestjs/common';
import mongoose from 'mongoose';
import { DiningService } from './dining.service';

@Controller('dining')
export class DiningController {
  constructor(private diningService: DiningService) {}

  // ✅ GET ALL
  @Get()
  getDining() {
    return this.diningService.getDining();
  }
  // ✅ GET BY ID
  @Get(':id')
  async getDiningById(@Param('id') id: string) {
    const isValid = mongoose.Types.ObjectId.isValid(id);
    if (!isValid) throw new HttpException('Dining not found', 404);

    const findDining = await this.diningService.getDiningById(id);
    if (!findDining) throw new HttpException('Dining not found', 404);

    return findDining;
  }
}
