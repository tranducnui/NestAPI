import { Injectable, Logger } from "@nestjs/common";
import { Cron, CronExpression, Interval, SchedulerRegistry, Timeout } from "@nestjs/schedule";
import { interval } from "rxjs";

@Injectable()
export class TasksService {
    [x: string]: any;
    private readonly logger = new Logger(TasksService.name)

    @Cron('45 * * * * *')
    handleCron() {
        this.logger.debug('call when 45s')
    }

    @Cron(CronExpression.EVERY_30_MINUTES)
    handleCron2() {
        this.logger.debug('call every 30m')
    }

    @Interval(10000)
    handleInterval() {
        this.logger.debug('call every 10s')
    }

    @Timeout(10000)
    handleTimeout() {
        this.logger.debug('call one after 10 second')
    }

    addTimeout(name: string, milliseconds: number) {
        const callback = () => {
            this.logger.warn(`Timeout ${name} executing after (${milliseconds})!`);
        };

        const timeout = setTimeout(callback, milliseconds);
        this.schedulerRegistry.addTimeout(name, timeout);
    }

    deleteTimeout(name: string) {
        this.schedulerRegistry.deleteTimeout(name);
        this.logger.warn(`Timeout ${name} deleted!`);
    }

    getTimeouts() {
        const timeouts = this.schedulerRegistry.getTimeouts();
        timeouts.forEach(key => this.logger.log(`Timeout: ${key}`));
      }
      
    getCrons() {
        const jobs = this.schedulerRegistry.getCronJobs();
        jobs.forEach((value, key, map) => {
            let next;
            try {
                next = value.nextDates().toJSDate();
            } catch (e) {
                next = 'error: next fire date is in the past!';
            }
            this.logger.log(`job: ${key} -> next: ${next}`);
        });
    }

    constructor(private schedulerRegistry: SchedulerRegistry) {
        const interval = this.schedulerRegistry.getInterval('notifications');
        clearInterval(interval);
    }

    addInterval(name: string, milliseconds: number) {
        const callback = () => {
            this.logger.warn(`Interval ${name} executing at time (${milliseconds})!`);
        };

        const interval = setInterval(callback, milliseconds);
        this.schedulerRegistry.addInterval(name, interval);
    }

    deleteInterval(name: string) {
        this.schedulerRegistry.deleteInterval(name);
        this.logger.warn(`Interval ${name} deleted!`);
    }

    getIntervals() {
        const intervals = this.schedulerRegistry.getIntervals();
        intervals.forEach(key => this.logger.log(`Interval: ${key}`));
    }
}