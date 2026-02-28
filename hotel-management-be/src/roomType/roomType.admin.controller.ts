import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  Param,
  Patch,
  Post,
  Query,
  UploadedFiles,
  UseInterceptors,
  ValidationPipe,
} from '@nestjs/common';
import mongoose from 'mongoose';
import { FilesInterceptor } from '@nestjs/platform-express';
import * as multer from 'multer';
import { RoomTypeService } from './roomType.service';
import { CreateRoomTypeDto } from './dtos/createRoomType.dto';
import { UpdateRoomTypeDto } from './dtos/UpdateRoomType.dto';
// import { Roles } from 'src/auth/decorators/roles.decorator';
// import { AuthGuard } from '@nestjs/passport';
// import { RolesGuard } from 'src/auth/guards/roles.guard';
// @UseGuards(AuthGuard('jwt'), RolesGuard)
// @Roles('admin')
@Controller('admin/room-type') // prefix admin
export class RoomTypeAdminController {
  constructor(private roomTypeService: RoomTypeService) {}

  // ✅ CREATE room type
  @Post()
  @UseInterceptors(
    FilesInterceptor('images', 10, {
      storage: multer.memoryStorage(),
    }),
  )
  createRoomtype(
    @UploadedFiles() files: Express.Multer.File[],
    @Body(new ValidationPipe()) dto: CreateRoomTypeDto,
  ) {
    return this.roomTypeService.createRoomType(dto, files);
  }

  // ✅ GET ALL room type
  @Get()
  getRoomTypes(
    @Query('page') page?: string,
    @Query('limit') limit?: string,
    @Query('title') title?: string,
  ) {
    return this.roomTypeService.findAllRoomTypes(
      Number(page),
      Number(limit),
      title,
    );
  }

  // ✅ GET ROOM TYPE BY ID
  @Get(':id')
  async getRoomTypeById(@Param('id') id: string) {
    const isValid = mongoose.Types.ObjectId.isValid(id);
    if (!isValid) throw new HttpException('Room type not found', 404);
    const roomType = await this.roomTypeService.findRoomTypeById(id);
    if (!roomType) throw new HttpException('Room type not found', 404);

    return roomType;
  }

  // ✅ UPDATE ROOM TYPE
  @Patch(':id')
  @UseInterceptors(
    FilesInterceptor('images', 10, {
      storage: multer.memoryStorage(),
    }),
  )
  updateRoomType(
    @Param('id') id: string,
    @UploadedFiles() files: Express.Multer.File[],
    @Body(new ValidationPipe()) dto: UpdateRoomTypeDto,
    @Body('oldImages') oldImages: string[],
  ) {
    return this.roomTypeService.updateRoomType(id, dto, files, oldImages);
  }

  // ✅ DELETE ROOM TYPE
  @Delete(':id')
  async deleteRoomType(@Param('id') id: string) {
    const isValid = mongoose.Types.ObjectId.isValid(id);
    if (!isValid) throw new HttpException('Invalid Id', 400);

    const deletedRoomType = await this.roomTypeService.deleteRoomType(id);
    if (!deletedRoomType) throw new HttpException('Room type not found', 404);

    return { message: 'Room type deleted successfully' };
  }
}
