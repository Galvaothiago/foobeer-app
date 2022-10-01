import { Process, Processor } from '@nestjs/bull';
import { Job } from 'bull';

@Processor('order-queue')
export class ConsumeOrderQueue {
  @Process('order')
  readOperationJob(job: Job<unknown>) {
    console.log(job.data);
  }
}
