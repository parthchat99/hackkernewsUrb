import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class NewsDjangoService {


  constructor(private httpClient: HttpClient, private route: ActivatedRoute) {

  }

  getApiNews(limit: string, offset: string){

    let params = new HttpParams().set('limit', limit).set('offset', offset); // create params object

    return this.httpClient.post('http://127.0.0.1:8000/articles/top-articles/',{params: params})
  }

  getNews(limit: string, offset: string){

    let params = new HttpParams().set('limit', limit).set('offset', offset); // create params object

    return this.httpClient.get('http://127.0.0.1:8000/articles/top-articles/',{params: params})
  }

}
