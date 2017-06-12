import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { DivMessageComponent } from './div-message/div-message.component';
import { InputMoneyComponent } from './input-money/input-money.component';
import { SmSelectComponent } from './sm-select/sm-select.component';
import { SmCalendarComponent } from './sm-calendar/sm-calendar.component';
import { DivSearchProdutoComponent } from './div-search-produto/div-search-produto.component';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  declarations: [
    DivMessageComponent,
    InputMoneyComponent,
    SmSelectComponent,
    SmCalendarComponent,
    DivSearchProdutoComponent,
  ],
  exports: [
    DivMessageComponent,
    InputMoneyComponent,
    SmSelectComponent,
    SmCalendarComponent,
    DivSearchProdutoComponent,
  ]
})
export class SharedModule { }
