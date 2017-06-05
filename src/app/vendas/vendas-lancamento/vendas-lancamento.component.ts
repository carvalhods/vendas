import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormArray, FormBuilder, Validators } from '@angular/forms';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/operator/switchMap';
import { Subject } from 'rxjs/Subject';

import { ProdutosService } from '../../produtos/produtos.service';
import { Venda, Item } from '../venda';
import { Produto } from '../../produtos/produto';

@Component({
  selector: 'app-vendas-lancamento',
  templateUrl: './vendas-lancamento.component.html',
  styleUrls: ['./vendas-lancamento.component.css']
})
export class VendasLancamentoComponent implements OnInit {

  vendasLancForm: FormGroup;
  status: any = {saved: false, msg: null, erros: []};
  produtosFound: any[];
  searchTermStream = new Subject<string>();

  constructor(
    private formBuilder: FormBuilder,
    private produtosService: ProdutosService
  ) { }

  ngOnInit() {
    this.vendasLancForm = this.formBuilder.group({
      dataVenda: [new Date(), Validators.required],
      itens: this.formBuilder.array([])
    });
    this.fillProdutoSelector();
  }

  searchProduto(event: any) {
    const term = event.target.value;
    const keyCode = event.keyCode;
    if (!(keyCode >= 37 && keyCode <= 40)) {
      if (term.trim()) {
        this.searchTermStream.next(term);
      } else {
        this.produtosFound = [];
      }
    }
  }

  fillProdutoSelector() {
    this.searchTermStream
      .debounceTime(600)
      .distinctUntilChanged()
      .switchMap((term: string) => this.produtosService.searchProduto(term))
      .subscribe((result) => {
        this.produtosFound = [];
        for (const res of result) {
          this.produtosFound.push({
            id: res._id,
            value: res.descricao
          });
        }
      });
  }

  get itens(): FormArray {
    return this.vendasLancForm.get('itens') as FormArray;
  }

  addItem() {
    this.itens.push(this.formBuilder.group(new Item()));
  }

  removeItem(index: number) {
    this.itens.removeAt(index);
  }

}
