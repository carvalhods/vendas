export class Venda {
  _id: any;
  numero: number;
  dataVenda: any;
  itens: Item[];
}

export class Item {
  produto: any;
  codigo: number;
  descricao: string;
  qtde: number;
  unidade: string;
  valorUnit: number;
}
