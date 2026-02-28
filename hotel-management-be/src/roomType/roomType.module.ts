import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { MulterModule } from '@nestjs/platform-express';
import { memoryStorage } from 'multer';
import { RoomType, RoomTypeSchema } from 'src/schemas/RoomType.schema';
import { RoomTypeAdminController } from './roomType.admin.controller';
import { RoomTypeController } from './roomType.controller';
import { RoomTypeService } from './roomType.service';
@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: RoomType.name,
        schema: RoomTypeSchema,
      },
    ]),
    MulterModule.register({
      storage: memoryStorage(), // ✅ để upload cloudinary
    }),
  ],
  controllers: [RoomTypeAdminController, RoomTypeController],
  providers: [RoomTypeService],
})
export class RoomTypeModule {}
