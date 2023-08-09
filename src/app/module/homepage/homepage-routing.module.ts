import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from 'src/app/authguard/guardd/auth.guard';
import { HomepageComponent } from 'src/app/components/main_component/homepage/homepage.component';

const routes: Routes = [
  { 
    path: '', 
    component: HomepageComponent,
    canActivate: [AuthGuard],
    children: [
      { path: 'attendance', loadChildren: () => import('./attendance/attendance.module').then(m => m.AttendanceModule) },
      { path: 'dashboard', loadChildren: () => import('./dashboard/dashboard.module').then(m => m.DashboardModule) },
      { path: 'calendar', loadChildren: () => import('./calendar/calendar.module').then(m => m.CalendarModule) },
      { path: 'report', loadChildren: () => import('./report/report.module').then(m => m.ReportModule) },
      { path: 'information', loadChildren: () => import('./information/information.module').then(m => m.InformationModule) },
      { path: 'employee', loadChildren: () => import('src/app/module/employee/employee.module').then(m => m.EmployeeModule) },
      { path: 'setting', loadChildren: () => import('src/app/module/setting/setting.module').then(m => m.SettingModule) },
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomepageRoutingModule { }
