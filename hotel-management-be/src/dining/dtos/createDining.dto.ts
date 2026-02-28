import {
  IsArray,
  IsNotEmpty,
  IsOptional,
  IsString,
  Matches,
  MaxLength,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';

class MenuItemDto {
  @IsString()
  @IsNotEmpty()
  label: string;

  @IsString()
  @IsNotEmpty()
  url: string;
}

export class CreateDiningDto {
  @IsString()
  @MaxLength(100, { message: 'Title must be at most 100 characters' })
  @IsNotEmpty({ message: 'Title is required' })
  title: string;

  @IsOptional()
  @IsString()
  subtitle?: string;

  @IsString()
  @IsNotEmpty({ message: 'Description is required' })
  description: string;

  @IsArray()
  @IsString({ each: true })
  @IsOptional()
  openHours?: string[];

  @IsOptional()
  @IsString()
  @Matches(/^\d{10}$/, {
    message: 'Hotline must be exactly 10 digits',
  })
  hotline?: string;

  @IsOptional()
  @IsArray()
  image?: string[];

  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => MenuItemDto)
  menu?: MenuItemDto[];
}
