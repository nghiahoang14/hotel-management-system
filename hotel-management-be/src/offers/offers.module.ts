import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Offer, OfferSchema } from 'src/schemas/Offer.schema';
import { OffersController } from './offers.controller';
import { OffersService } from './offers.service';
import { OffersAdminController } from './offers.admin.controller';
import { MulterModule } from '@nestjs/platform-express';
import { memoryStorage } from 'multer';
@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Offer.name,
        schema: OfferSchema,
      },
    ]),
    MulterModule.register({
      storage: memoryStorage(), // ✅ để upload cloudinary
    }),
  ],
  controllers: [OffersController, OffersAdminController],
  providers: [OffersService],
})
export class OffersModule {}
