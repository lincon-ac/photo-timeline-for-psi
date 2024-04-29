import { Component, Input } from '@angular/core';

const CLOUD = 'http://localhost:3000/imgs/'; //tem que ver se o backend suporta

@Component({
  selector: 'ap-photo',
  templateUrl: './photo.component.html',
  styleUrls: ['./photo.component.css']
})

export class PhotoComponent {

  private _url = '';

    @Input() description='';

    @Input() set url(url: string) {
        if(!url.startsWith('data')) {
            this._url = CLOUD + url;
        } else {
            this._url = url;
        }

    }

    get url() {
        return this._url;
    }

}

//@Input() significa que as propriedades description e "url" estão recebendo os parâmetros dinamicamente, no caso, de photos.component.html.

//@Input, ao definir propriedades com o mesmo, estamos dizendo que elas serão passadas por quem utilizar nosso componente.

// qualquer componente que utiliza o PhotoComponent pode setar valores para as propriedades com @Input()
