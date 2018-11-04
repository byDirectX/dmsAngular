import { Injectable } from '@angular/core';
import {HttpClient, HttpEvent, HttpHeaders, HttpRequest} from '@angular/common/http';
import { TypeDoc } from '../model/typedoc';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class TypeDocService {

    private baseUrl = 'http://localhost:8080/typedoc';
    private httpHeaders = new HttpHeaders({'Content-Type': 'application/json'});

    constructor(private http: HttpClient) {
        console.log('Run service typedoc');
    }

    getTypeDocs() {
      return this.http.get(this.baseUrl).pipe(map(data => data as TypeDoc[]));
    }

    getTypeDoc(id: number): Observable<TypeDoc> {
      return this.http.get<TypeDoc>(`${this.baseUrl}/edit?id=${id}`);
    }

  public createTypeDoc(typeDoc) {
    return this.http.post<TypeDoc>(this.baseUrl, typeDoc);
  }

    removeTypeDoc(id: number): Observable<TypeDoc> {
        return this.http.delete<TypeDoc>(`${this.baseUrl}/remove?id=${id}`, {headers: this.httpHeaders});
    }
}
