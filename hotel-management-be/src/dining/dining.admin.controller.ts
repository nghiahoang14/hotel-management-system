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
  UseGuards,
  UseInterceptors,
  ValidationPipe,
} from '@nestjs/common';
import mongoose from 'mongoose';
import { FilesInterceptor } from '@nestjs/platform-express';
import * as multer from 'multer';
import { DiningService } from './dining.service';
import { CreateDiningDto } from './dtos/createDining.dto';
import { UpdateDiningDto } from './dtos/updateDining.dto';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from 'src/auth/guards/roles.guard';
@UseGuards(AuthGuard('jwt'), RolesGuard)
@Roles('admin')
@Controller('admin/dining') // prefix admin
export class DiningAdminController {
  constructor(private diningService: DiningService) {}

  // ✅ CREATE DINING
  @Post()
  @UseInterceptors(
    FilesInterceptor('images', 10, {
      storage: multer.memoryStorage(),
    }),
  )
  createDining(
    @UploadedFiles() files: Express.Multer.File[],
    @Body(new ValidationPipe()) dto: CreateDiningDto,
  ) {
    return this.diningService.createDining(dto, files);
  }

  // ✅ GET ALL DINING
  @Get()
  getDining(
    @Query('page') page?: string,
    @Query('limit') limit?: string,
    @Query('title') title?: string,
  ) {
    return this.diningService.getDining(Number(page), Number(limit), title);
  }

  // ✅ GET Dining BY ID
  @Get(':id')
  async getDiningById(@Param('id') id: string) {
    const isValid = mongoose.Types.ObjectId.isValid(id);
    if (!isValid) throw new HttpException('Dining not found', 404);

    const dining = await this.diningService.getDiningById(id);
    if (!dining) throw new HttpException('Dining not found', 404);

    return dining;
  }

  // ✅ UPDATE DINING
  @Patch(':id')
  @UseInterceptors(
    FilesInterceptor('images', 10, {
      storage: multer.memoryStorage(),
    }),
  )
  updateDining(
    @Param('id') id: string,
    @UploadedFiles() files: Express.Multer.File[],
    @Body(new ValidationPipe()) dto: UpdateDiningDto,
    @Body('oldImages') oldImages: string[],
  ) {
    return this.diningService.updateDining(id, dto, files, oldImages);
  }

  // ✅ DELETE DINING
  @Delete(':id')
  async deleteDining(@Param('id') id: string) {
    const isValid = mongoose.Types.ObjectId.isValid(id);
    if (!isValid) throw new HttpException('Invalid Id', 400);

    const deletedDining = await this.diningService.deleteDining(id);
    if (!deletedDining) throw new HttpException('Dining not found', 404);

    return { message: 'Dining deleted successfully' };
  }
}
