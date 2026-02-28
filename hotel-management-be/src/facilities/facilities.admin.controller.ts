import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  Param,
  Patch,
  Post,
  Query,
  UploadedFiles,
  UseInterceptors,
  ValidationPipe,
} from '@nestjs/common';
import mongoose from 'mongoose';
import { FacilitiesService } from './facilities.service';
import { FilesInterceptor } from '@nestjs/platform-express';
import * as multer from 'multer';
import { CreateFacilitiesDto } from './dtos/CreateFacilities.dto';
import { UpdateFacilitiesDto } from './dtos/UpdateFacilities.dto';

@Controller('admin/facilities') // prefix admin
export class FacilitiesAdminController {
  constructor(private facilitiesService: FacilitiesService) {}

  // ✅ CREATE FACILITY
  @Post()
  @UseInterceptors(
    FilesInterceptor('images', 10, {
      storage: multer.memoryStorage(),
    }),
  )
  createFacility(
    @UploadedFiles() files: Express.Multer.File[],
    @Body(new ValidationPipe()) dto: CreateFacilitiesDto,
  ) {
    return this.facilitiesService.createFacility(dto, files);
  }

  // ✅ GET ALL FACILITIES
  @Get()
  getFacilities(
    @Query('page') page?: string,
    @Query('limit') limit?: string,
    @Query('title') title?: string,
  ) {
    return this.facilitiesService.getFacilities(
      Number(page),
      Number(limit),
      title,
    );
  }

  // ✅ GET FACILITY BY ID
  @Get(':id')
  async getFacilityById(@Param('id') id: string) {
    const isValid = mongoose.Types.ObjectId.isValid(id);
    if (!isValid) throw new HttpException('Facility not found', 404);

    const facility = await this.facilitiesService.getFacilityById(id);
    if (!facility) throw new HttpException('Facility not found', 404);

    return facility;
  }

  // ✅ UPDATE FACILITY
  @Patch(':id')
  @UseInterceptors(
    FilesInterceptor('images', 10, {
      storage: multer.memoryStorage(),
    }),
  )
  updateFacility(
    @Param('id') id: string,
    @UploadedFiles() files: Express.Multer.File[],
    @Body(new ValidationPipe()) dto: UpdateFacilitiesDto,
    @Body('oldImages') oldImages: string[],
  ) {
    return this.facilitiesService.updateFacility(id, dto, files, oldImages);
  }

  // ✅ DELETE FACILITY
  @Delete(':id')
  async deleteFacility(@Param('id') id: string) {
    const isValid = mongoose.Types.ObjectId.isValid(id);
    if (!isValid) throw new HttpException('Invalid Id', 400);

    const deletedFacility = await this.facilitiesService.deleteFacility(id);
    if (!deletedFacility) throw new HttpException('Facility not found', 404);

    return { message: 'Facility deleted successfully' };
  }
}
