import { PartialType } from '@nestjs/mapped-types';

import { CreateRoomDto } from './CreateRoom.dto';

export class UpdateRoomDto extends PartialType(CreateRoomDto) {}
