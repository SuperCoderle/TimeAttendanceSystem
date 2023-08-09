import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CalendarComponentt } from './calendar.component';
import { CalendarComponent } from 'src/app/components/main_component/work_schedule/calendar/calendar.component';
import { StaffCalendarComponent } from 'src/app/components/main_component/work_schedule/staff-calendar/staff-calendar.component';

const routes: Routes = [
  { 
    path: '', 
    component: CalendarComponentt,
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
  }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CalendarRoutingModule { }
