import {Component, OnInit} from '@angular/core';
import {DocumentService} from '../service/document.service';
import {HttpResponse} from '@angular/common/http';
import {TypeDoc} from '../model/typedoc';
import {TypeDocService} from '../service/typedoc.service';
import {FormControl, Validators} from '@angular/forms';

@Component({
  selector: 'app-form-upload',
  templateUrl: './form-upload.component.html',
  styleUrls: ['./form-upload.component.css']
})
export class FormUploadComponent implements OnInit {

  public selectedFiles: FileList;
  public currentFileUpload: File;
  public nameFile = 'Выберите файл';
  public typeDocArray: TypeDoc[];
  public sizeFile: number;
  public typeDoc: TypeDoc = new TypeDoc();

  public author = new FormControl('', Validators.pattern('^[A-z0-9а-яА-Я_ ]*$'));
  public typeDocChange = new FormControl('', Validators.required);


  public constructor(private documentService: DocumentService, private typeDocService: TypeDocService) {
  }

  public ngOnInit() {
    this.updateTypeDoc();
  }

  public updateTypeDoc() {
    this.typeDocService.getTypeDocs().subscribe(data => {
      this.typeDocArray = data;
    });
  }

  public createTypeDoc() {
    this.typeDocService.createTypeDoc(this.typeDoc).subscribe(data => {
    });
    this.typeDocService.getTypeDocByName(this.typeDoc.name).subscribe(data => {
      this.typeDocArray.push(data);
    });
  }

  public selectFile(event) {
    this.selectedFiles = event.target.files;
    this.sizeFile = this.selectedFiles.item(0).size / 1e+6;
    this.nameFile = this.selectedFiles.item(0).name;
  }

  public upload() {
    this.currentFileUpload = this.selectedFiles.item(0);
    this.documentService.createDocument(this.currentFileUpload, this.author.value, this.typeDocChange.value).subscribe(event => {
      if (event instanceof HttpResponse) {

      }
    });

    this.selectedFiles = undefined;
  }
}
