import { Body, Controller, Get, HttpException, Param } from '@nestjs/common';
import mongoose from 'mongoose';
import { FacilitiesService } from './facilities.service';
@Controller('facilities')
export class FacilitiesController {
  constructor(private facilitiesService: FacilitiesService) {}

  // ✅ GET ALL
  @Get()
  getFacilities() {
    return this.facilitiesService.getFacilities();
  }
  // ✅ GET BY ID
  @Get(':id')
  async getFacilityById(@Param('id') id: string) {
    const isValid = mongoose.Types.ObjectId.isValid(id);
    if (!isValid) throw new HttpException('Facility not found', 404);

    const findFacility = await this.facilitiesService.getFacilityById(id);
    if (!findFacility) throw new HttpException('Facility not found', 404);

    return findFacility;
  }
}
