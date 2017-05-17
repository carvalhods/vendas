import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProdutosRoutingModule } from './produtos-routing.module';
import { ProdutosComponent } from './produtos.component';
import { ProdutosService } from './produtos.service';

@NgModule({
  imports: [
    CommonModule,
    ProdutosRoutingModule,
  ],
  declarations: [
    ProdutosComponent,
  ],
  providers: [
    ProdutosService,
  ]
})
export class ProdutosModule { }
