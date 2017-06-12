import { Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/throw';

export class HandleError {

  handle(error: Response | any) {
    console.log(error);
    const status = {msg: null, erros: []};
    if (error instanceof Response) {
      try {
        const body = error.json() || '';
        if (body.errors) {
          for (const attr in body.errors) {
            status.erros.push(body.errors[attr].message);
          }
        } else {
          status.erros.push(body.message || body);
        }
      } catch (err) {
        status.erros.push('Falha na conexão com o servidor');
      }
    } else {
      status.erros.push('Falha na conexão com o servidor');
    }
    return Observable.throw(status);
  }

}
