import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({ timestamps: true })
export class RoomType {
  @Prop({ required: true, unique: true })
  name: string;

  @Prop({ required: true, unique: true, sparse: true })
  slug: string;

  @Prop()
  description: string;

  @Prop({ required: true })
  price: number;

  @Prop()
  size: string;

  @Prop()
  bed: string;

  @Prop()
  view: string;

  @Prop()
  people: string;

  @Prop({ type: [String], default: [] })
  amenities: string[];

  @Prop({ type: [String], default: [] })
  images: string[];
}

export const RoomTypeSchema = SchemaFactory.createForClass(RoomType);
