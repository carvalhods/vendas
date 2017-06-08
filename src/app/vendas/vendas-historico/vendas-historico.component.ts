import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-vendas-historico',
  templateUrl: './vendas-historico.component.html',
  styleUrls: ['./vendas-historico.component.css']
})
export class VendasHistoricoComponent implements OnInit {

  status: any = {saved: false, msg: null, erros: []};

  constructor() { }

  ngOnInit() {
  }

}
