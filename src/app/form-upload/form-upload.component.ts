import { Component, OnInit } from '@angular/core';
import { DocumentService } from '../service/document.service';
import { HttpEventType, HttpResponse } from '@angular/common/http';

@Component({
  selector: 'form-upload',
  templateUrl: './form-upload.component.html',
  styleUrls: ['./form-upload.component.css']
})
export class FormUploadComponent implements OnInit {

  private selectedFiles: FileList;
  private currentFileUpload: File;
  private nameFile = 'Выберите файл';
  private uploadButton = 'Загрузить';

  constructor(private documentService: DocumentService) { }

  ngOnInit() {
  }

  selectFile(event) {
    this.selectedFiles = event.target.files;
    this.nameFile = this.selectedFiles.item(0).name;
    this.uploadButton = 'Загрузить';
  }

  upload() {
    this.currentFileUpload = this.selectedFiles.item(0);
    this.documentService.createDocument(this.currentFileUpload).subscribe(event => {
      if (event instanceof HttpResponse) {
        console.log('File is completely uploaded!');
      }
      this.uploadButton = 'Успех!';
    });

    this.selectedFiles = undefined;
  }

}
