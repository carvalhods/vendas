import { Directive, Renderer2 } from '@angular/core';

@Directive({
  selector: '[currencyMask]'
})
export class CurrencyMaskDirective {

  constructor(
    private renderer2: Renderer2
  ) {
    let script = this.renderer2.createElement('script');
    script.type = 'text/javascript';
    script.text = `
      $(document).ready(function(){
        $("input[currencyMask]").maskMoney({
          prefix: 'R$ ',
          decimal: ',',
          thousands: '.',
          allowNegative: false,
          affixesStay: true
        });
      });
    `;
    this.renderer2.appendChild(document.body, script);
  }

}
