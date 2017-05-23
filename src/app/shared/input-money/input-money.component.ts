import { Component, OnInit, OnChanges,
          Input, Renderer2, ElementRef, forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'input-money',
  template: `
            <input
              #txtMoney
              type="text"
              [id]="id"
              [value]="valor"
              autocomplete="off"
              (blur)="onChangeValue(txtMoney.value)"
            />
  `,
  styleUrls: ['./input-money.component.css'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => InputMoneyComponent),
      multi: true
    }
  ]
})

export class InputMoneyComponent implements OnInit, OnChanges, ControlValueAccessor {

  @Input() value: number;
  @Input('_id') id: string;
  propagateChange = (_: any) => {};
  valor: number;

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
      });
    `;
    this.renderer2.appendChild(document.body, script);
  }

  ngOnChanges() {
    let script = this.renderer2.createElement('script');
    script.text = `
      setTimeout(function(){
        $("#${this.id}").maskMoney('mask');
      }, 20);
    `;
    this.renderer2.appendChild(document.body, script);
  }

  writeValue(value: any) {
    if (value !== undefined) {
      this.value = value;
      this.valor = this.value;
    }
  }

  registerOnChange(fn) {
    this.propagateChange = fn;
  }

  registerOnTouched() {
  }

  onChangeValue(value) {
    let script = this.renderer2.createElement('script');
    script.text = `
      var valorChanged = $("#${this.id}").maskMoney('unmasked')[0];
    `;
    this.renderer2.appendChild(document.body, script);
    this.value = window['valorChanged'];
    this.propagateChange(this.value);
  }
}
