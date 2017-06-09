import { Component, OnInit } from '@angular/core';
import { GridOptions } from 'ag-grid';

import { VendasService } from '../vendas.service';
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
  dataInicio: string;
  dataFim = new Date().toISOString();
  loading = false;

  constructor(
    private vendasService: VendasService
  ) {
    this.gridOptions = {
      columnDefs: [
        {headerName: 'DATA', field: 'dataVenda', width: 100},
        {headerName: 'NÚMERO', field: 'numero', width: 100},
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

  onBuscar() {
    this.loading = true;
    this.vendasService.listaVendas(this.dataInicio, this.dataFim).subscribe(
      vendas => {
        this.vendas = vendas;
        this.loading = false;
      },
      error => {
        this.status = Object.assign(error, {saved: false, msg: 'Não foi possível obter o histórico de vendas'});
        this.loading = false;
      }
    )
  }


}
