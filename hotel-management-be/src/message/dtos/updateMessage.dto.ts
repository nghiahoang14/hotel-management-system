import { IsEnum, IsOptional } from 'class-validator';

export class UpdateMessageDto {
  @IsOptional()
  @IsEnum(['unresolved', 'resolved'], {
    message: 'Status must be unresolved or resolved',
  })
  status?: 'unresolved' | 'resolved';
}
