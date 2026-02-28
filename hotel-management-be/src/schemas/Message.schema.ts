import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({ timestamps: true })
export class Message {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  email: string;

  @Prop({ required: true })
  phone: string;

  @Prop()
  message?: string;

  @Prop({ default: 'unresolved', enum: ['unresolved', 'resolved'] })
  status: string;
}

export const MessageSchema = SchemaFactory.createForClass(Message);
