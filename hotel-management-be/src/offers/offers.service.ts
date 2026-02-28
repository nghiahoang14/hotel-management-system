import { HttpException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Offer } from 'src/schemas/Offer.schema';
import { CreateOfferDto } from './dto/CreateOffer.dto';
import { UpdateOfferDto } from './dto/UpdateOffer.dto';

import cloudinary from 'src/config/cloudinary';
import { Readable } from 'stream';
@Injectable()
export class OffersService {
  constructor(
    @InjectModel(Offer.name)
    private readonly offerModel: Model<Offer>,
  ) {}
  private uploadToCloudinary(file: Express.Multer.File): Promise<string> {
    return new Promise((resolve, reject) => {
      const uploadStream = cloudinary.uploader.upload_stream(
        { folder: 'offers' },
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
  async createOffer(dto: CreateOfferDto, file?: Express.Multer.File) {
    let imageUrl = dto.image;

    if (file) {
      imageUrl = await this.uploadToCloudinary(file);
    }

    const offer = new this.offerModel({
      ...dto,
      image: imageUrl,
    });

    return offer.save();
  }
  // ✅ GET ALL
  async getOffers(page = 1, limit = 10, title?: string) {
    const skip = (page - 1) * limit;

    const filter = title ? { title: { $regex: title, $options: 'i' } } : {};

    const [data, total] = await Promise.all([
      this.offerModel
        .find(filter)
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit),
      this.offerModel.countDocuments(filter),
    ]);

    return {
      data,
      page,
      limit,
      total,
      totalPages: Math.ceil(total / limit),
    };
  }

  // ✅ GET BY ID
  async getOfferById(id: string) {
    const offer = await this.offerModel.findById(id);
    if (!offer) {
      throw new HttpException('Offer not found', 404);
    }
    return offer;
  }

  async updateOffer(
    id: string,
    dto: UpdateOfferDto,
    file?: Express.Multer.File,
  ) {
    let imageUrl = dto.image;

    if (file) {
      imageUrl = await this.uploadToCloudinary(file);
    }

    return this.offerModel.findByIdAndUpdate(
      id,
      {
        ...dto,
        ...(file && { image: imageUrl }),
      },
      { new: true },
    );
  }

  async deleteOffer(id: string) {
    const offer = await this.offerModel.findById(id);

    if (!offer) {
      throw new HttpException('Offer not found', 404);
    }

    // Nếu có ảnh, xóa trên Cloudinary
    if (offer.image) {
      try {
        const publicId = offer.image
          .split('/')
          .slice(offer.image.split('/').findIndex((p) => p.startsWith('v')) + 1)
          .join('/')
          .replace(/\.[^/.]+$/, '');

        await cloudinary.uploader.destroy(publicId);
      } catch (err) {
        console.error('Failed to delete image from Cloudinary:', err);
      }
    }

    await this.offerModel.findByIdAndDelete(id);

    return { message: 'Offer deleted successfully' };
  }

  async getActiveOffers() {
    const now = new Date();

    return this.offerModel.find({
      start_date: { $lte: now },
      $or: [
        { end_date: { $gte: now } },
        { end_date: null },
        { end_date: { $exists: false } },
      ],
    });
  }
}
