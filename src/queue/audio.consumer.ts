import { Processor, Process, OnQueueActive, OnGlobalQueueCompleted } from '@nestjs/bull';
import { Job } from 'bull';

@Processor('audio')
export class AudioConsumer {
    [x: string]: any;
    @Process()
    async transcode(job: Job<unknown>) {
        let progress = 0;
        for (let i = 0; i < 100; i++) {
            await doSomething(job.data);
            progress += 1;
            await job.progress(progress);
        }
        return {};
    }

    @OnQueueActive()
    onActive(job: Job) {
        console.log(
            `Processing job ${job.id} of type ${job.name} with data ${job.data}...`,
        );
    }

    @OnGlobalQueueCompleted()
    async onGlobalCompleted(jobId: number, result: any) {
        const job = await this.immediateQueue.getJob(jobId);
        console.log('(Global) on completed: job ', job.id, ' -> result: ', result);
    }
}

function doSomething(data: unknown) {
    throw new Error('Function not implemented.');
}

