import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {TypeDoc} from '../model/typedoc';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TypeDocService {

  private baseUrl = 'https://31.148.99.234:8443/dms';

  public constructor(private http: HttpClient) {
    console.log('Run service typedoc');
  }

  public getTypeDocs(): Observable<TypeDoc[]> {
    return this.http.get<TypeDoc[]>(this.baseUrl);
  }

  public getTypeDoc(id: number): Observable<TypeDoc> {
    return this.http.get<TypeDoc>(`${this.baseUrl}/edit/${id}`);
  }

  public getTypeDocByName(name: string): Observable<TypeDoc> {
    return this.http.get<TypeDoc>(`${this.baseUrl}/get/${name}`);
  }

  public createTypeDoc(typeDoc) {
    return this.http.post<TypeDoc>(this.baseUrl, typeDoc);
  }

  public removeTypeDoc(id: number): Observable<TypeDoc> {
    return this.http.delete<TypeDoc>(`${this.baseUrl}/remove/${id}`);
  }
}
