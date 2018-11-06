import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {TypeDoc} from '../model/typedoc';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class TypeDocService {

  private baseUrl = 'http://31.148.99.234:8080/typedoc';

  public constructor(private http: HttpClient) {
    console.log('Run service typedoc');
  }

  public getTypeDocs() {
    return this.http.get(this.baseUrl).pipe(map(data => data as TypeDoc[]));
  }

  public getTypeDoc(id: number): Observable<TypeDoc> {
    return this.http.get<TypeDoc>(`${this.baseUrl}/edit/${id}`);
  }

  public createTypeDoc(typeDoc) {
    return this.http.post<TypeDoc>(this.baseUrl, typeDoc);
  }

  public removeTypeDoc(id: number): Observable<TypeDoc> {
    return this.http.delete<TypeDoc>(`${this.baseUrl}/remove/${id}`);
  }
}
