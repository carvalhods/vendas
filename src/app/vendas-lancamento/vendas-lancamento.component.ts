import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder } from '@angular/forms';

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
      dataVenda: new Date().toISOString(),
    });
  }

}
