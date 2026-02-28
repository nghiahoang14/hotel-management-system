import { PartialType } from '@nestjs/mapped-types';
import { CreateDiningDto } from './createDining.dto';

export class UpdateDiningDto extends PartialType(CreateDiningDto) {}
