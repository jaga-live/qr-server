import { Module } from '@nestjs/common';
import { AnalyticsService } from './analytics.service';
import { AnalyticsController } from './analytics.controller';
import { AdminAnalyticsService } from './admin/adminAnalytics.service';
import { MongooseModule } from '@nestjs/mongoose';
import { ScanLogsSchema } from '../api/log/models/scan_log.model';
import { UserModule } from '../api/users/user.module';
import { UserSchema } from '../api/users/model/user.model';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'scan_logs', schema: ScanLogsSchema }]),
    MongooseModule.forFeature([{ name: 'users', schema: UserSchema }]),
    
  ],
  controllers: [AnalyticsController],
  providers: [AnalyticsService, AdminAnalyticsService]
})
export class AnalyticsModule {}
