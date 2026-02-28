import {
  Controller,
  Get,
  Param,
  Patch,
  Query,
  Body,
  Delete,
} from '@nestjs/common';
import { MessageService } from './message.service';
import { UpdateMessageDto } from './dtos/updateMessage.dto';

@Controller('admin/messages')
export class AdminMessageController {
  constructor(private readonly messageService: MessageService) {}

  // 📋 GET ALL messages (admin)
  @Get()
  getMessages(
    @Query('page') page?: number,
    @Query('limit') limit?: number,
    @Query('status') status?: string,
  ) {
    return this.messageService.getMessages(Number(page), Number(limit), status);
  }

  // 🔍 GET message by id
  @Get(':id')
  getMessageById(@Param('id') id: string) {
    return this.messageService.getMessageById(id);
  }

  // ✅ UPDATE message (vd: status)
  @Patch(':id')
  updateMessage(@Param('id') id: string, @Body() dto: UpdateMessageDto) {
    return this.messageService.updateMessage(id, dto);
  }

  // ❌ DELETE message (optional)
  @Delete(':id')
  deleteMessage(@Param('id') id: string) {
    return this.messageService.deleteMessage(id);
  }
}
