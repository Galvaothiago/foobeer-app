import { BullModule } from '@nestjs/bull';
import { Module } from '@nestjs/common';
import { ConsumeOrderQueue } from './consumer-order-queue.service';
import { OrderQueueController } from './order-queue.controller';
import { ProducerOrderQueue } from './producer-order-queue.service';

@Module({
  imports: [
    BullModule.forRootAsync({
      useFactory: () => ({
        redis: {
          host: process.env.REDIS_HOST,
          port: Number(process.env.REDIS_PORT),
        },
      }),
    }),
    BullModule.registerQueue({
      name: 'order-queue',
    }),
  ],
  controllers: [OrderQueueController],
  providers: [ProducerOrderQueue, ConsumeOrderQueue],
  exports: [ProducerOrderQueue],
})
export class OrderQueueModule {}
