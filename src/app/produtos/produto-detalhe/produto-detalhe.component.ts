import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';

import { Produto } from '../produto';

@Component({
  selector: 'app-produto-detalhe',
  templateUrl: './produto-detalhe.component.html',
  styleUrls: ['./produto-detalhe.component.css']
})
export class ProdutoDetalheComponent implements OnInit {

  private produtoForm: FormGroup;
  private status: any = {msg: null, erros: []};

  constructor(private formBuilder: FormBuilder) {
    this.createForm();
  }

  ngOnInit() {
  }

  createForm() {
    this.produtoForm = this.formBuilder.group(
      {
        codigo: new FormControl({value: null, disabled:true}),
        descricao: null,
        qtde: null,
        unidade: 'UN',
        estoqueMin: null,
        valor: null
      }
    );
  }

  onSubmit() {
    console.log(this.prepareSave());
  }

  prepareSave(): Produto {
    const formModel = this.produtoForm.value;
    const produto: Produto = {
      _id: null,
      codigo: formModel.codigo,
      descricao: formModel.descricao,
      qtde: formModel.qtde,
      unidade: formModel.unidade,
      estoqueMin: formModel.estoqueMin,
      valor: formModel.valor
    };
    return produto;
  }

}
