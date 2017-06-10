import { Component, OnInit, Input, Output,
          EventEmitter, Renderer2, forwardRef } from '@angular/core';
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
  @Input() _tabindex = 100;
  @Input() hours: number;
  @Input() minutes: number;
  @Output() changeValue = new EventEmitter();
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
      var teclou = false;
      var dateChanged${this.id};
      $(document).ready(function() {
        function triggerEvent() {
          if ("createEvent" in document) {
            var evt = document.createEvent("HTMLEvents");
            evt.initEvent("change", false, true);
            document.getElementById('${this.id}Input').dispatchEvent(evt);
          }
          else {
            document.getElementById('${this.id}Input').fireEvent("onchange");
          }
        }

        $('#${this.id}Child').calendar({
          type: '${this.type}',
          text: ${JSON.stringify(this.text)},
          today: ${this.today},
          formatter: {
            date: function(date, settings) {
              if (!date) return '';
              return date.toLocaleDateString('pt-BR');
            }
          },
          onChange: function (date, text, mode) {
            if (!date) {
              dateChanged${this.id} = null;
              triggerEvent();
              return '';
            }
            if (teclou) {
              var dia = date.getDate();
              var mes = date.getMonth();
              if (dia <= 12) {
                date.setDate(mes + 1);
                date.setMonth(dia - 1);
              }
              teclou = false;
            }
            dateChanged${this.id} = date;
            triggerEvent();
            return date;
          },
        });
        $('#${this.id}Child').keyup(function(){
          teclou = true;
        });
        $('#${this.id}Child input').blur(function(){
          teclou = false;
        });
      });
    `;
    this.renderer2.appendChild(document.body, script);
  }

  onDateChange() {
    const date = this.adjustDate(window[`dateChanged${this.id}`]);
    this.value = (date) ? date.toISOString() : null;
    this.propagateChange(this.value);
    this.changeValue.emit(this.value);
  }

  adjustDate(date) {
    if (date) {
      if (this.hours !== undefined) {
        date.setHours(this.hours);
      }
      if (this.minutes !== undefined) {
        date.setMinutes(this.minutes);
        if (this.minutes == 59) { date.setSeconds(59); }
      }
    }
    return date;
  }

  writeValue(value: any) {
    if (value) {
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
