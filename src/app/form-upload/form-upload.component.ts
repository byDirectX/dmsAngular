import { Component, OnInit } from '@angular/core';
import { DocumentService } from '../service/document.service';
import { HttpEventType, HttpResponse } from '@angular/common/http';
import { TypeDoc } from '../model/typedoc';
import { TypeDocService } from '../service/typedoc.service';

@Component({
  selector: 'form-upload',
  templateUrl: './form-upload.component.html',
  styleUrls: ['./form-upload.component.css']
})
export class FormUploadComponent implements OnInit {

  private selectedFiles: FileList;
  private currentFileUpload: File;
  private nameFile = 'Выберите файл';
  private author = '';
  private typeDocArray: TypeDoc[];
  private typeDocChange: number;
  private typeDoc: TypeDoc = new TypeDoc();

  constructor(private documentService: DocumentService, private typeDocService: TypeDocService) { }

  ngOnInit() {
    this.updateTypeDoc();
  }

  updateTypeDoc() {
    this.typeDocService.getTypeDocs().subscribe(data => {
      this.typeDocArray = data;
    });
  }

  createTypeDoc() {
    console.log('create typedoc: ' + this.typeDoc);
    this.typeDocService.createTypeDoc(this.typeDoc).subscribe(data => {
      alert('create typedoc succesfull');
    });
    this.typeDocArray.push(this.typeDoc);
  }

  selectFile(event) {
    this.selectedFiles = event.target.files;
    this.nameFile = this.selectedFiles.item(0).name;
  }

  upload() {
    this.currentFileUpload = this.selectedFiles.item(0);
    console.log('fileAuthor: ' + this.author  + ' typeDocChange: ' + this.typeDocChange);
    this.documentService.createDocument(this.currentFileUpload, this.author, this.typeDocChange).subscribe(event => {
      if (event instanceof HttpResponse) {
        console.log('File is completely uploaded!');
      }
    });

    this.selectedFiles = undefined;
  }
}
