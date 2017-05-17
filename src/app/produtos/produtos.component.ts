import { Component, OnInit } from '@angular/core';

import { ProdutosService } from './produtos.service';
import { Produto } from './produto';

@Component({
  selector: 'app-produtos',
  templateUrl: './produtos.component.html',
  styleUrls: ['./produtos.component.css']
})
export class ProdutosComponent implements OnInit {

  private produtos: Produto[];
  private errorMessage: string;

  constructor(
    private produtosService: ProdutosService
  ) {

  }

  listaProdutos() {
    this.produtosService.listaProdutos().subscribe(
      produtos => this.produtos = produtos,
      error => this.errorMessage = <any>error
    );
  }

  ngOnInit() {
    this.listaProdutos();
  }

}
