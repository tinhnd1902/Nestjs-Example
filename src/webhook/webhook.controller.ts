import { Controller, Post, Body } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { WebhookService } from './webhook.service';

@Controller('webhook')
export class WebhookController {
  constructor(
    private readonly webhookService: WebhookService,
    private readonly httpService: HttpService,
  ) {}

  @Post('/order')
  createOrder(@Body() data) {
    const createdOrder = this.webhookService.createOrder(data);

    this.httpService
      .post('https://webhook.site/a13b5452-5f37-485b-be82-92b84a1c30ab', data)
      .subscribe({
        complete: () => {
          console.log('completed');
        },
        error: (err) => {
          //handle error requests
        },
      });

    return createdOrder;
  }
}
