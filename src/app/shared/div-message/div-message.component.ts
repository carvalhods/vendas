import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'div-message',
  templateUrl: './div-message.component.html',
  styleUrls: ['./div-message.component.css']
})
export class DivMessageComponent implements OnInit {

  @Input() status: any;

  constructor() { }

  ngOnInit() {
  }

}
