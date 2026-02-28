import { IsNotEmpty, IsOptional, IsString, MaxLength } from 'class-validator';

export class CreateFacilitiesDto {
  @IsString()
  @MaxLength(100, { message: 'Title must be at most 100 characters' })
  @IsNotEmpty({ message: 'Title is required' })
  title: string;

  @IsString()
  @IsNotEmpty({ message: 'Description is required' })
  description: string;

  @IsOptional()
  image?: string[];

  @IsOptional()
  @IsString()
  openHours?: string;
}
