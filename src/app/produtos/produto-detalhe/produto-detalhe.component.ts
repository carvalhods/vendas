import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-produto-detalhe',
  templateUrl: './produto-detalhe.component.html',
  styleUrls: ['./produto-detalhe.component.css']
})
export class ProdutoDetalheComponent implements OnInit {

  private status: any = {msg: null, erros: []};

  constructor() { }

  ngOnInit() {
  }


}
