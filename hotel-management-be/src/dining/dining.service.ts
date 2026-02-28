import { HttpException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import cloudinary from 'src/config/cloudinary';
import { Readable } from 'stream';
import { Dining } from 'src/schemas/Dining.schema';
import { CreateDiningDto } from './dtos/createDining.dto';
import { UpdateDiningDto } from './dtos/updateDining.dto';

@Injectable()
export class DiningService {
  constructor(
    @InjectModel(Dining.name)
    private readonly DiningModel: Model<Dining>,
  ) {}

  // Upload ảnh lên Cloudinary
  private uploadToCloudinary(file: Express.Multer.File): Promise<string> {
    return new Promise((resolve, reject) => {
      const uploadStream = cloudinary.uploader.upload_stream(
        { folder: 'dining' },
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

  // ✅ Tạo dining (nhận nhiều file)
  async createDining(dto: CreateDiningDto, files?: Express.Multer.File[]) {
    let imageUrls: string[] = dto.image || [];

    if (files && files.length > 0) {
      const urls = await Promise.all(
        files.map((file) => this.uploadToCloudinary(file)),
      );
      imageUrls = urls;
    }

    const dining = new this.DiningModel({
      ...dto,
      image: imageUrls,
    });

    return dining.save();
  }
  // ✅ Lấy tất cả
  async getDining(page = 1, limit = 10, title?: string) {
    const skip = (page - 1) * limit;

    const filter = title ? { title: { $regex: title, $options: 'i' } } : {};

    const [data, total] = await Promise.all([
      this.DiningModel.find(filter)
        .sort({ createdAt: 1 })
        .skip(skip)
        .limit(limit),
      this.DiningModel.countDocuments(filter),
    ]);

    return {
      data,
      page,
      limit,
      total,
      totalPages: Math.ceil(total / limit),
    };
  }

  // ✅ Lấy theo ID
  async getDiningById(id: string) {
    const dining = await this.DiningModel.findById(id);
    if (!dining) throw new HttpException('dining not found', 404);
    return dining;
  }

  // ✅ Cập nhật
  async updateDining(
    id: string,
    dto: UpdateDiningDto,
    files?: Express.Multer.File[],
    oldImages?: string[], // thêm param
  ) {
    let imageUrls: string[] = oldImages || dto.image || [];

    // Nếu có file mới upload
    if (files && files.length > 0) {
      const urls = await Promise.all(
        files.map((file) => this.uploadToCloudinary(file)),
      );
      imageUrls = [...imageUrls, ...urls]; // giữ old + thêm new
    }

    return this.DiningModel.findByIdAndUpdate(
      id,
      {
        ...dto,
        image: imageUrls, // luôn update array image
      },
      { new: true },
    );
  }

  // ✅ Xóa
  async deleteDining(id: string) {
    const dining = await this.DiningModel.findById(id);

    if (!dining) throw new HttpException('Dining not found', 404);

    // Nếu có ảnh, xóa trên Cloudinary
    if (dining.image?.length) {
      for (const img of dining.image) {
        try {
          const publicId = img
            .split('/')
            .slice(img.split('/').findIndex((p) => p.startsWith('v')) + 1)
            .join('/')
            .replace(/\.[^/.]+$/, '');
          await cloudinary.uploader.destroy(publicId);
        } catch (err) {
          console.error('Failed to delete image from Cloudinary:', err);
        }
      }
    }

    await this.DiningModel.findByIdAndDelete(id);

    return { message: 'Dining deleted successfully' };
  }
}
