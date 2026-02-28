import { Body, Controller, Get, Param } from '@nestjs/common';

import { RoomTypeService } from './roomType.service';

@Controller('room-type')
export class RoomTypeController {
  constructor(private roomTypeService: RoomTypeService) {}

  // ✅ GET ALL
  @Get()
  getRoomTypes() {
    return this.roomTypeService.findAllRoomTypes();
  }
  @Get(':slug')
  getBySlug(@Param('slug') slug: string) {
    return this.roomTypeService.findRoomTypeBySlug(slug);
  }
}
