import { HttpClient, HttpErrorResponse, HttpHeaders, HttpParams } from '@angular/common/http';
import { throwError, of } from 'rxjs';
import { retry, catchError, map } from 'rxjs/operators';
import { Injectable } from '@angular/core';

import { Photo } from './photo';
import { PhotoComment } from './photo-comment';
import { environment } from '../../../environments/environment';

const API = environment.apiUrl;


@Injectable({
    providedIn: 'root'
  })
export class PhotoService {

    constructor(private http: HttpClient) {}

    // Headers
    httpOptions = {
        headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    }

    listFromUser(userName: string){

        return this.http
            .get<Photo[]>(`${API}/${userName}/photos`)
            .pipe(
            retry(2))
            //catchError(this.handleError))
    }

    listFromUserPaginated(userName: string, page: number){
        const params = new HttpParams().append('page', page.toString());
        return this.http
            .get<Photo[]>(`${API}/${userName}/photos?${ params }`)
            .pipe(
            retry(2))
            //catchError(this.handleError))
    }

    upload(description: string, allowComments: boolean, file: File) {

      const formData = new FormData();
      formData.append('description', description);
      formData.append('allowComments', allowComments ? 'true' : 'false');
      formData.append('imageFile', file);

      return this.http.post(API + '/photos/upload', formData, { observe: 'events', reportProgress: true });
    }

    findById(id: number) {
      return this.http.get<Photo>(API + '/photos/' + id);
    }

    getComments(photoId: number) {
      return this.http.get<PhotoComment[]>(
          API + '/photos/' + photoId + '/comments');
    }

    addComment(photoId: number, commentText: string) {
      return this.http.post(
          API + '/photos/' + photoId + '/comments',
          { commentText }
      );
    }

    removePhoto(photoId: number) {
      return this.http.delete(API + '/photos/' + photoId);
    }

    like(photoId: number) {
      return this.http.post(API + '/photos/' + photoId +  '/like', {}, {observe: 'response'})
        .pipe(map(res => true))
        .pipe(catchError(err => {
            return err.status == '304' ? of(false) : throwError(err);
        }));

    }

    // handleError(error: HttpErrorResponse) {
    //     let errorMessage = '';
    //     if (error.error instanceof ErrorEvent) {
    //         // Erro ocorreu no lado do client
    //         console.log('passei pelo handler client')
    //         errorMessage = error.error.message;
    //     } else {
    //         // Erro ocorreu no lado do servidor
    //         console.log('passei pelo handler servidor')
    //         errorMessage = `Código do erro: ${error.status}, ` + `menssagem: ${error.message}`;
    //     }
    //     console.log(errorMessage)
    //     return throwError(errorMessage);
    // }
}

/*
O HttpClient usa a interface XMLHttpRequest que também suporta a navegadores antigos, além de fácil de usar disponibiliza benefícios, como:
  Solicitações de request e response interceptadas
  Manipulação de erros simplificada
  Suporte a api Observable
  APIs e tratamentos de erros

json-server faz uma API REST fake
*/


//para ter acesso ao codigo de status e cabeçalho, tem que passar o parametro: {observe: 'response'} na requisição.

//of do rxjs pode criar um observable de qualquer coisa. Ex: x = of([1,2,3,4]), cria um observable que se fizer subscribe serão esses os valores do array

//throwError permite lançar um erro que vai lançado pelo rxjs

//catchError permite fazer um tratamento do erro para casos especiais e nesse nosso caso foi fundamental para retornar um novo observable false ou fazer com que o observable continue dando o erro 'throwError'.

