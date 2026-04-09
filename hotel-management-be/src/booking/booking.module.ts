import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Booking } from 'src/schemas/Booking.schema';
import { BookingSchema } from 'src/schemas/Booking.schema';
import { BookingService } from './booking.service';
import { BookingController } from './booking.controller';
import { RoomTypeModule } from 'src/roomType/roomType.module';
import { RoomModule } from 'src/room/room.module';
import { RoomType, RoomTypeSchema } from 'src/schemas/RoomType.schema';
import { Room, RoomSchema } from 'src/schemas/Room.schema';
@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Booking.name,
        schema: BookingSchema,
      },
      { name: Room.name, schema: RoomSchema },
      { name: RoomType.name, schema: RoomTypeSchema },
    ]),
    RoomModule,
    RoomTypeModule,
  ],
  controllers: [BookingController],
  providers: [BookingService],
})
export class BookingModule {}
