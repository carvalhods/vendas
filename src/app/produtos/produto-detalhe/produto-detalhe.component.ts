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
  private status: any = {msg: null, erros: []};
  private id: string;

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
    )
  }

  createForm() {
    this.produtoForm = this.formBuilder.group(
      {
        _id: null,
        codigo: new FormControl({value: null, disabled: true}),
        descricao: null,
        qtde: null,
        unidade: 'UN',
        estoqueMin: null,
        valor: null
      }
    );
  }

  getProduto() {
    this.produtosService.getProduto(this.id).subscribe(
      produto => {
        this.produtoForm.get('_id').setValue(produto._id);
        this.produtoForm.get('codigo').setValue(produto.codigo);
        if (this.id !== 'novo') {
          this.produtoForm.setValue({
            _id: produto._id,
            codigo: produto.codigo,
            descricao: produto.descricao,
            qtde: produto.qtde,
            unidade: produto.unidade,
            estoqueMin: produto.estoqueMin,
            valor: produto.valor
          });
        }
      },
      error => this.status = Object.assign(error, {msg: 'Não foi possível obter os dados do produto'})
    );
  }

  onSubmit() {
    console.log(this.prepareSave());
  }

  prepareSave(): Produto {
    const formModel = this.produtoForm.value;
    const produto = new Produto();
    for (const campo in formModel) {
      produto[campo] = formModel[campo];
    }
    return produto;
  }

}
