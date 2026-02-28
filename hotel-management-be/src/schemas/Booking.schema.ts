import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Types } from 'mongoose';

@Schema({ timestamps: true })
export class Booking {
  @Prop()
  checkIn: Date;

  @Prop()
  checkOut: Date;

  @Prop([
    {
      roomType: { type: Types.ObjectId, ref: 'RoomType' },
      rooms: [{ type: Types.ObjectId, ref: 'Room' }],
      pricePerNight: Number,
      quantity: Number,
      subtotal: Number,
    },
  ])
  items: any[];

  @Prop()
  nights: number;

  @Prop()
  totalPrice: number;

  @Prop({ default: 'pending' })
  status: string;

  @Prop()
  guestInfo: any;
}
export const BookingSchema = SchemaFactory.createForClass(Booking);
