import { IsBoolean, IsEnum, IsOptional, IsString } from 'class-validator';

export class UpdateUserDto {
  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsEnum(['admin', 'staff'])
  role?: 'admin' | 'staff';

  @IsOptional()
  @IsBoolean()
  isActive?: boolean;
}
