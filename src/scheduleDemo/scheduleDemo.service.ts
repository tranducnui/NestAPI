import { Injectable } from "@nestjs/common";
import { Cron, CronExpression, Interval, Timeout } from '@nestjs/schedule';

@Injectable()
export class ScheduleServiceDemo {
    constructor() { }

    @Cron("* * * * * *")
    // @Cron(CronExpression.EVERY_10_SECONDS)
    handleCronJob() {
        // console.log(new Date())
    }


    // @Interval(5000)
    // handleInterval(){
    //     console.log('called eveyry 5 second')
    // }

    // @Timeout(5000)
    // handleTimeout() {
    //     console.log('Called once after 5 seconds');
    // }

}