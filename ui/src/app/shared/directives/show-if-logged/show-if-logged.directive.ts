import { Directive, OnInit, ElementRef, Renderer2 } from '@angular/core';

import { UserService } from 'src/app/core/user/user.service';

@Directive({
  selector: '[ShowIfLogged]'
})

export class ShowIfLoggedDirective implements OnInit {

    constructor(
        private el: ElementRef,
        private renderer: Renderer2,
        private userService: UserService
    ) {}

    ngOnInit(): void {
      this.userService.getUser().subscribe(user => {
          if(user){
            this.renderer.setStyle(this.el.nativeElement,'display','inline');
          }else{
            this.renderer.setStyle(this.el.nativeElement,'display','none');
          }
        },error1 => {});

      }

  }


  // OUTRA MANEIRA

  // currentDisplay: string;

  // ngOnInit(): void {

  //   this.currentDisplay = getComputedStyle(this.el.nativeElement).display;
  //   this.userService.getUser().subscribe(user => {
  //       if(user) {
  //           this.renderer.setStyle(this.el.nativeElement, 'display', this.currentDisplay);
  //       } else {
  //           this.currentDisplay = getComputedStyle(this.el.nativeElement).display;
  //           this.renderer.setStyle(this.el.nativeElement, 'display', 'none');
  //       }
  //  });
  // }


