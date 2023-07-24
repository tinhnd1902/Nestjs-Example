import { Controller, Post, Body } from '@nestjs/common';

@Controller('webhook')
export class WebhookController {
  @Post()
  handleWebhook(@Body() payload: any) {
    console.log('Received webhook payload:', payload);
    return payload;
    // Xử lý thông báo webhook ở đây
  }
}
