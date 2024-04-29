import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';

import { Photo } from '../photo/photo';
import { PhotoService } from '../photo/photo.service';
import { AlertService } from 'src/app/shared/component/alert/alert.service';
import { UserService } from 'src/app/core/user/user.service';

@Component({
  templateUrl: './photo-details.component.html'
})
export class PhotoDetailsComponent implements OnInit {

  photo$: Observable<Photo>;
  photoId: number;

  constructor(
      private route: ActivatedRoute,
      private photoService: PhotoService,
      private router: Router,
      private alertService: AlertService,
      private userService: UserService
  ) {}

  ngOnInit(): void {
      this.photoId = this.route.snapshot.params.photoId;
      this.photo$ = this.photoService.findById(this.photoId);
      this.photo$.subscribe(() => {}, err => {
          console.log(err);
          this.router.navigate(['not-found']);
      });
  }

  remove() {
    this.photoService
        .removePhoto(this.photoId)
        .subscribe(() => {
          this.alertService.success("Foto removida", true);
          this.router.navigate(['/user', this.userService.getUserName()], { replaceUrl: true });
        },
        err => {
          console.log(err);
          this.alertService.warning('Não foi possível excluir a foto!');
        });
  }

  like(photo: Photo) {
    this.photoService
        .like(photo.id)
        .subscribe(liked => {
            if(liked) {
                this.photo$ = this.photoService.findById(photo.id);
            }
        });
  }

}

//pipe async Permite que o template de um componente realize a inscrição de um observable fornecendo o valor emitido diretamente no template.


//Observables associados ao pipe async são liberados quando o componente cujo o template faz parte é destruído, livrando o desenvolvedor desta responsabilidade.
