import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormArray, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-vendas-lancamento',
  templateUrl: './vendas-lancamento.component.html',
  styleUrls: ['./vendas-lancamento.component.css']
})
export class VendasLancamentoComponent implements OnInit {

  vendasLancForm: FormGroup;
  status: any = {saved: false, msg: null, erros: []};

  constructor(
    private formBuilder: FormBuilder
  ) { }

  ngOnInit() {
    this.vendasLancForm = this.formBuilder.group({
      dataVenda: [new Date(), Validators.required],
      itens: this.formBuilder.array([])
    });
  }

  get itens(): FormArray {
    return this.vendasLancForm.get('itens') as FormArray;
  }

  onAddItem(event) {
    console.log(event);
    // this.itens.push(this.formBuilder.group(new Item()));
  }

  removeItem(index: number) {
    this.itens.removeAt(index);
  }

}
