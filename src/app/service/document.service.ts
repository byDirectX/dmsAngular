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

    saveFile(id: number, ext: string) {
        const xhr = new XMLHttpRequest();
        xhr.open('GET', this.baseUrl + '/getfile?docId=' + id);
        xhr.responseType = 'arraybuffer';

        xhr.onload = function () {
          if (this.status === 200) {
            let blob;
            switch (ext) {
              case '.pdf': {
                blob = new Blob([xhr.response], { type: 'application/pdf' });
                break;
              }
              case '.txt': {
                blob = new Blob([xhr.response], { type: 'text/plain' });
                break;
              }
              case '.html | .htm': {
                blob = new Blob([xhr.response], { type: 'text/html' });
                break;
              }
              case '.epub': {
                blob = new Blob([xhr.response], { type: 'application/epub+zip' });
                break;
              }
              case '.doc': {
                blob = new Blob([xhr.response], { type: 'application/msword' });
                break;
              }
              case '.docx': {
                blob = new Blob([xhr.response], { type: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' });
                break;
              }
              case '.xls': {
                blob = new Blob([xhr.response], { type: 'application/vnd.ms-excel' });
                break;
              }
              case '.xlsx': {
                blob = new Blob([xhr.response], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
                break;
              }
              case '.ppt': {
                blob = new Blob([xhr.response], { type: 'application/vnd.ms-powerpoint' });
                break;
              }
              case '.pptx': {
                blob = new Blob([xhr.response],
                  { type: 'application/vnd.openxmlformats-officedocument.presentationml.presentation' });
                break;
              }
              case '.djvy': {
                blob = new Blob([xhr.response],
                  { type: 'image/x.djvu' });
                break;
              }
              default : {
                blob = new Blob([xhr.response], { type: 'application/octet-stream' });
                break;
              }
            }
            const objectUrl = URL.createObjectURL(blob);
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
