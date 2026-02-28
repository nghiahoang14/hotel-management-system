import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
// import { Model, Types } from 'mongoose';
import { Room } from 'src/schemas/Room.schema';
import { CreateRoomDto } from './dtos/CreateRoom.dto';
import { Model } from 'mongoose';
import { UpdateRoomDto } from './dtos/UpdateRoom.dto';

@Injectable()
export class RoomService {
  constructor(
    @InjectModel(Room.name)
    private readonly roomModel: Model<Room>,
  ) {}

  /* ================= CREATE ================= */
  async create(dto: CreateRoomDto) {
    // 1️⃣ Check trùng roomNumber
    const existed = await this.roomModel.findOne({
      roomNumber: dto.roomNumber,
    });

    if (existed) {
      throw new BadRequestException('Room number already exists');
    }

    // 2️⃣ Create
    return this.roomModel.create({
      ...dto,
      status: dto.status ?? 'available',
    });
  }

  /* ================= GET ALL ================= */
  async findAll(
    page = 1,
    limit = 10,
    roomNumber?: string,
    status?: string,
    roomTypeId?: string,
  ) {
    const skip = (page - 1) * limit;

    const filter: any = {};

    if (roomNumber) {
      filter.roomNumber = { $regex: roomNumber, $options: 'i' };
    }

    if (status) {
      filter.status = status;
    }

    if (roomTypeId) {
      filter.roomType = roomTypeId;
    }

    const [data, total] = await Promise.all([
      this.roomModel
        .find(filter)
        .populate('roomType', 'name')
        .sort({ roomNumber: 1 })
        .skip(skip)
        .limit(limit),
      this.roomModel.countDocuments(filter),
    ]);

    return {
      data,
      page,
      limit,
      total,
      totalPages: Math.ceil(total / limit),
    };
  }

  /* ================= GET BY ID ================= */
  async findById(id: string) {
    const room = await this.roomModel.findById(id).populate('roomType');

    if (!room) throw new NotFoundException('Room not found');
    return room;
  }
  /* ================= UPDATE ================= */
  async updateRoom(id: string, dto: UpdateRoomDto) {
    const room = await this.roomModel.findById(id);

    if (!room) {
      throw new NotFoundException('Room not found');
    }

    // 🔒 Check trùng roomNumber (nếu có sửa)
    if (dto.roomNumber && dto.roomNumber !== room.roomNumber) {
      const existed = await this.roomModel.findOne({
        roomNumber: dto.roomNumber,
        _id: { $ne: id },
      });

      if (existed) {
        throw new BadRequestException('Room number already exists');
      }
    }

    Object.assign(room, dto);
    return room.save();
  }

  /* ================= DELETE ================= */
  async delete(id: string) {
    return this.roomModel.findByIdAndDelete(id);
  }
}
