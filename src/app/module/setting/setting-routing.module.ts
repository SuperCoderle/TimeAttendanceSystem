import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SettingComponent } from './setting.component';
import { ViolationComponent } from 'src/app/components/main_component/settings/violation/violation.component';
import { PayrollComponent } from 'src/app/components/main_component/settings/payroll/payroll.component';
import { MenuComponent } from 'src/app/components/main_component/settings/menu/menu.component';

const routes: Routes = [
  { 
    path: '', 
    component: SettingComponent,
    children: [
      {
        path: 'violation',
        component: ViolationComponent
      },
      {
        path: 'payroll',
        component: PayrollComponent
      },
      {
        path: 'menu',
        component: MenuComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SettingRoutingModule { }
