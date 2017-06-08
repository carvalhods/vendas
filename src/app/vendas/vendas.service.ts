import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

import { Venda } from './venda';
import { HandleError } from '../helpers/handleError';

@Injectable()
export class VendasService {

  url = 'http://localhost:3000/vendas';
  headers = new Headers({'Content-Type': 'application/json'});
  reqOptions = new RequestOptions({headers: this.headers});
  HandleError = new HandleError().handle;

  constructor(
    private http: Http
  ) { }

  registraVenda(venda: Venda): Observable<Venda> {
    return this.http
            .post(this.url, JSON.stringify(venda), this.reqOptions)
            .map(res => res.json() as Venda)
            .catch(this.HandleError);
  }

}
