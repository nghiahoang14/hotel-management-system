import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Types } from 'mongoose';

@Schema({ timestamps: true })
export class Booking {
  @Prop()
  checkIn!: Date;

  @Prop()
  checkOut!: Date;

  @Prop([
    {
      roomType: { type: Types.ObjectId, ref: 'RoomType' },
      rooms: [{ type: Types.ObjectId, ref: 'Room' }],
      pricePerNight: Number,
      quantity: Number,
      subtotal: Number,
    },
  ])
  items!: any[];

  @Prop()
  nights!: number;

  @Prop()
  totalPrice!: number;

  @Prop({ default: 'pending' })
  status!: string;

  @Prop({
    type: {
      fullName: String,
      phone: String,
      email: String,
    },
  })
  guestInfo!: {
    fullName: string;
    phone: string;
    email: string;
  };
}
export const BookingSchema = SchemaFactory.createForClass(Booking);
