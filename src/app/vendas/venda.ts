export class Venda {
  numero: number;
  dataVenda: any;
  itens: Item[];
}

export class Item {
  _id: any;
  qtde: number;
  valorUnit: number;
}
