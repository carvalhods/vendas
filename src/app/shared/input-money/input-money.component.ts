import { Component, OnInit, OnChanges,
          Input, Renderer2, ElementRef } from '@angular/core';

@Component({
  selector: 'input-money',
  template: `
            <input
              #txtMoney
              type="text"
              [id]="id"
              [value]="value"
              autocomplete="off"
            />
  `,
  styleUrls: ['./input-money.component.css']
})

export class InputMoneyComponent implements OnInit, OnChanges {

  @Input() value: any;
  @Input('_id') id: string;

  constructor(
    private renderer2: Renderer2,
    private elementRef: ElementRef
  ) {
  }

  ngOnInit() {
    let script = this.renderer2.createElement('script');
    script.text = `
      $(document).ready(function(){
        $("#${this.id}").maskMoney({
          prefix: 'R$ ',
          decimal: ',',
          thousands: '.',
          allowNegative: false,
          affixesStay: true
        });
        $("#${this.id}").change(function(){
          var valorChanged = $("#${this.id}").maskMoney('unmasked')[0];
          $("#${this.id}").closest('input-money').val(valorChanged);
        })
      });
    `;
    this.renderer2.appendChild(document.body, script);
  }

  ngOnChanges() {
    this.value = this.elementRef.nativeElement.value;
    let script = this.renderer2.createElement('script');
    script.text = `
      setTimeout(function(){
        $("#${this.id}").maskMoney('mask');
      }, 20);
    `;
    this.renderer2.appendChild(document.body, script);
  }

}
