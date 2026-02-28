import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({ timestamps: true })
export class Facilities {
  @Prop({ required: true })
  title: string;

  @Prop({ required: true })
  description: string;

  @Prop({ type: [String], required: true })
  image: string[];

  @Prop()
  openHours?: string;
}

export const FacilitiesSchema = SchemaFactory.createForClass(Facilities);
