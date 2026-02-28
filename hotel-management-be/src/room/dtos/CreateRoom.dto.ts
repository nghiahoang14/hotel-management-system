import {
  IsString,
  IsNotEmpty,
  IsOptional,
  IsMongoId,
  IsIn,
} from 'class-validator';

export class CreateRoomDto {
  @IsString()
  @IsNotEmpty()
  roomNumber: string;

  @IsOptional()
  @IsIn(['available', 'unavailable'])
  status?: 'available' | 'unavailable';

  @IsMongoId()
  roomType: string; // ObjectId của RoomType
}
