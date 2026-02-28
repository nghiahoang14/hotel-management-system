import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Booking } from 'src/schemas/Booking.schema';
import { BookingSchema } from 'src/schemas/Booking.schema';
@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Booking.name,
        schema: BookingSchema,
      },
    ]),
  ],
  controllers: [],
  providers: [],
})
export class BookingModule {}
