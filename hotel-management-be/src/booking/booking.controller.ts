import {
  Body,
  Controller,
  Get,
  Post,
  Patch,
  Param,
  Query,
  HttpException,
} from '@nestjs/common';
import mongoose from 'mongoose';
import { BookingService } from './booking.service';

@Controller('booking')
export class BookingController {
  constructor(private bookingService: BookingService) {}

  // =====================================================
  // 🔍 SEARCH AVAILABLE ROOM TYPES
  // =====================================================
  @Get('search')
  async searchAvailable(
    @Query('checkIn') checkIn: string,
    @Query('checkOut') checkOut: string,
    @Query('adults') adults?: string,
    @Query('children') children?: string,
    @Query('roomTypeId') roomTypeId?: string,
  ) {
    if (!checkIn || !checkOut) {
      throw new HttpException('Missing checkIn or checkOut', 400);
    }

    if (roomTypeId && !mongoose.Types.ObjectId.isValid(roomTypeId)) {
      throw new HttpException('Invalid roomTypeId', 400);
    }

    return this.bookingService.searchAvailable(
      checkIn,
      checkOut,
      adults ? Number(adults) : undefined,
      children ? Number(children) : undefined,
      roomTypeId,
    );
  }

  // =====================================================
  // 🏨 CREATE BOOKING (CLIENT)
  // =====================================================
  @Post()
  async createBooking(@Body() dto: any) {
    if (!dto.checkIn || !dto.checkOut || !dto.items?.length) {
      throw new HttpException('Invalid booking data', 400);
    }

    return this.bookingService.createBooking(dto);
  }

  // =====================================================
  // ❌ CANCEL BOOKING (CLIENT)
  // =====================================================
  @Patch('cancel/:id')
  async cancelBooking(@Param('id') id: string) {
    const isValid = mongoose.Types.ObjectId.isValid(id);
    if (!isValid) throw new HttpException('Booking not found', 404);

    return this.bookingService.cancelBooking(id);
  }
}
