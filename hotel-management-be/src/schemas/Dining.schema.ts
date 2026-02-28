import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({ timestamps: true })
export class Dining {
  @Prop({ required: true })
  title: string;

  @Prop()
  subtitle?: string;

  @Prop({ required: true })
  description: string;

  @Prop({ type: [String], required: true })
  openHours: string[];

  @Prop()
  hotline?: string;

  @Prop({ type: [String], required: true })
  image: string[];

  @Prop({
    type: [
      {
        label: String,
        url: String,
      },
    ],
  })
  menu?: {
    label: string;
    url: string;
  }[];
}

export const DiningSchema = SchemaFactory.createForClass(Dining);
