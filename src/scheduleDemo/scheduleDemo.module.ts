import { Module } from "@nestjs/common";
import {  ScheduleServiceDemo } from "./scheduleDemo.service";
import { ScheduleControllerDemo } from "./scheduleDemo.controller";

@Module({
    controllers:[ScheduleControllerDemo],
    providers:[ScheduleServiceDemo]
})
export class ScheduleModuleDemo{}