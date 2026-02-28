import { Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';

@Injectable()
export class MailService {
  constructor(private readonly mailerService: MailerService) {}

  async sendContactConfirm(to: string, name: string) {
    await this.mailerService.sendMail({
      to,
      subject: 'We received your contact request',
      html: `
        <p>Dear ${name},</p>
        <p>Thank you for contacting Hanoi Hotel.</p>
        <p>We have received your request and will get back to you soon.</p>
        <br/>
        <p>Best regards,<br/>Hanoi Hotel</p>
      `,
    });
  }
}
