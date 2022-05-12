import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { ScanLogs } from "../../api/log/models/scan_log.model";
import { User } from "../../api/users/model/user.model";


@Injectable()
export class AdminAnalyticsService{
    constructor(
        @InjectModel('scan_logs') private readonly scanModel: Model<ScanLogs>,
        @InjectModel('users') private readonly usersModel: Model<User>
    ) { }
    

    //////Get Employee Count
    async employee_count(): Promise<number>{
        
        var employee = await this.usersModel.countDocuments({ roles: 'employee' })
        return employee

    }


    //////Get Success and failure QR scans (Present Day)
    async get_scan_count(): Promise<any> {
        var d = new Date();
        d.setHours(0, 0, 0, 0);
        var scan_count = await this.scanModel.aggregate([
            {
                $addFields: {
                  createdAt: {$toDate: '$createdAt'}  
                },
                
            },
            {
                $match: {
                         createdAt: {$gte: d}
                }
            }
        ])

console.log(new Date('2022-05-11T05:56:41.523+00:00').toLocaleTimeString())
        var test = await this.scanModel.find({ createdAt: {$gte: new Date(d)}})
        console.log(test)

        return scan_count
    }

}