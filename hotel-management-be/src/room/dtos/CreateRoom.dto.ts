import {
  IsString,
  IsNotEmpty,
  IsOptional,
  IsIn,
  IsMongoId,
} from 'class-validator';

export class CreateRoomDto {
  @IsString()
  @IsNotEmpty()
  roomNumber!: string;

  @IsOptional()
  @IsIn(['available', 'unavailable'])
  status?: 'available' | 'unavailable';

  @IsMongoId()
  @IsNotEmpty()
  roomType!: string;
}
