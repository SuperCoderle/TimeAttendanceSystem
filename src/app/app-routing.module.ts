import { NgModule, Component, OnInit } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EmployeeComponent } from './components/main_component/employee_space/employee/employee.component';
import { LoginComponent } from './components/main_component/login/login.component';
import { HomepageComponent } from './components/main_component/homepage/homepage.component';
import { DashboardComponent } from './components/main_component/main/dashboard/dashboard.component';
import { HistoryComponent } from './components/main_component/history/history.component';
import { CalendarComponent } from './components/main_component/work_schedule/calendar/calendar.component';
import { SalaryComponent } from './components/main_component/employee_space/salary/salary.component';
import { OverviewComponent } from './components/main_component/employee_space/overview/overview.component';
import { NotfoundComponent } from './components/main_component/errors/notfound/notfound.component';
import { ForbiddenComponent } from './components/main_component/errors/forbidden/forbidden.component';
import { FormComponent } from './components/main_component/employee_space/form/form.component';
import { RegisterShiftComponent } from './components/main_component/employee_space/register-shift/register-shift.component';
import { StaffCalendarComponent } from './components/main_component/work_schedule/staff-calendar/staff-calendar.component';
import { AuthorityComponent } from './components/main_component/settings/authority/authority.component';
import { ViolationComponent } from './components/main_component/settings/violation/violation.component';
import { PayrollComponent } from './components/main_component/settings/payroll/payroll.component';
import { AttendanceComponent } from './components/main_component/main/attendance/attendance.component';
import { ReportComponent } from './components/main_component/report/report.component';
import { InformationComponent } from './components/main_component/employee_space/information/information.component';
import { AuthGuard } from './authguard/guardd/auth.guard';

const routes: Routes = [
  {
    path: '',
    component: LoginComponent
  },
  {
    path: 'home',
    component: HomepageComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: 'attendance/:id',
        component: AttendanceComponent
      },
      {
        path: 'dashboard',
        component: DashboardComponent
      },
      {
        path: 'employee',
        component: EmployeeComponent,
        children: [
          {
            path: '', redirectTo: 'overview', pathMatch: 'full'
          },
          {
            path: 'overview',
            component: OverviewComponent
          },
          {
            path: ':id/overview',
            component: OverviewComponent
          },
          {
            path: 'salary',
            component: SalaryComponent
          },
          {
            path: 'employeeform',
            component: FormComponent
          },
          {
            path: 'employeeform/:id',
            component: FormComponent
          },
          {
            path: 'regshift',
            component: RegisterShiftComponent
          },
          {
            path: 'information',
            component: InformationComponent
          }
        ]
      },
      {
        path: 'calendar',
        children: [
          {
            path: '',
            component: CalendarComponent
          },
          {
            path: 'staff-calendar',
            component: StaffCalendarComponent
          }
        ]
      },
      {
        path: 'report',
        component: ReportComponent
      },
      {
        path: 'settings',
        children: [
          {
            path: 'authority',
            component: AuthorityComponent
          },
          {
            path: 'violation',
            component: ViolationComponent
          },
          {
            path: 'payroll',
            component: PayrollComponent
          }
        ]
      }
    ]
  },
  {
    path: 'error',
    children: [
      {
        path: '401',
        component: ForbiddenComponent
      },
      {
        path: '403',
        component: ForbiddenComponent
      },
      {
        path: '404',
        component: NotfoundComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}

