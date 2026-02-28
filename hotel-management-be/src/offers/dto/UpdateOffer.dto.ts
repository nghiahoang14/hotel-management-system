import { PartialType } from '@nestjs/mapped-types';
import { CreateOfferDto } from './CreateOffer.dto';

export class UpdateOfferDto extends PartialType(CreateOfferDto) {}
