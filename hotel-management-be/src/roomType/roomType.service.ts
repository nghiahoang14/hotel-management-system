import { HttpException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import cloudinary from 'src/config/cloudinary';
import { Readable } from 'stream';
import { RoomType } from 'src/schemas/RoomType.schema';
import { CreateRoomTypeDto } from './dtos/createRoomType.dto';
import { UpdateRoomTypeDto } from './dtos/UpdateRoomType.dto';
import slugify from 'slugify';

@Injectable()
export class RoomTypeService {
  constructor(
    @InjectModel(RoomType.name)
    private readonly roomTypeModel: Model<RoomType>,
  ) {}

  // ===============================
  // Upload ảnh Cloudinary
  // ===============================
  private uploadToCloudinary(file: Express.Multer.File): Promise<string> {
    return new Promise((resolve, reject) => {
      const uploadStream = cloudinary.uploader.upload_stream(
        { folder: 'room-types' },
        (error, result) => {
          // eslint-disable-next-line @typescript-eslint/prefer-promise-reject-errors
          if (error) return reject(error);
          if (!result) return reject(new Error('Upload failed'));
          resolve(result.secure_url);
        },
      );
      Readable.from(file.buffer).pipe(uploadStream);
    });
  }

  // ===============================
  // CREATE ROOM TYPE
  // ===============================
  async createRoomType(dto: CreateRoomTypeDto, files?: Express.Multer.File[]) {
    const slug = slugify(dto.name, {
      lower: true,
      strict: true,
    });

    const existed = await this.roomTypeModel.findOne({
      $or: [{ name: dto.name }, { slug }],
    });

    if (existed) {
      throw new HttpException('Room type already exists', 409);
    }

    let images: string[] = dto.images || [];

    if (files?.length) {
      images = await Promise.all(
        files.map((file) => this.uploadToCloudinary(file)),
      );
    }

    return this.roomTypeModel.create({
      ...dto,
      slug,
      images,
    });
  }

  // ===============================
  // GET LIST
  // ===============================
  async findAllRoomTypes(page = 1, limit = 10, name?: string) {
    const skip = (page - 1) * limit;
    const filter = name ? { name: { $regex: name, $options: 'i' } } : {};

    const [data, total] = await Promise.all([
      this.roomTypeModel
        .find(filter)
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit),
      this.roomTypeModel.countDocuments(filter),
    ]);

    return {
      data,
      page,
      limit,
      total,
      totalPages: Math.ceil(total / limit),
    };
  }

  // ===============================
  // GET BY ID
  // ===============================
  async findRoomTypeById(id: string) {
    const roomType = await this.roomTypeModel.findById(id);
    if (!roomType) throw new HttpException('Room type not found', 404);
    return roomType;
  }

  // ===============================
  // GET BY SLUG (CHO CLIENT)
  // ===============================
  async findRoomTypeBySlug(slug: string) {
    const roomType = await this.roomTypeModel.findOne({ slug });
    if (!roomType) throw new HttpException('Room type not found', 404);
    return roomType;
  }

  // ===============================
  // UPDATE ROOM TYPE
  // ===============================
  async updateRoomType(
    id: string,
    dto: UpdateRoomTypeDto,
    files?: Express.Multer.File[],
    oldImages?: string[],
  ) {
    let images: string[] = oldImages || dto.images || [];

    if (files?.length) {
      const uploaded = await Promise.all(
        files.map((file) => this.uploadToCloudinary(file)),
      );
      images = [...images, ...uploaded];
    }

    let slug;
    if (dto.name) {
      slug = slugify(dto.name, {
        lower: true,
        strict: true,
      });
    }

    const updated = await this.roomTypeModel.findByIdAndUpdate(
      id,
      {
        ...dto,
        ...(slug && { slug }),
        images,
      },
      { new: true },
    );

    if (!updated) throw new HttpException('Room type not found', 404);

    return updated;
  }

  // ===============================
  // DELETE ROOM TYPE
  // ===============================
  async deleteRoomType(id: string) {
    const roomType = await this.roomTypeModel.findById(id);
    if (!roomType) throw new HttpException('Room type not found', 404);

    if (roomType.images?.length) {
      for (const img of roomType.images) {
        try {
          const publicId = img
            .split('/')
            .slice(img.split('/').findIndex((p) => p.startsWith('v')) + 1)
            .join('/')
            .replace(/\.[^/.]+$/, '');
          await cloudinary.uploader.destroy(publicId);
        } catch (err) {
          console.error('Failed to delete image:', err);
        }
      }
    }

    await this.roomTypeModel.findByIdAndDelete(id);
    return { message: 'Room type deleted successfully' };
  }
}
