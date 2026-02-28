import { PartialType } from '@nestjs/mapped-types';
import { CreateFacilitiesDto } from './CreateFacilities.dto';

export class UpdateFacilitiesDto extends PartialType(CreateFacilitiesDto) {}
