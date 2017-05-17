import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

import { Produto } from './produto';

@Injectable()
export class ProdutosService {

  private url = '/produtos';

  constructor(private http: Http) { }

  listaProdutos(): Observable<Produto[]> {
    return this.http
            .get(this.url)
            .map(res => res.json() as Produto[])
            .catch(this.handleError);
  }

  private handleError(error: any): Observable<any> {
    return Observable.throw(error);
  }
}
