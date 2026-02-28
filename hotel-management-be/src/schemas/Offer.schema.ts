import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({ timestamps: true })
export class Offer {
  @Prop({ required: true })
  title: string;
  @Prop({ required: true })
  description: string;
  @Prop({ required: true })
  image: string;
  @Prop({ required: true, type: Date })
  start_date: Date;
  @Prop({ required: false, type: Date })
  end_date: Date;
}
export const OfferSchema = SchemaFactory.createForClass(Offer);
