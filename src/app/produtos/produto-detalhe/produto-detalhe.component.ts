import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

import { Produto } from '../produto';
import { ProdutosService } from '../produtos.service';

@Component({
  selector: 'app-produto-detalhe',
  templateUrl: './produto-detalhe.component.html',
  styleUrls: ['./produto-detalhe.component.css'],
})
export class ProdutoDetalheComponent implements OnInit {

  private produtoForm: FormGroup;
  private status: any = {saved: false, msg: null, erros: []};
  private id: string;
  private selectOptions = [
      {id: 'UN', value: 'UN'},
      {id: 'PÇ', value: 'PÇ'},
      {id: 'CX', value: 'CX'},
      {id: 'KG', value: 'KG'},
      {id: 'M', value: 'M'},
      {id: 'M²', value: 'M²'},
      {id: 'M³', value: 'M³'},
      {id: 'L', value: 'L'}
  ];

  constructor(
    private produtosService: ProdutosService,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
  ) {
    this.createForm();
  }

  ngOnInit() {
    this.route.params.subscribe(
      (params: any) => {
        this.id = params['id'];
        this.getProduto();
      }
    );
  }

  createForm() {
    this.produtoForm = this.formBuilder.group(
      {
        _id: null,
        codigo: new FormControl({value: null, disabled: true}),
        descricao: null,
        qtde: null,
        unidade: null,
        estoqueMin: null,
        valor: null
      }
    );
  }

  getProduto() {
    this.produtosService.getProduto(this.id).subscribe(
      produto => {
        this.produtoForm.patchValue({
          _id: produto._id,
          codigo: produto.codigo,
          unidade: produto.unidade,
          valor: produto.valor || 0,
        });
        if (this.id !== 'novo') {
          this.produtoForm.patchValue({
              descricao: produto.descricao,
              qtde: produto.qtde,
              estoqueMin: produto.estoqueMin
          });
        }
      },
      error => this.status = Object.assign(error, {saved: false, msg: 'Não foi possível obter os dados do produto'})
    );
  }

  prepareSave() {
    const formModel = this.produtoForm.value;
    const produto = new Produto();
    for (const campo in formModel) {
      produto[campo] = formModel[campo];
    }
    return produto;
  }

  onSubmit() {
    const dados = this.prepareSave();
    if (this.id === 'novo') {
      this.produtosService.insertProduto(dados).subscribe(
        produto => {
          this.status = Object.assign({saved: true, msg: 'Produto salvo com sucesso', erros: []});
          this.produtoForm.reset();
          this.getProduto();
        },
        error => this.status = Object.assign(error, {saved: false, msg: 'Não foi possível salvar os dados do produto'})
      );
    } else {
      this.produtosService.updateProduto(dados).subscribe(
        () => {
          this.status = Object.assign({saved: true, msg: 'Produto salvo com sucesso', erros: []});
          this.produtoForm.markAsPristine();
        },
        error => {
          console.log(error);
          this.status = Object.assign(error, {saved: false, msg: 'Não foi possível salvar os dados do produto'});
        }
      );
    }
  }

  onChange() {
    this.status = {saved: false, msg: null, erros: []};
  }

}
