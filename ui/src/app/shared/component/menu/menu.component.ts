import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'ap-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  isShown = false;

  toggle() {
      this.isShown = !this.isShown;
  }

  constructor() { }

  ngOnInit() {
  }

}


//usa o ng-content no html pq os itens de menu estarão no header

//ngClass = aplica o primeiro parametro se o segundo for verdadeiro ou falso.

//ngClass - div [ngClass]="{ 'x-y': xy }"></div> - A classe x-y será aplicada no template apenas se a propriedade xy do componente no qual o template faz parte for true.
