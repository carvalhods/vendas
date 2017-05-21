import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/throw';

export class HandleError {

  handle(error: any) {
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
