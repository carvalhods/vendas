import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';

import { Produto } from './produto';

@Injectable()
export class ProdutosService {

  private url = 'http://localhost:3000/produtos';

  constructor(private http: Http) { }

  listaProdutos(): Observable<Produto[]> {
    return this.http
            .get(this.url)
            .map(res => res.json() as Produto[])
            .catch(this.handleError)
  }

  private handleError(error: any) {
    return Observable.throw(error);
  }

}
