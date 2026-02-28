import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  Matches,
  MaxLength,
} from 'class-validator';

export class CreateMessageDto {
  @IsString()
  @IsNotEmpty({ message: 'Name is required' })
  @MaxLength(100, { message: 'Name must be at most 100 characters' })
  name: string;

  @IsString()
  @IsNotEmpty({ message: 'Phone is required' })
  @Matches(/^\d{10}$/, {
    message: 'Phone must be exactly 10 digits',
  })
  phone: string;

  @IsEmail({}, { message: 'Invalid email format' })
  @IsNotEmpty({ message: 'Email is required' })
  email: string;

  @IsString()
  @IsOptional()
  @MaxLength(1000, { message: 'Message must be at most 1000 characters' })
  message: string;
}
