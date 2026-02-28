import { HttpException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import * as bcrypt from 'bcrypt';
import { User } from 'src/schemas/User.schema';
import { CreateUserDto } from './dtos/createUser.dto';
import { UpdateUserDto } from './dtos/updateUser.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name)
    private readonly userModel: Model<User>,
  ) {}

  // CREATE
  async createUser(dto: CreateUserDto) {
    const existed = await this.userModel.findOne({ email: dto.email });
    if (existed) {
      throw new HttpException('Email already exists', 409);
    }

    const hashedPassword = await bcrypt.hash(dto.password, 10);

    return this.userModel.create({
      ...dto,
      password: hashedPassword,
    });
  }

  // GET ALL
  async getAllUsers({ page = 1, limit = 10, search }: any) {
    const skip = (page - 1) * limit;
    const filter = search
      ? {
          $or: [
            { name: { $regex: search, $options: 'i' } },
            { email: { $regex: search, $options: 'i' } },
          ],
        }
      : {};
    const [data, total] = await Promise.all([
      this.userModel
        .find(filter)
        .skip(skip)
        .limit(limit)
        .sort({ createdAt: -1 }),
      this.userModel.countDocuments(filter),
    ]);

    return {
      data,
      page,
      limit,
      total,
      totalPages: Math.ceil(total / limit),
    };
  }

  // GET BY ID
  async getUserById(id: string) {
    const user = await this.userModel.findById(id).select('-password');
    if (!user) throw new HttpException('User not found', 404);
    return user;
  }

  // GET BY EMAIL (dùng cho Auth)
  async findOneByEmail(email: string) {
    return this.userModel.findOne({ email });
  }

  // UPDATE
  async updateUser(id: string, dto: UpdateUserDto) {
    const user = await this.userModel.findByIdAndUpdate(id, dto, {
      new: true,
    });
    if (!user) throw new HttpException('User not found', 404);
    return user;
  }

  // DELETE (soft delete gợi ý)
  async deleteUser(id: string) {
    const user = await this.userModel.findByIdAndUpdate(
      id,
      { isActive: false },
      { new: true },
    );
    if (!user) throw new HttpException('User not found', 404);
    return user;
  }
}
