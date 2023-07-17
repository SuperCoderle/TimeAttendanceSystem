import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EmployeeComponent } from './components/main_component/employee_space/employee/employee.component';
import { LoginComponent } from './components/main_component/login/login.component';
import { HomepageComponent } from './components/main_component/homepage/homepage.component';
import { DashboardComponent } from './components/main_component/dashboard/dashboard.component';
import { HistoryComponent } from './components/main_component/history/history.component';
import { CalendarComponent } from './components/main_component/calendar/calendar.component';
import { SalaryComponent } from './components/main_component/employee_space/salary/salary.component';
import { OverviewComponent } from './components/main_component/employee_space/overview/overview.component';

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
          }
        ]
      },
      {
        path: 'calendar',
        component: CalendarComponent
      },
      {
        path: 'authority',
        component: EmployeeComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
