import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

import { Produto } from './produto';
import { HandleError } from '../helpers/handleError';

@Injectable()
export class ProdutosService {

  private url = 'http://localhost:3000/produtos';
  private headers = new Headers({'Content-Type': 'application/json'});
  private requestOptions = new RequestOptions({headers: this.headers});
  private handleError = new HandleError().handle;

  constructor(
    private http: Http,
  ) { }

  listaProdutos(): Observable<Produto[]> {
    return this.http
            .get(this.url)
            .map(res => res.json() as Produto[])
            .catch(this.handleError);
  }

  deleteProduto(id: any): Observable<void> {
    const url = `${this.url}/${id}`;
    return this.http
            .delete(url)
            .map(() => null)
            .catch(this.handleError);
  }


}
