import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpEvent, HttpRequest } from '@angular/common/http';
import { Document } from '../model/document';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class DocumentService {

    private baseUrl = 'http://localhost:8080/documents';
    private httpHeaders = new HttpHeaders({'Content-Type': 'application/json'});

    constructor(private http: HttpClient) {
        console.log('Run service documents');
    }

    getDocuments(page: number): Observable<Document[]> {
        return this.http.get(this.baseUrl + '?page=' + page).pipe(
            map(data => data as Document[])
        );
    }

    getDocument(id: number) {
        return this.http.get<Document>(this.baseUrl + '/' + id, { headers: this.httpHeaders });
    }

    getFileById(id: number): object {
        return this.http.get<Object>(this.baseUrl + "/getfile?docPdfId=" + id, { headers: this.httpHeaders});
    }

    saveFile(id: number) {
        var xhr = new XMLHttpRequest();
        xhr.open("GET", this.baseUrl + '/getfile?docPdfId=' + id);
        xhr.responseType = "arraybuffer";

        xhr.onload = function () {
            if (this.status === 200) {
                var blob = new Blob([xhr.response], { type: "application/pdf" });
                var objectUrl = URL.createObjectURL(blob);
                window.open(objectUrl);
            }
        };
        xhr.send();
    }

    createDocument(file: File): Observable<HttpEvent<{}>> {
        let formdata: FormData = new FormData();
        formdata.append('file', file);

        const req = new HttpRequest('POST', 'http://localhost:8080/documents/add', formdata, {
            reportProgress: true,
            responseType: 'text',
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