import { Produto } from '../produtos/produto';

export class Venda {
  _id: any;
  numero: number;
  dataVenda: any;
  itens: Item[];
}

export class Item {
  _id: any;
  produto: Produto;
  qtde: number;
  valorUnit: number;
}
