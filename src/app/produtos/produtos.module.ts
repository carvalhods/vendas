import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProdutosRoutingModule } from './produtos-routing.module';
import { ProdutosComponent } from './produtos.component';

@NgModule({
  imports: [
    CommonModule,
    ProdutosRoutingModule,
  ],
  declarations: [
    ProdutosComponent
  ]
})
export class ProdutosModule { }
