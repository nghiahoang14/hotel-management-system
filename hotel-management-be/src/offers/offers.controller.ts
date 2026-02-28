import { Controller, Get, HttpException, Param } from '@nestjs/common';
import mongoose from 'mongoose';
import { OffersService } from './offers.service';

@Controller('offers')
export class OffersController {
  constructor(private offersService: OffersService) {}

  // ✅ GET ALL
  @Get()
  getOffers() {
    return this.offersService.getOffers();
  }
  //   Get active offer
  @Get('active')
  getActiveOffers() {
    return this.offersService.getActiveOffers();
  }
  // ✅ GET BY ID
  @Get(':id')
  async getOfferById(@Param('id') id: string) {
    const isValid = mongoose.Types.ObjectId.isValid(id);
    if (!isValid) throw new HttpException('Offer not found', 404);

    const findOffer = await this.offersService.getOfferById(id);
    if (!findOffer) throw new HttpException('Offer not found', 404);

    return findOffer;
  }
}
