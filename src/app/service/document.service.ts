import {Injectable} from '@angular/core';
import {HttpClient, HttpEvent, HttpRequest} from '@angular/common/http';
import {Doc} from '../model/doc';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DocumentService {

  private baseUrl = 'http://localhost:8080/documents';

  public constructor(private http: HttpClient) {
    console.log('Run service documents');
  }

  public getDocuments(searchString: string, typeSearch: number, order: number, ascending: boolean): Observable<Doc[]> {
    return this.http.get<Doc[]>(`${this.baseUrl}?typeSearch=${typeSearch}&searchString=${searchString}&order=${order}&ascending=${ascending}`);
  }

  public getDocument(id: number) {
    return this.http.get<Doc>(`${this.baseUrl}/${id}`);
  }

  public saveFile(doc: Doc) {
    const xhr = new XMLHttpRequest();
    xhr.open('GET', `${this.baseUrl}/getfile?docId=${doc.id}`);
    xhr.responseType = 'arraybuffer';

    xhr.onload = function () {
      if (this.status === 200) {
        const blob = getType(doc.ext, xhr.responseType);

        const objectUrl = URL.createObjectURL(blob);

        const link = document.createElement('a');
        link.download = doc.fileName + doc.ext;
        link.href = objectUrl;
        link.click();
      }
    };
    xhr.send();
  }

  public createDocument(file: File, fileAuthor: string, typeDocChange: number): Observable<HttpEvent<{}>> {
    const formdata: FormData = new FormData();
    formdata.append('file', file);

    const req = new HttpRequest('POST', `${this.baseUrl}/add?author=${fileAuthor}&td=${typeDocChange}`, formdata, {
      reportProgress: true,
      responseType: 'text',
    });

    console.log('create request: ' + req);

    return this.http.request(req);
  }

  public removeDocument(id: number): Observable<Doc> {
    return this.http.delete<Doc>(`${this.baseUrl}/${id}`);
  }

  public updateDocument(document: Doc) {
    return this.http.put(`${this.baseUrl}/${document.id}`, document);
  }
}

function getType(extension: string, response: string) {
  switch (extension) {
    case '.pdf': {
      return new Blob([response], {type: 'application/pdf'});
    }
    case '.txt': {
      return new Blob([response], {type: 'text/plain'});
    }
    case '.html': {
      return new Blob([response], {type: 'text/html'});
    }
    case '.htm': {
      return new Blob([response], {type: 'text/html'});
    }
    case '.epub': {
      return new Blob([response], {type: 'application/epub+zip'});
    }
    case '.doc': {
      return new Blob([response], {type: 'application/msword'});
    }
    case '.docx': {
      return new Blob([response], {type: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'});
    }
    case '.xls': {
      return new Blob([response], {type: 'application/vnd.ms-excel'});
    }
    case '.xlsx': {
      return new Blob([response], {type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'});
    }
    case '.ppt': {
      return new Blob([response], {type: 'application/vnd.ms-powerpoint'});
    }
    case '.pptx': {
      return new Blob([response],
        {type: 'application/vnd.openxmlformats-officedocument.presentationml.presentation'});
    }
    case '.odt': {
      return new Blob([response],
        {type: 'application/vnd.oasis.opendocument.text '});
    }
    default : {
      return new Blob([response], {type: 'application/octet-stream'});
    }
  }
}
