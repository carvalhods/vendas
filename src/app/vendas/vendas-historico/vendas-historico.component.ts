import { Component, OnInit } from '@angular/core';
import { GridOptions } from 'ag-grid';

import { Venda } from '../../vendas/venda';

@Component({
  selector: 'app-vendas-historico',
  templateUrl: './vendas-historico.component.html',
  styleUrls: ['./vendas-historico.component.css']
})
export class VendasHistoricoComponent implements OnInit {

  gridOptions: GridOptions;
  vendas: Venda[];
  status: any = {saved: false, msg: null, erros: []};
  dataInicio: any;
  dataFim = new Date();

  constructor() {
    this.gridOptions = {
      columnDefs: [
        {headerName: 'DATA', field: 'dataVenda', width: 100},
        {headerName: 'PRODUTO', field: 'produto', width: 380},
        {headerName: 'QTDE', field: 'qtde', width: 100},
        {headerName: 'VALOR UNIT.', field: 'valorUnit', width: 120},
        {headerName: 'TOTAL', field: 'valorTotal', width: 120}
      ],
      pagination: true,
      paginationPageSize: 10,
      localeText: {
        'first': '|<',
        'previous': '<',
        'next': '>',
        'last': '>|',
        'page': 'Página',
        'of': 'de',
        'to': 'até',
        'loadingOoo': 'Carregando...',
      },
      enableColResize: true,
    };
  }

  ngOnInit() {
  }

  onBuscar(value) {
    // console.log(value);
  }

}
