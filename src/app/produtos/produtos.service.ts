import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

import { Produto } from './produto';
import { HandleError } from '../helpers/handleError';

@Injectable()
export class ProdutosService {

  private url = '/produtos';
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

  getProduto(id: any): Observable<Produto> {
    return this.http
            .get(`${this.url}/${id}`)
            .map(res => res.json() as Produto)
            .catch(this.handleError);
  }

  searchProduto(keyword: string): Observable<Produto[]> {
    const url = `${this.url}/search/${keyword}`;
    return this.http
              .get(url)
              .map(res => res.json() as Produto[])
              .catch(this.handleError);
  }

  insertProduto(produto: Produto): Observable<Produto> {
    return this.http
            .post(this.url, JSON.stringify(produto), this.requestOptions)
            .map(res => res.json() as Produto)
            .catch(this.handleError);
  }

  updateProduto(produto: Produto): Observable<void> {
    return this.http
            .put(this.url, JSON.stringify(produto), this.requestOptions)
            .map(() => null)
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
