import { Component, OnInit, OnChanges, Input, Renderer2, forwardRef } from '@angular/core';
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
export class SmSelectComponent implements OnInit, OnChanges, ControlValueAccessor {

  @Input() value: string;
  @Input() options: string[];
  @Input() id: string;
  @Input() size: string;
  @Input() search = false;
  addClass: any = {};
  loading = false;
  propagateChange = (_: any) => {};

  constructor(
    private renderer2: Renderer2
  ) { }

  ngOnInit() {
    const script = this.renderer2.createElement('script');
    script.text = `
      $(document).ready(function(){
        $('.ui.dropdown').dropdown({
          showOnFocus: false,
          message: {
            noResults: ''
          }
        });
      });
    `;
    this.renderer2.appendChild(document.body, script);
  }

  ngOnChanges() {
    this.addClass = {
      'mini': this.size == 'mini',
      'small': this.size == 'small',
      'search': this.search,
      'loading': false
    };
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

  onChangeValue(valor: any) {
    this.value = valor;
    this.propagateChange(this.value);
  }

  onInput() {
    Object.assign(this.addClass, {'loading': (this.search) ? true : false});
  }
}
