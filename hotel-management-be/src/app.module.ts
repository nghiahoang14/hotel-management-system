/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { OffersModule } from './offers/offers.module';
import { ConfigModule } from '@nestjs/config';
import { FacilitiesModule } from './facilities/facilities.module';
import { DiningModule } from './dining/dining.module';
import { MessageModule } from './message/message.module';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { RoomTypeModule } from './roomType/roomType.module';
import { RoomModule } from './room/room.module';
@Module({
  imports: [MongooseModule.forRoot('mongodb://admin:admin123@localhost:27017/hotel-management?authSource=admin'),AuthModule,  OffersModule, FacilitiesModule,DiningModule,MessageModule,UserModule,RoomTypeModule,RoomModule, ConfigModule.forRoot({
    isGlobal: true,
  }),],
  controllers: [],
  providers: [],
})
export class AppModule { }
