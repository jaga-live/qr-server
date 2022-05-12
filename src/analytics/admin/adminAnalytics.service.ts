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

        var startTime = new Date();
        startTime.setHours(0, 0, 0, 0);

        var scan_count = await this.scanModel.aggregate([
            {
                $match: {
                    createdAt: {$gte: startTime}
                }
            },
            {
                $group: {
                    _id: null,
                    success: {
                        $sum: {
                            $cond: [{ $eq: ['success', '$status'] }, 1, 0]
                        }
                    },
                    failure: {
                        $sum: {
                            $cond: [{ $eq: ['success', '$status'] }, 0, 1]
                        }
                    }
                }
            },
            {
                $project: { _id: 0 }
            }
        ])


        return scan_count[0] ? scan_count[0] : { success: 0, failure: 0 }

    }

}