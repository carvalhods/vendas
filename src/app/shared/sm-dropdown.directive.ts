import { Directive, Renderer2 } from '@angular/core';

@Directive({
  selector: '[sm-dropdown]'
})
export class SmDropdownDirective {

  constructor(
    private renderer2: Renderer2
  ) {
    let script = this.renderer2.createElement("script");
    script.type = "text/javascript";
    script.text = `
      $(document).ready(function(){
        $('.ui.dropdown').dropdown();
      });
    `;
    this.renderer2.appendChild(document.body, script);
  }

}
