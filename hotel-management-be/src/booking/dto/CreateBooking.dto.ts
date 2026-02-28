import { IsDateString } from 'class-validator';

export class CreateBookingDto {
  @IsDateString()
  checkIn: string;

  @IsDateString()
  checkOut: string;

  rooms: {
    roomTypeId: string;
    quantity: number;
  }[];

  guestInfo: {
    name: string;
    email: string;
    phone: string;
  };
}
