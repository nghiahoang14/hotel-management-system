import { HttpException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Message } from 'src/schemas/Message.schema';
import { UpdateMessageDto } from './dtos/updateMessage.dto';
import { CreateMessageDto } from './dtos/createMessgae.dto';
import { MailService } from 'src/mail/mail.service';

@Injectable()
export class MessageService {
  constructor(
    @InjectModel(Message.name)
    private readonly messageModel: Model<Message>,
    private readonly mailService: MailService,
  ) {}

  // ✅ CREATE MESSAGE + SEND MAIL
  async createMessage(dto: CreateMessageDto) {
    // 1️⃣ Check trùng (email hoặc phone đang unresolved)
    const existed = await this.messageModel.findOne({
      $or: [{ email: dto.email }, { phone: dto.phone }],
      status: 'unresolved',
    });

    if (existed) {
      throw new HttpException(
        'Your request is being processed. Please wait for our response.',
        409,
      );
    }

    // 2️⃣ Lưu message
    const message = await this.messageModel.create({
      ...dto,
      status: 'unresolved',
    });

    // 3️⃣ Gửi mail xác nhận (không làm fail request nếu mail lỗi)
    try {
      await this.mailService.sendContactConfirm(dto.email, dto.name);
    } catch (error) {
      console.error('Send mail failed:', error.message);
    }

    // 4️⃣ Response cho FE
    return {
      message: 'Your message has been sent successfully.',
      data: message,
    };
  }

  // ✅ GET ALL (có phân trang)
  async getMessages(page = 1, limit = 10, status?: string) {
    const skip = (page - 1) * limit;

    const filter = status ? { status } : {};

    const [data, total] = await Promise.all([
      this.messageModel
        .find(filter)
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit),
      this.messageModel.countDocuments(filter),
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
  async getMessageById(id: string) {
    const message = await this.messageModel.findById(id);
    if (!message) throw new HttpException('Message not found', 404);
    return message;
  }

  // ✅ UPDATE (vd: status, notes)
  async updateMessage(id: string, dto: UpdateMessageDto) {
    const { status } = dto;
    const message = await this.messageModel.findByIdAndUpdate(
      id,
      { status },
      {
        new: true,
      },
    );
    if (!message) throw new HttpException('Message not found', 404);
    return message;
  }

  // ✅ DELETE (nếu cần)
  async deleteMessage(id: string) {
    const message = await this.messageModel.findByIdAndDelete(id);
    if (!message) throw new HttpException('Message not found', 404);
    return { message: 'Message deleted successfully' };
  }
}
