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
  UploadedFile,
  UseInterceptors,
  ValidationPipe,
} from '@nestjs/common';
import mongoose from 'mongoose';
import { OffersService } from './offers.service';
import { CreateOfferDto } from './dto/CreateOffer.dto';
import { UpdateOfferDto } from './dto/UpdateOffer.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import * as multer from 'multer';

@Controller('admin/offers') // prefix admin
export class OffersAdminController {
  constructor(private offersService: OffersService) {}

  // ✅ CREATE OFFER (Admin)
  @Post()
  @UseInterceptors(
    FileInterceptor('image', {
      storage: multer.memoryStorage(),
    }),
  )
  createOffer(
    @UploadedFile() file: Express.Multer.File,
    @Body(new ValidationPipe()) dto: CreateOfferDto,
  ) {
    return this.offersService.createOffer(dto, file);
  }

  // ✅ GET ALL OFFERS (Admin)
  @Get()
  getOffers(
    @Query('page') page = 1,
    @Query('limit') limit = 10,
    @Query('title') title?: string,
  ) {
    return this.offersService.getOffers(Number(page), Number(limit), title);
  }

  // ✅ GET BY ID (Admin)
  @Get(':id')
  async getOfferById(@Param('id') id: string) {
    const isValid = mongoose.Types.ObjectId.isValid(id);
    if (!isValid) throw new HttpException('Offer not found', 404);

    const offer = await this.offersService.getOfferById(id);
    if (!offer) throw new HttpException('Offer not found', 404);

    return offer;
  }

  @Patch(':id')
  @UseInterceptors(
    FileInterceptor('image', {
      storage: multer.memoryStorage(),
    }),
  )
  updateOffer(
    @Param('id') id: string,
    @UploadedFile() file: Express.Multer.File,
    @Body(new ValidationPipe()) dto: UpdateOfferDto,
  ) {
    return this.offersService.updateOffer(id, dto, file);
  }
  // ✅ DELETE OFFER (Admin)
  @Delete(':id')
  async deleteOffer(@Param('id') id: string) {
    const isValid = mongoose.Types.ObjectId.isValid(id);
    if (!isValid) throw new HttpException('Invalid Id', 400);

    const deletedOffer = await this.offersService.deleteOffer(id);
    if (!deletedOffer) throw new HttpException('Offer not found', 404);

    return { message: 'Deleted successfully' };
  }
}
