import { Component, OnInit, OnChanges, Input, Renderer2 } from '@angular/core';

@Component({
  selector: 'div-message',
  templateUrl: './div-message.component.html',
  styleUrls: ['./div-message.component.css']
})
export class DivMessageComponent implements OnInit, OnChanges {

  @Input() status: any = {saved: false, msg: null, erros: []};

  constructor(
    private renderer2: Renderer2
  ) { }

  ngOnInit() {
  }

  ngOnChanges() {
    if (!this.status.saved && this.status.erros.length > 0) {
      this.status.erros = this.status.erros[0].split('\n');
    }
    if (this.status.saved === true) {
      const script = this.renderer2.createElement('script');
      script.text = `
        setTimeout(function(){
          $("div-message div").attr("hidden", true)
        }, 1000);
      `;
      this.renderer2.appendChild(document.body, script);
    }
  }

}
