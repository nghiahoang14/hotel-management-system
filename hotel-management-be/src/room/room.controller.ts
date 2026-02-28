import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  HttpCode,
  HttpStatus,
  Query,
  Patch,
} from '@nestjs/common';
import { RoomService } from './room.service';
import { CreateRoomDto } from './dtos/CreateRoom.dto';
import { UpdateRoomDto } from './dtos/UpdateRoom.dto';

@Controller('admin/rooms')
export class RoomController {
  constructor(private readonly roomService: RoomService) {}

  /* ================= CREATE ================= */
  @Post()
  async create(@Body() dto: CreateRoomDto) {
    return this.roomService.create(dto);
  }

  /* ================= GET ALL ================= */
  @Get()
  async findAll(
    @Query('page') page?: string,
    @Query('limit') limit?: string,
    @Query('roomNumber') roomNumber?: string,
    @Query('status') status?: string,
    @Query('roomTypeId') roomTypeId?: string,
  ) {
    return this.roomService.findAll(
      Number(page) || 1,
      Number(limit) || 10,
      roomNumber,
      status,
      roomTypeId,
    );
  }

  /* ================= GET BY ID ================= */
  @Get(':id')
  async findById(@Param('id') id: string) {
    return this.roomService.findById(id);
  }
  /* ================= UPDATE ================= */
  @Patch(':id')
  async update(@Param('id') id: string, @Body() dto: UpdateRoomDto) {
    return this.roomService.updateRoom(id, dto);
  }

  /* ================= DELETE ================= */
  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async delete(@Param('id') id: string) {
    await this.roomService.delete(id);
  }
}
