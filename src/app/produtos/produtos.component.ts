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
  private status: any = {saved: false, msg: null, erros: []};
  private activeItem: any;
  private btnDisabled = true;
  private btnExcluirPressed = false;
  private loading = false;

  constructor(private produtosService: ProdutosService) {
    this.listaProdutos();
  }

  ngOnInit() {
  }

  listaProdutos() {
    this.produtosService.listaProdutos().subscribe(
      produtos => this.produtos = produtos,
      error => this.status = Object.assign(error, {msg: 'Não foi possível obter a lista de produtos'})
    );
  }

  onRowSelected(event: any) {
    this.btnDisabled = !event.selected;
    this.activeItem = (event.selected) ? event.produto : null;
    this.btnExcluirPressed = false;
  }

  onExcluir() {
    this.status = {saved: false, msg: null, erros: []};
    if (this.activeItem) {
      this.btnExcluirPressed = true;
    }
  }

  onExcluirConfirm() {
    this.loading = true;
    this.produtosService.deleteProduto(this.activeItem._id).subscribe(
      () => {
                this.produtos = this.produtos.filter(
                  produto => produto._id !== this.activeItem._id
                );
                this.loading = false;
                this.btnExcluirPressed = false;
            },
      error => {
              this.status = Object.assign(error, {msg: 'Não foi possível excluir o produto'});
              this.loading = false;
              this.btnExcluirPressed = false;
            }
    );

  }

}
