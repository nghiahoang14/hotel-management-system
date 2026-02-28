import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Message, MessageSchema } from 'src/schemas/Message.schema';
import { MessageController } from './message.controller';
import { AdminMessageController } from './message.admin.controller';
import { MessageService } from './message.service';

import { MailModule } from 'src/mail/mail.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Message.name,
        schema: MessageSchema,
      },
    ]),
    MailModule,
  ],
  controllers: [MessageController, AdminMessageController],
  providers: [MessageService],
})
export class MessageModule {}
