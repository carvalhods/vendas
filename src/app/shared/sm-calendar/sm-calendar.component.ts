import { Component, OnInit, Input, Renderer2, forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'sm-calendar',
  templateUrl: './sm-calendar.component.html',
  styleUrls: ['./sm-calendar.component.css'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => SmCalendarComponent),
      multi: true
    }
  ]
})
export class SmCalendarComponent implements OnInit, ControlValueAccessor {

  @Input() value: string;
  @Input() id: string;
  @Input() type = 'date';
  @Input() today = true;
  text: any = {
   'days': ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'],
   'months': ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho',
              'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'],
   'monthsShort': ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun',
                   'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'],
   'today': 'Hoje',
   'now': 'Agora',
   'am': 'AM',
   'pm': 'PM'
  };
  propagateChange = (_: any) => {};

  constructor(
    private renderer2: Renderer2
  ) { }

  ngOnInit() {
    const script = this.renderer2.createElement('script');
    script.text = `
      $(document).ready(function() {
        $('#${this.id}Child').calendar({
          type: '${this.type}',
          text: ${JSON.stringify(this.text)},
          today: ${this.today},
          formatter: {
            date: function(date, settings) {
              if (!date) return '';
              return date.toLocaleDateString('pt-BR');
            }
          }
        });
      });
    `;
    this.renderer2.appendChild(document.body, script);
  }

  onDateChange() {
    const script = this.renderer2.createElement('script');
    script.text = `
      var dateChanged = $('#${this.id}Child').calendar('get date').toISOString();
    `;
    this.renderer2.appendChild(document.body, script);
    this.value = window['dateChanged'];
    this.propagateChange(this.value);
  }

  writeValue(value: any) {
    if (value !== undefined) {
      this.value = value;
      const script = this.renderer2.createElement('script');
      script.text = `
        $(document).ready(function() {
          $('#${this.id}Child').calendar('set date', '${this.value}');
        });
      `;
      this.renderer2.appendChild(document.body, script);
    }
  }

  registerOnChange(fn) {
    this.propagateChange = fn;
  }

  registerOnTouched() {
  }

}
