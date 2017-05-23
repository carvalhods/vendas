import { Component, OnInit, Input, Renderer2, forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'sm-select',
  templateUrl: './sm-select.component.html',
  styleUrls: ['./sm-select.component.css'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => SmSelectComponent),
      multi: true
    }
  ]
})
export class SmSelectComponent implements OnInit, ControlValueAccessor {

  @Input() value: string;
  @Input() options: string[];
  @Input() id: string;
  propagateChange = (_: any) => {};

  constructor(
    private renderer2: Renderer2
  ) { }

  ngOnInit() {
    const script = this.renderer2.createElement('script');
    script.text = `
      $(document).ready(function(){
        $('.ui.dropdown').dropdown();
      });
    `;
    this.renderer2.appendChild(document.body, script);
  }

  writeValue(value: any) {
    if (value !== undefined) {
      this.value = value;
    }
  }

  registerOnChange(fn) {
    this.propagateChange = fn;
  }

  registerOnTouched() {
  }

  onChangeValue(valor: any) {
    this.value = valor;
    this.propagateChange(this.value);
  }

}
