import { Component, OnInit } from '@angular/core';
import { Doc } from '../model/doc';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { DocumentService } from '../service/document.service';
import { Router } from '@angular/router';
import { first } from 'rxjs/operators';
import { ActivatedRoute } from '@angular/router';
import {TypeDocService} from '../service/typedoc.service';
import {TypeDoc} from '../model/typedoc';

@Component({
  selector: 'form-edit',
  templateUrl: './form-edit.component.html',
  styleUrls: ['./form-edit.component.css']
})
export class FormEditComponent implements OnInit {

  private doc: Doc;
  private editForm: FormGroup;
  private hide: boolean;
  private typeDocArray: TypeDoc[];
  private typeDoc: TypeDoc = new TypeDoc();

  constructor(private formBuilder: FormBuilder, private router: Router,
    private documentService: DocumentService, private route: ActivatedRoute, private typeDocService: TypeDocService) { }

  ngOnInit() {
    const documentId = this.route.snapshot.paramMap.get('docId');

    this.typeDocService.getTypeDocs().subscribe(data => {
      this.typeDocArray = data;
    });

    this.documentService.getDocument(+documentId)
      .subscribe(data => this.doc = data);

    if (!documentId) {
      alert('Возникла критическая ошибка!');
      this.router.navigate(['']);
      return;
    }

    this.editForm = this.formBuilder.group({
      id: [],
      fileName: ['', Validators.required],
      fileAuthor: ['', Validators.required],
      dateUploading: ['', Validators.required],
      dateLastEditing: ['', Validators.required],
      fileVersion: ['', Validators.required],
      ext: ['', Validators.required],
      filePath: ['', Validators.required],
      size: ['', Validators.required],
      typeDoc: ['', Validators.required],
    });

    this.documentService.getDocument(+documentId)
      .subscribe(data => {
        this.editForm.setValue(data);
      });
  }

  createTypeDoc() {
    console.log('create typedoc: ' + this.typeDoc);
    this.typeDocService.createTypeDoc(this.typeDoc).subscribe(data => {
      alert('create typedoc succesfull');
    });
    this.typeDocArray.push(this.typeDoc);
  }

  onSubmit() {
    this.documentService.updateDocument(this.editForm.value)
      .pipe(first())
      .subscribe(data => {
        },
        error => {
          alert('Упс, кажется у нас возникла ошибка!');
        });
    window.location.reload();
  }

  saveFile(document: Doc) {
    this.documentService.saveFile(document);
    console.log(document.id + ' ' + document.ext);
  }

}

function convertToBoolean(input: string): boolean | undefined {
  try {
    return JSON.parse(input);
  } catch (e) {
    return undefined;
  }
}
