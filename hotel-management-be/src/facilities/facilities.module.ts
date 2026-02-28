import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { MulterModule } from '@nestjs/platform-express';
import { memoryStorage } from 'multer';
import { Facilities, FacilitiesSchema } from 'src/schemas/Facilities.schema';
import { FacilitiesController } from './facilities.controller';
import { FacilitiesService } from './facilities.service';
import { FacilitiesAdminController } from './facilities.admin.controller';
@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Facilities.name,
        schema: FacilitiesSchema,
      },
    ]),
    MulterModule.register({
      storage: memoryStorage(), // ✅ để upload cloudinary
    }),
  ],
  controllers: [FacilitiesController, FacilitiesAdminController],
  providers: [FacilitiesService],
})
export class FacilitiesModule {}
