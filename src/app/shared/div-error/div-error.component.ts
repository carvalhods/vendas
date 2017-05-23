import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'div-error',
  templateUrl: './div-error.component.html',
  styleUrls: ['./div-error.component.css']
})
export class DivErrorComponent implements OnInit {

  @Input() status: any;

  constructor() { }

  ngOnInit() {
  }

}
