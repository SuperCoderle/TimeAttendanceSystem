import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormComponent } from 'src/app/components/main_component/employee_space/form/form.component';
import { InformationComponentt } from './information.component';
import { InformationComponent } from 'src/app/components/main_component/information/information.component';

const routes: Routes = [
  { 
    path: '', 
    component: InformationComponentt,
    children: [
      {
        path: '',
        component: InformationComponent
      },
      {
        path: 'edit/:id',
        component: FormComponent
      }
    ]
  }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InformationRoutingModule { }
