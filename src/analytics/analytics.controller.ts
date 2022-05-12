import { Controller, Get, UseGuards } from '@nestjs/common';
import { Roles } from '../api/auth/decorators/roles.decorator';
import { Role } from '../api/auth/enum/role.enum';
import { JwtGuard } from '../api/auth/guards/jwt.guard';
import { RolesGuard } from '../api/auth/guards/role.guard';
import { AdminAnalyticsService } from './admin/adminAnalytics.service';

@Controller('analytics')
export class AnalyticsController {
  constructor(private readonly adminAnalyticsService: AdminAnalyticsService) { }
  
  ///////Admin Dashboard
  @UseGuards(JwtGuard, RolesGuard)
  @Roles(Role.ADMIN)
  @Get('/admin/dashboard')
  async admin_dashboard() {
    
    var dashboard: any = { }

    /////Employee Count
    var employeeCount = await this.adminAnalyticsService.employee_count()
    dashboard = { ...dashboard, employeeCount }

    ////Scan Count
    var scanCount = await this.adminAnalyticsService.get_scan_count()
    dashboard = { ...dashboard, scanCount }
    
    return dashboard
  }
}
