import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { InformationRoutingModule } from './information-routing.module';
import { InformationComponentt } from './information.component';


@NgModule({
  declarations: [
    InformationComponentt
  ],
  imports: [
    CommonModule,
    InformationRoutingModule
  ]
})
export class InformationModule { }
