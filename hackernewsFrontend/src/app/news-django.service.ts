import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class NewsDjangoService {

  constructor(private httpClient: HttpClient) { }

  getNews(){

    const headers = new HttpHeaders({'Content-Type':'application/json; charset=utf-8', 'Accept': 'application/json','Access-Control-Allow-Origin': '*' }); // create header object
    // headers = headers.append('header2', hvalue2); // add a new header, creating a new object
    // headers = headers.append('header3', hvalue3); // add another header
    
    let params = new HttpParams().set('limit', '10'); // create params object
    // params = params.append('param2', value2); // add a new param, creating a new object
    // params = params.append('param3', value3); // add another param 
    
    // return this.http.get<any[]>(url, { headers: headers, params: params }  
    
    return this.httpClient.get('http://127.0.0.1:8000/articles/top-articles/',{headers: headers, params: params})
  }

}
