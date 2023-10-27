import { InjectQueue } from "@nestjs/bull";
import { Injectable } from "@nestjs/common";
import { Cron } from "@nestjs/schedule";
import { Queue } from "bull";

@Injectable()
export class JobQueue {
    constructor(
        @InjectQueue('job') private readonly jobQueue: Queue
    ) { }

    async addJob(data: any) {
        await this.jobQueue.add(data)
    }

    @Cron('0 * * * * *')
    async scheduleJob(){
        const job = await this.jobQueue.getJob('scheduled')
        if(job)
        {
            console.log('Processing schedule job:', job.data)
        }
        return job.remove;// delete job after work
    }

    
}