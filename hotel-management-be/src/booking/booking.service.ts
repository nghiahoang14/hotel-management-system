import { HttpException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Booking } from 'src/schemas/Booking.schema';
import { Room } from 'src/schemas/Room.schema';
import { RoomType } from 'src/schemas/RoomType.schema';

@Injectable()
export class BookingService {
  constructor(
    @InjectModel(Booking.name)
    private readonly bookingModel: Model<Booking>,

    @InjectModel(Room.name)
    private readonly roomModel: Model<Room>,

    @InjectModel(RoomType.name)
    private readonly roomTypeModel: Model<RoomType>,
  ) {}
  async searchAvailable(
    checkIn: string,
    checkOut: string,
    adults?: number,
    children?: number,
    roomTypeId?: string,
  ) {
    const start = new Date(checkIn);
    const end = new Date(checkOut);

    if (start >= end) {
      throw new HttpException('Invalid date range', 400);
    }

    const totalGuests = (adults || 0) + (children || 0);

    // 1️⃣ Lấy tất cả roomTypes 1 lần
    const roomTypes = roomTypeId
      ? await this.roomTypeModel.find({ _id: roomTypeId })
      : await this.roomTypeModel.find();

    if (!roomTypes.length) return [];

    const roomTypeIds = roomTypes.map((rt) => rt._id);

    // 2️⃣ Lấy toàn bộ rooms thuộc các roomType này
    const rooms = await this.roomModel.find({
      roomType: { $in: roomTypeIds },
      status: { $ne: 'maintenance' }, // chỉ loại phòng bảo trì
    });

    // 3️⃣ Lấy toàn bộ booking bị overlap trong date range
    const overlappedBookings = await this.bookingModel.find({
      'items.roomType': { $in: roomTypeIds },
      checkIn: { $lt: end },
      checkOut: { $gt: start },
      status: { $in: ['confirmed', 'checked_in'] }, // chỉ tính booking hợp lệ
    });

    // 4️⃣ Tạo Set lưu roomId đã bị book
    const bookedRoomIds = new Set<string>();

    overlappedBookings.forEach((b) => {
      b.items.forEach((i) => {
        if (roomTypeIds.some((id) => id.toString() === i.roomType.toString())) {
          i.rooms.forEach((r) => bookedRoomIds.add(r.toString()));
        }
      });
    });

    // 5️⃣ Group rooms theo roomType
    const roomMap = new Map<string, any[]>();

    rooms.forEach((room) => {
      const rtId = room.roomType.toString();
      if (!roomMap.has(rtId)) {
        roomMap.set(rtId, []);
      }
      roomMap.get(rtId)!.push(room);
    });

    const result: any[] = [];

    // 6️⃣ Tính availability
    for (const rt of roomTypes) {
      // 🎯 Filter capacity
      if (totalGuests > 0) {
        const adultOk = (adults || 0) <= (rt.maxAdults || 0);
        const childOk = (children || 0) <= (rt.maxChildren || 0);

        if (!adultOk || !childOk) continue;
      }

      const allRoomsOfType = roomMap.get(rt._id.toString()) || [];

      const availableCount = allRoomsOfType.filter(
        (room) => !bookedRoomIds.has(room._id.toString()),
      ).length;

      if (availableCount > 0) {
        result.push({
          ...rt.toObject(),
          available: availableCount,
        });
      }
    }

    return result;
  }

  // =====================================================
  // CREATE BOOKING
  // =====================================================
  async createBooking(dto: any) {
    const { checkIn, checkOut, items, guestInfo } = dto;

    const start = new Date(checkIn);
    const end = new Date(checkOut);

    if (start >= end) {
      throw new HttpException('Invalid date range', 400);
    }

    const nights = (end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24);

    let totalPrice = 0;
    const bookingItems: any[] = [];

    for (const item of items) {
      const { roomTypeId, quantity } = item;

      const roomType = await this.roomTypeModel.findById(roomTypeId);
      if (!roomType) {
        throw new HttpException('Room type not found', 404);
      }

      // 1️⃣ Lấy tất cả phòng thuộc loại đó
      const allRooms = await this.roomModel.find({
        roomType: roomTypeId,
        status: 'available',
      });

      // 2️⃣ Lấy booking overlap
      const overlappedBookings = await this.bookingModel.find({
        'items.roomType': roomTypeId,
        checkIn: { $lt: end },
        checkOut: { $gt: start },
        status: { $ne: 'cancelled' },
      });

      const bookedRoomIds = overlappedBookings.flatMap((b) =>
        b.items
          .filter((i) => i.roomType.toString() === roomTypeId)
          .flatMap((i) => i.rooms),
      );

      // 3️⃣ Lọc phòng còn trống
      const availableRooms = allRooms.filter(
        (room) =>
          !bookedRoomIds.some((id) => id.toString() === room._id.toString()),
      );

      if (availableRooms.length < quantity) {
        throw new HttpException(`Not enough rooms for ${roomType.name}`, 400);
      }

      const selectedRooms = availableRooms.slice(0, quantity).map((r) => r._id);

      const subtotal = roomType.price * nights * quantity;
      totalPrice += subtotal;

      bookingItems.push({
        roomType: roomTypeId,
        rooms: selectedRooms,
        pricePerNight: roomType.price,
        quantity,
        subtotal,
      });
    }

    const booking = await this.bookingModel.create({
      checkIn: start,
      checkOut: end,
      nights,
      totalPrice,
      items: bookingItems,
      guestInfo,
      status: 'pending',
    });

    return booking;
  }

  // =====================================================
  // CANCEL BOOKING
  // =====================================================
  async cancelBooking(id: string) {
    const booking = await this.bookingModel.findById(id);
    if (!booking) throw new HttpException('Booking not found', 404);

    booking.status = 'cancelled';
    await booking.save();

    return { message: 'Booking cancelled successfully' };
  }
}
