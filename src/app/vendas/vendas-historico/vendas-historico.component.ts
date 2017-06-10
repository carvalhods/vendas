import { Component, OnInit } from '@angular/core';
import { GridOptions } from 'ag-grid';

import { VendasService } from '../vendas.service';
import { Venda, Item } from '../../vendas/venda';

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
  dataFim = new Date();
  loading = false;

  constructor(
    private vendasService: VendasService
  ) {
    this.gridOptions = {
      columnDefs: [
        { headerName: 'NÚMERO', field: 'numero', width: 80,
          cellStyle: this.valueCellStyle, cellRenderer: 'group' },
        { headerName: 'DATA', field: 'dataVenda', width: 90,
          cellStyle: this.valueCellStyle },
        { headerName: 'PRODUTO', field: 'produto', width: 400 },
        { headerName: 'QTDE.', field: 'qtde', width: 90,
          cellStyle: this.valueCellStyle },
        { headerName: 'VALOR UNIT.', field: 'valorUnit', width: 120,
          cellStyle: this.valueCellStyle, cellRenderer: this.currencyRenderer },
        { headerName: 'TOTAL', field: 'valorTotal', width: 120,
          cellStyle: this.valueCellStyle, cellRenderer: this.currencyRenderer },
      ],
      pagination: true,
      paginationPageSize: 12,
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
      rowSelection: 'single',
      getNodeChildDetails: this.getNodeChildDetails,
      rowData: []
    };
  }

  ngOnInit() {
  }

  onBuscar() {
    if (this.dataInicio && this.dataFim) {
      const dataFim = (typeof this.dataFim === 'string') ? this.dataFim : this.dataFim.toISOString();
      this.loading = true;
      this.vendasService.listaVendas(this.dataInicio, dataFim).subscribe(
        vendas => {
          this.vendas = vendas;
          this.loading = false;
          this.fillTable();
        },
        error => {
          this.status = Object.assign(error, {saved: false, msg: 'Não foi possível obter o histórico de vendas'});
          this.loading = false;
        }
      )
    }
  }

  fillTable() {
    this.gridOptions.api.setRowData([]);
    if (this.vendas) {
      const rows = [];
      for (const venda of this.vendas) {
        const row = { dataVenda: null, itens: [] };
        Object.assign(row, venda);
        row.dataVenda = new Date(venda.dataVenda).toLocaleDateString('pt-BR');
        row.itens = [];
        for (const item of venda.itens) {
          row.itens.push({
            produto: item.produto.codigo + ' - ' + item.produto.descricao,
            qtde: item.qtde.toLocaleString('pt-BR') + ' ' + item.produto.unidade,
            valorUnit: item.valorUnit,
            valorTotal: item.qtde * item.valorUnit
          });
        }
        rows.push(row);
      }
      this.gridOptions.api.setRowData(rows);
    }
  }

  getNodeChildDetails(rowItem) {
    if (rowItem.numero) {
      return {
        group: true,
        children: rowItem.itens,
        field: 'numero',
        key: rowItem.numero
      };
    } else {
      return null;
    }
  }

  valueCellStyle(params) {
    switch (params.column.colId) {
      case 'dataVenda':
      case 'codigo':
      case 'numero':
      case 'qtde':
        return {'text-align': 'center'};
      case 'valorUnit':
      case 'valorTotal':
        return {'text-align': 'right'};
    }
  }

  currencyRenderer(params) {
    return (params.value)
    ? 'R$ ' + params.value.toLocaleString('pt-BR', {minimumFractionDigits: 2})
    : null;
  }

  onChange(value) {
    this.status = {saved: false, msg: null, erros: []};
  }

}
