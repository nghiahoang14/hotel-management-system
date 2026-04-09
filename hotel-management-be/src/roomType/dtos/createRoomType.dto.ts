import {
  IsString,
  IsNotEmpty,
  IsOptional,
  IsNumber,
  IsArray,
  IsUrl,
  Min,
  ArrayNotEmpty,
  IsInt,
} from 'class-validator';
import { Type } from 'class-transformer';

export class CreateRoomTypeDto {
  @IsString()
  @IsNotEmpty({ message: 'Name is required' })
  name: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsNumber()
  @Type(() => Number)
  @Min(0, { message: 'Price must be greater than or equal to 0' })
  price: number;

  @IsString()
  @IsOptional()
  size?: string;

  @IsString()
  @IsOptional()
  bed?: string;

  @IsString()
  @IsOptional()
  view?: string;

  @IsInt()
  @Type(() => Number)
  @Min(0)
  maxPeople?: number;

  @IsOptional()
  @IsInt()
  @Type(() => Number)
  @Min(0)
  maxAdults?: number;

  @IsOptional()
  @IsInt()
  @Type(() => Number)
  @Min(0)
  maxChildren?: number;

  @IsArray()
  @IsString({ each: true })
  @ArrayNotEmpty({ message: 'Amenities must not be empty' })
  @IsOptional()
  amenities?: string[];

  @IsArray()
  @IsUrl({}, { each: true }) // ✅ mỗi phần tử là URL hợp lệ
  @ArrayNotEmpty({ message: 'Images must not be empty' })
  @IsOptional()
  images?: string[];
}
