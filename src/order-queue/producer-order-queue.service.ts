import { InjectQueue } from '@nestjs/bull';
import { Injectable } from '@nestjs/common';
import { Queue } from 'bull';
import { ResponseOrder } from './response/response-order';

@Injectable()
export class ProducerOrderQueue {
  constructor(@InjectQueue('order-queue') private orderQueue: Queue) {}

  async sendOrderToKitchen(order: ResponseOrder) {
    await this.orderQueue.add('order', order);
  }
}
