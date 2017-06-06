import { Component, OnInit, Renderer2,
          Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/operator/switchMap';
import { Subject } from 'rxjs/Subject';

import { ProdutosService } from '../../produtos/produtos.service';

@Component({
  selector: 'div-search-produto',
  templateUrl: './div-search-produto.component.html',
  styleUrls: ['./div-search-produto.component.css'],
})
export class DivSearchProdutoComponent implements OnInit {

  produtoGroup: FormGroup;
  produtosFound: any[];
  produtoSelected: any;
  idSearchProduto = 'searchProduto';
  searchTermStream = new Subject<string>();
  @Output() addClicked = new EventEmitter();

  constructor(
    private formBuilder: FormBuilder,
    private produtosService: ProdutosService,
    private renderer2: Renderer2
  ) { }

  ngOnInit() {
    this.produtoGroup = this.formBuilder.group({
      id: [null, Validators.required],
      qtde: [null, Validators.required],
      unidade: [null, Validators.required],
      valorUnit: [null, Validators.required]
    });
    this.fillProdutoSelector();
  }

  searchProduto(event: any) {
    const term = event.target.value;
    if (!(event.keyCode >= 37 && event.keyCode <= 40)) {
      if (term) {
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
          if (res.qtde > 0) {
            this.produtosFound.push({
              id: res._id,
              value: res.codigo + ' - ' + res.descricao,
              codigo: res.codigo,
              descricao: res.descricao,
              unidade: res.unidade,
              valorUnit: res.valor
            });
          }
        }
      });
  }

  onChangeProduto(value) {
    if (this.produtosFound) {
      this.produtoSelected = this.produtosFound.find(
        produto => produto.id === value
      );
      if (this.produtoSelected) {
        this.produtoGroup.patchValue({
          unidade: this.produtoSelected.unidade,
          valorUnit: this.produtoSelected.valorUnit
        });
      }
    }
  }

  add() {
    if (this.produtoSelected) {
      this.produtoSelected.qtde = this.produtoGroup.get('qtde').value;
      this.produtoSelected.valorUnit = this.produtoGroup.get('valorUnit').value;
      this.addClicked.emit(this.produtoSelected);
      this.resetSearch();
    }
  }

  resetSearch() {
    this.produtoGroup.setValue({
      id: null,
      qtde: null,
      unidade: null,
      valorUnit: 0
    });
    const script = this.renderer2.createElement('script');
    script.text = `
      $(document).ready(function() {
        $('#${this.idSearchProduto}ChildDiv').dropdown('clear');
      });
    `;
    this.renderer2.appendChild(document.body, script);
    this.produtoSelected = null;
    this.produtosFound = [];
  }

}
