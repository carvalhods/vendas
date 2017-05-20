import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AgGridModule } from 'ag-grid-angular/main';

import { ProdutosRoutingModule } from './produtos-routing.module';
import { ProdutosService } from './produtos.service';
import { ProdutosComponent } from './produtos.component';
import { ProdutosGridComponent } from './produtos-grid/produtos-grid.component';

@NgModule({
  imports: [
    CommonModule,
    ProdutosRoutingModule,
    AgGridModule.withComponents([])
  ],
  declarations: [
    ProdutosComponent,
    ProdutosGridComponent,
  ],
  providers: [
    ProdutosService,
  ]
})
export class ProdutosModule { }
