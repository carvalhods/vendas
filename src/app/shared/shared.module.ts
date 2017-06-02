import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DivMessageComponent } from './div-message/div-message.component';
import { InputMoneyComponent } from './input-money/input-money.component';
import { SmSelectComponent } from './sm-select/sm-select.component';
import { SmCalendarComponent } from './sm-calendar/sm-calendar.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    DivMessageComponent,
    InputMoneyComponent,
    SmSelectComponent,
    SmCalendarComponent,
  ],
  exports: [
    DivMessageComponent,
    InputMoneyComponent,
    SmSelectComponent,
    SmCalendarComponent,
  ]
})
export class SharedModule { }
