import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-vendas-lancamento',
  templateUrl: './vendas-lancamento.component.html',
  styleUrls: ['./vendas-lancamento.component.css']
})
export class VendasLancamentoComponent implements OnInit {

  status: any = {saved: false, msg: null, erros: []};

  constructor() { }

  ngOnInit() {
  }

}
