import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

import { Venda } from './venda';
import { HandleError } from '../helpers/handleError';

@Injectable()
export class VendasService {

  private url = '/vendas';
  private headers = new Headers({'Content-Type': 'application/json'});
  private reqOptions = new RequestOptions({headers: this.headers});
  private handleError = new HandleError().handle;

  constructor(
    private http: Http
  ) { }

  listaVendas(dataInicio: string, dataFim: string): Observable<Venda[]> {
    const _url = `${this.url}?dataInicio=${dataInicio}&dataFim=${dataFim}`;
    return this.http
            .get(_url)
            .map(res => res.json() as Venda[])
            .catch(this.handleError);
  }

  registraVenda(venda: Venda): Observable<Venda> {
    return this.http
            .post(this.url, JSON.stringify(venda), this.reqOptions)
            .map(res => res.json() as Venda)
            .catch(this.handleError);
  }

}
