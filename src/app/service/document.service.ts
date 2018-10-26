import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpEvent, HttpRequest } from '@angular/common/http';
import { Document } from '../model/document';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

// const httpOptions = {
//     headers: new HttpHeaders( { 'Content-Type': 'application/json' } )
// }

@Injectable({
    providedIn: 'root'
})
export class DocumentService {

    private baseUrl = 'http://localhost:8080/documents';
    private httpHeaders = new HttpHeaders({'Content-Type': 'application/json'});

    constructor(private http: HttpClient) {
        console.log('Run service documents');
    }

    getDocuments(): Observable<Document[]> {
        return this.http.get(this.baseUrl).pipe(
            map(data => data as Document[])
        );
    }

    getDocument(id: number) {
        const headers = new HttpHeaders();
        headers.append('Access-Control-Allow-Headers', 'Content-Type');
        headers.append('Access-Control-Allow-Methods', 'GET');
        headers.append('Access-Control-Allow-Origin', '*');

        return this.http.get<Document>(this.baseUrl + '/' + id, { headers: headers });
    }

    createDocument(file: File): Observable<HttpEvent<{}>> {
        let formdata: FormData = new FormData();
        formdata.append('file', file);

        const req = new HttpRequest('POST', 'http://localhost:8080/documents/add', formdata, {
            reportProgress: true,
            responseType: 'text'
        });

        return this.http.request(req);
    }

    removeDocument(id: number): Observable<Document> {
        return this.http.delete<Document>(this.baseUrl + '/' + id);
    }

    updateDocument(document: Document) {
        return this.http.put(this.baseUrl + '/' + document.id, document);
    }
}