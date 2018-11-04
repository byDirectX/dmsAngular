import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpEvent, HttpRequest } from '@angular/common/http';
import { Doc } from '../model/doc';
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

  getDocuments(): Observable<Doc[]> {
      return this.http.get(this.baseUrl).pipe(
        map(data => data as Doc[])
      );
  }

  getDocument(id: number) {
    return this.http.get<Doc>(this.baseUrl + '/' + id, { headers: this.httpHeaders });
  }

  saveFile(doc: Doc) {
    const xhr = new XMLHttpRequest();
    xhr.open('GET', this.baseUrl + '/getfile?docId=' + doc.id);
    xhr.responseType = 'arraybuffer';

    xhr.onload = function () {
      if (this.status === 200) {
        let blob;
        switch (doc.ext) {
          case '.pdf': {
            blob = new Blob([xhr.response], { type: 'application/pdf' });
            break;
          }
          case '.txt': {
            blob = new Blob([xhr.response], { type: 'text/plain' });
            break;
          }
          case '.html': {
            blob = new Blob([xhr.response], { type: 'text/html' });
            console.log('html download')
            break;
          }
          case '.htm': {
            blob = new Blob([xhr.response], { type: 'text/html' });
            console.log('html download')
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
          case '.odt': {
            blob = new Blob([xhr.response],
              { type: 'application/vnd.oasis.opendocument.text '});
            break;
          }
          default : {
            blob = new Blob([xhr.response], { type: 'application/octet-stream' });
            console.log('default download');
            break;
          }
        }
        const objectUrl = URL.createObjectURL(blob);

        const link = document.createElement('a');
        link.download = doc.fileName + doc.ext;
        link.href = objectUrl;
        link.click();
      }
    };
    xhr.send();
  }

  createDocument(file: File, fileAuthor: string, typeDocChange: number): Observable<HttpEvent<{}>> {
    const formdata: FormData = new FormData();
    formdata.append('file', file);

    const req = new HttpRequest('POST', 'http://localhost:8080/documents/add?author=' +
      fileAuthor + '&td=' + typeDocChange, formdata, {
      reportProgress: true,
      responseType: 'text',
    });

    console.log('create request: ' + req);

    return this.http.request(req);
  }

  removeDocument(id: number): Observable<Doc> {
    return this.http.delete<Doc>(this.baseUrl + '/' + id);
  }

  updateDocument(document: Doc) {
    return this.http.put(this.baseUrl + '/' + document.id, document);
  }
}
