import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EmployeeComponent } from './employee.component';
import { OverviewComponent } from 'src/app/components/main_component/employee_space/overview/overview.component';
import { FormComponent } from 'src/app/components/main_component/employee_space/form/form.component';
import { RegisterShiftComponent } from 'src/app/components/main_component/employee_space/register-shift/register-shift.component';
import { RegisterShiftEmployeeComponent } from 'src/app/components/main_component/employee_space/register-shift-employee/register-shift-employee.component';

const routes: Routes = [
  { 
    path: '', 
    component: EmployeeComponent,
    children: [
      {
        path: 'overview',
        component: OverviewComponent
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
        path: 'register-shift',
        component: RegisterShiftComponent
      },
      {
        path: 'register-shift-employee',
        component: RegisterShiftEmployeeComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EmployeeRoutingModule { }
