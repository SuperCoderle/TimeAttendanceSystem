import { NgModule, Component } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EmployeeComponent } from './components/main_component/employee_space/employee/employee.component';
import { LoginComponent } from './components/main_component/login/login.component';
import { HomepageComponent } from './components/main_component/homepage/homepage.component';
import { DashboardComponent } from './components/main_component/dashboard/dashboard.component';
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

const routes: Routes = [
  {
    path: '', 
    component: LoginComponent
  },
  {
    path: 'home',
    component: HomepageComponent,
    children: [
      {
        path: '', redirectTo: 'dashboard', pathMatch: 'full'
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
          }
        ]
      },
      {
        path: 'calendar',
        component: CalendarComponent,
        children: [
          {
            path: '', redirectTo: 'calendar', pathMatch: 'full'
          },
          {
            path: 'staff-calendar',
            component: StaffCalendarComponent
          }
        ]
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
    path: '404',
    component: NotfoundComponent
  },
  {
    path: '403',
    component: ForbiddenComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
