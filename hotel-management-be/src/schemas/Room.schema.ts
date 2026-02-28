import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Types } from 'mongoose';
@Schema({ timestamps: true })
export class Room {
  @Prop({ required: true, unique: true })
  roomNumber: string;

  @Prop({ default: 'available', enum: ['available', 'unavailable'] })
  status: string;

  @Prop({ type: Types.ObjectId, ref: 'RoomType', required: true })
  roomType: Types.ObjectId;
}
export const RoomSchema = SchemaFactory.createForClass(Room);
