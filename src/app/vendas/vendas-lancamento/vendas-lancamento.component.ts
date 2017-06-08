import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormArray, FormBuilder, Validators } from '@angular/forms';

import { VendasService } from '../vendas.service';
import { Venda, Item } from '../../vendas/venda';

@Component({
  selector: 'app-vendas-lancamento',
  templateUrl: './vendas-lancamento.component.html',
  styleUrls: ['./vendas-lancamento.component.css']
})
export class VendasLancamentoComponent implements OnInit {

  vendasLancForm: FormGroup;
  status: any = {saved: false, msg: null, erros: []};
  valorTotal: number;

  constructor(
    private formBuilder: FormBuilder,
    private vendasService: VendasService
  ) { }

  ngOnInit() {
    this.vendasLancForm = this.formBuilder.group({
      dataVenda: [new Date(), Validators.required],
      itens: this.formBuilder.array([])
    });
    this.valorTotal = 0;
  }

  get itens(): FormArray {
    return this.vendasLancForm.get('itens') as FormArray;
  }

  onAddItem(event) {
    this.itens.push(this.formBuilder.group(event));
    this.onChange();
  }

  removeItem(index: number) {
    this.itens.removeAt(index);
    this.onChange();
  }

  calcularValorTotal() {
    let soma: number = 0;
    for (const item of this.itens.controls) {
      soma += item.value.valorUnit * item.value.qtde;
    }
    this.valorTotal = soma;
  }

  onSubmit() {
    const venda = this.prepareSave();
    if (venda) {
      this.vendasService.registraVenda(venda).subscribe(
        venda => {
          this.status = Object.assign({saved: true, msg: 'Venda registrada com sucesso', erros: []});
          this.ngOnInit();
        },
        error => this.status = Object.assign(error, {saved: false, msg: 'Não foi possível registrar a operação de venda'})
      );
    }
  }

  prepareSave(): Venda {
    const venda = new Venda();
    const formModel = this.vendasLancForm.value;
    venda.dataVenda = (typeof formModel.dataVenda == 'object')
                      ? formModel.dataVenda.toISOString()
                      : formModel.dataVenda;
    venda.itens = formModel.itens.map(
      (item) => Object.assign({}, {
        produto: item.id,
        qtde: item.qtde,
        valorUnit: item.valorUnit
      })
    );
    return venda;
  }

  onChange() {
    this.calcularValorTotal();
    this.status = {saved: false, msg: null, erros: []};
  }
}
