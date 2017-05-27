import { Component, OnInit, OnChanges,
          Input, Renderer2, ElementRef, forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'input-money',
  template: `
            <input
              #txtMoney
              type="text"
              [id]="id + 'Child'"
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
  @Input() id: string;
  valueChild: number;
  propagateChange = (_: any) => {};


  constructor(
    private renderer2: Renderer2,
    private elementRef: ElementRef
  ) {
  }

  ngOnInit() {
    const script = this.renderer2.createElement('script');
    script.text = `
      $(document).ready(function(){
        $("#${this.id}Child").maskMoney({
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
    const script = this.renderer2.createElement('script');
    script.text = `
      setTimeout(function(){
        $("#${this.id}Child").maskMoney('mask', ${this.value});
      }, 10);
    `;
    this.renderer2.appendChild(document.body, script);
  }

  writeValue(value: any) {
    if (value !== undefined) {
      this.value = value;
      this.ngOnChanges();
    }
  }

  registerOnChange(fn) {
    this.propagateChange = fn;
  }

  registerOnTouched() {
  }

  onChangeValue(value) {
    const script = this.renderer2.createElement('script');
    script.text = `
      var valorChanged = $("#${this.id}Child").maskMoney('unmasked')[0];
    `;
    this.renderer2.appendChild(document.body, script);
    if (this.value !== window['valorChanged']) {
      this.value = window['valorChanged'];
      this.propagateChange(this.value);
    }
  }
}
