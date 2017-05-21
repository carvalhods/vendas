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
  private status: any = {msg: null, erros: []};
  private btnDisabled: boolean = true;

  constructor(private produtosService: ProdutosService) {
    this.listaProdutos();
  }

  ngOnInit() {
  }

  listaProdutos() {
    this.produtosService.listaProdutos().subscribe(
      produtos => this.produtos = produtos,
      error => this.status = error
    );
  }

  onExcluir() {

  }

  onRowSelected(event: any) {
    this.btnDisabled = !event.selected;
  }
}
