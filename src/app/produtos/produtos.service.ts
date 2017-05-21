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
    console.log(error);
    let status = {msg: null, erros: []};
    if (error.data) {
      if (error.data.errors) {
        for (var attr in error.data.errors) {
          status.erros.push(error.data.errors[attr].message);
        }
      } else {
        status.erros.push(error.data.message || error.data);
      }
    } else {
      status.erros.push("Falha na conexão com o servidor");
    }
    return Observable.throw(status);
  }

}
