import { Component, OnInit, OnChanges, Input, Output, EventEmitter } from '@angular/core';
import { GridOptions } from 'ag-grid';

import { Produto } from '../produto';

@Component({
  selector: 'app-produtos-grid',
  templateUrl: './produtos-grid.component.html',
  styleUrls: ['./produtos-grid.component.css']
})
export class ProdutosGridComponent implements OnInit, OnChanges {

  private gridOptions: GridOptions;
  @Input() produtos: Produto[];
  @Output() rowSelected = new EventEmitter();

  constructor() {
    this.gridOptions = {
      columnDefs: [
        {
          headerName: 'CÓDIGO',
          field: 'codigo',
          width: 80,
          cellStyle: this.valueCellStyle,
        },
        {
          headerName: 'DESCRIÇÃO DO PRODUTO',
          field: 'descricao',
          width: 480,
        },
        {
          headerName: 'QTDE.',
          field: 'qtde',
          width: 80,
          cellStyle: this.valueCellStyle,
        },
        {
          headerName: 'ESTOQUE MÍN.',
          field: 'estoqueMin',
          width: 120,
          cellStyle: this.valueCellStyle,
        },
        {
          headerName: 'VALOR UNIT.',
          field: 'valor',
          width: 100,
          cellStyle: this.valueCellStyle,
          cellRenderer: this.currencyRenderer,
        },
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
      rowSelection: 'single',
      enableColResize: true,
      getRowStyle: this.estoqueBaixoStyle,
    };

    this.fillTable();
  }

  ngOnInit() {
  }

  ngOnChanges() {
    this.fillTable();
  }

  fillTable() {
    if (this.produtos) {
      this.gridOptions.api.setRowData([]);
      for (const produto of this.produtos) {
        let row = {status: '', qtde: '', estoqueMin: ''};
        Object.assign(row, produto);
        row.status = (produto.qtde < produto.estoqueMin) ? ' (Baixo)' : '';
        row.qtde = produto.qtde.toLocaleString('pt-BR') + ' ' + produto.unidade;
        row.estoqueMin = `${produto.estoqueMin.toLocaleString('pt-BR')} ${produto.unidade}${row.status}`;
        this.gridOptions.api.addItems([row]);
      }
    }
  }

  valueCellStyle(params) {
    switch (params.column.colId) {
      case 'codigo':
      case 'qtde':
      case 'estoqueMin':
        return {'text-align': 'center'};
      case 'valor':
        return {'text-align': 'right'};
    }
  }

  estoqueBaixoStyle(params) {
    return (params.data.status.search('Baixo') > -1)
      ? {'color': 'rgba(255, 0, 0, 0.86)'}
      : null;
  }

  currencyRenderer(params) {
    return (params.value)
    ? 'R$ ' + params.value.toLocaleString('pt-BR', {minimumFractionDigits: 2})
    : null;
  }

  onQuickFilterChanged(event: any) {
    this.gridOptions.api.deselectAll();
    this.gridOptions.api.setQuickFilter(event.target.value);
  }

  onSelectionChanged(event: any) {
      const nodes = this.gridOptions.api.getSelectedNodes();
      (nodes.length > 0)
        ? this.rowSelected.emit({selected: true, produto: nodes[0].data})
        : this.rowSelected.emit({selected: false});
  }

  onPaginationChanged(event: any) {
    if (this.gridOptions.api.getSelectedNodes().length > 0) {
      this.gridOptions.api.deselectAll();
      this.rowSelected.emit({selected: false});
    }
  }
}
