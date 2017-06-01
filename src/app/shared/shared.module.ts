import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DivMessageComponent } from './div-message/div-message.component';
import { InputMoneyComponent } from './input-money/input-money.component';
import { SmSelectComponent } from './sm-select/sm-select.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    DivMessageComponent,
    InputMoneyComponent,
    SmSelectComponent,
  ],
  exports: [
    DivMessageComponent,
    InputMoneyComponent,
    SmSelectComponent,
  ]
})
export class SharedModule { }
