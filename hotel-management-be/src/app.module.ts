/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { OffersModule } from './offers/offers.module';
import { FacilitiesModule } from './facilities/facilities.module';
import { DiningModule } from './dining/dining.module';
import { MessageModule } from './message/message.module';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { RoomTypeModule } from './roomType/roomType.module';
import { RoomModule } from './room/room.module';
import { BookingModule } from './booking/booking.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
    uri: configService.get<string>('MONGO_URI'),
  }),
    }),
    AuthModule,
    OffersModule,
    FacilitiesModule,
    DiningModule,
    MessageModule,
    UserModule,
    RoomTypeModule,
    RoomModule,
    BookingModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}