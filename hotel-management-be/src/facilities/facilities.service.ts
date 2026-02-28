import { HttpException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import cloudinary from 'src/config/cloudinary';
import { Readable } from 'stream';
import { Facilities } from 'src/schemas/Facilities.schema';
import { UpdateFacilitiesDto } from './dtos/UpdateFacilities.dto';
import { CreateFacilitiesDto } from './dtos/CreateFacilities.dto';

@Injectable()
export class FacilitiesService {
  constructor(
    @InjectModel(Facilities.name)
    private readonly facilitiesModel: Model<Facilities>,
  ) {}

  // Upload ảnh lên Cloudinary
  private uploadToCloudinary(file: Express.Multer.File): Promise<string> {
    return new Promise((resolve, reject) => {
      const uploadStream = cloudinary.uploader.upload_stream(
        { folder: 'facilities' },
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

  // ✅ Tạo facility (nhận nhiều file)
  async createFacility(
    dto: CreateFacilitiesDto,
    files?: Express.Multer.File[],
  ) {
    let imageUrls: string[] = dto.image || [];

    if (files && files.length > 0) {
      const urls = await Promise.all(
        files.map((file) => this.uploadToCloudinary(file)),
      );
      imageUrls = urls;
    }

    const facility = new this.facilitiesModel({
      ...dto,
      image: imageUrls,
    });

    return facility.save();
  }
  // ✅ Lấy tất cả
  async getFacilities(page = 1, limit = 10, title?: string) {
    const skip = (page - 1) * limit;

    const filter = title ? { title: { $regex: title, $options: 'i' } } : {};

    const [data, total] = await Promise.all([
      this.facilitiesModel
        .find(filter)
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit),
      this.facilitiesModel.countDocuments(filter),
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
  async getFacilityById(id: string) {
    const facility = await this.facilitiesModel.findById(id);
    if (!facility) throw new HttpException('Facility not found', 404);
    return facility;
  }

  // ✅ Cập nhật
  async updateFacility(
    id: string,
    dto: UpdateFacilitiesDto,
    files?: Express.Multer.File[],
    oldImages?: string[],
  ) {
    let imageUrls: string[] = oldImages || dto.image || [];

    if (files && files.length > 0) {
      const urls = await Promise.all(
        files.map((file) => this.uploadToCloudinary(file)),
      );
      imageUrls = [...imageUrls, ...urls];
    }

    return this.facilitiesModel.findByIdAndUpdate(
      id,
      {
        ...dto,
        image: imageUrls,
      },
      { new: true },
    );
  }

  // ✅ Xóa
  async deleteFacility(id: string) {
    const facility = await this.facilitiesModel.findById(id);

    if (!facility) throw new HttpException('Facility not found', 404);

    // Nếu có ảnh, xóa trên Cloudinary
    if (facility.image?.length) {
      for (const img of facility.image) {
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

    await this.facilitiesModel.findByIdAndDelete(id);

    return { message: 'Facility deleted successfully' };
  }
}
