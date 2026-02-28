import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { MulterModule } from '@nestjs/platform-express';
import { memoryStorage } from 'multer';

import { Dining, DiningSchema } from 'src/schemas/Dining.schema';
import { DiningService } from './dining.service';
import { DiningController } from './dining.controller';
import { DiningAdminController } from './dining.admin.controller';
@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Dining.name,
        schema: DiningSchema,
      },
    ]),
    MulterModule.register({
      storage: memoryStorage(), // ✅ để upload cloudinary
    }),
  ],
  controllers: [DiningController, DiningAdminController],
  providers: [DiningService],
})
export class DiningModule {}
