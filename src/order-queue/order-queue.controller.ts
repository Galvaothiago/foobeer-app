import { Body, Controller, Get, Query } from '@nestjs/common';
import { ProducerOrderQueue } from './producer-order-queue.service';
import { ResponseOrder } from './response/response-order';

@Controller()
export class OrderQueueController {
  constructor(private readonly producerOrder: ProducerOrderQueue) {}

  @Get('order/queue')
  order(@Body() order: ResponseOrder) {
    this.producerOrder.sendOrderToKitchen(order);
    return order;
  }
}
