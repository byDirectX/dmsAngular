import {Component, OnInit} from '@angular/core';
import {Doc} from '../model/doc';
import {FormGroup, FormBuilder, Validators} from '@angular/forms';
import {DocumentService} from '../service/document.service';
import {Router} from '@angular/router';
import {first} from 'rxjs/operators';
import {ActivatedRoute} from '@angular/router';
import {TypeDocService} from '../service/typedoc.service';
import {TypeDoc} from '../model/typedoc';

@Component({
  selector: 'app-form-edit',
  templateUrl: './form-edit.component.html',
  styleUrls: ['./form-edit.component.css']
})
export class FormEditComponent implements OnInit {

  public doc: Doc;
  public editForm: FormGroup;
  public typeDocArray: TypeDoc[];
  public typeDoc: TypeDoc = new TypeDoc();

  public constructor(private formBuilder: FormBuilder, private router: Router,
                     private documentService: DocumentService, private route: ActivatedRoute, private typeDocService: TypeDocService) {

    this.editForm = this.formBuilder.group({
      id: [],
      fileName: ['', Validators.required],
      fileAuthor: ['', Validators.required],
      dateUploading: ['', Validators.required],
      fileVersion: ['', Validators.required],
      ext: ['', Validators.required],
      filePath: ['', Validators.required],
      size: ['', Validators.required],
      typeDoc: ['', Validators.required],
    });

  }

  public ngOnInit() {
    const documentId = this.route.snapshot.paramMap.get('docId');

    this.typeDocService.getTypeDocs().subscribe(data => {
      this.typeDocArray = data;
    });

    console.log('begin get document' + documentId);
    this.documentService.getDocument(+documentId)
      .subscribe(data => {
        this.doc = data
        console.log('document: ' + data);
      });

    if (!documentId) {
      alert('Возникла критическая ошибка!');
      this.router.navigate(['']);
      return;
    }

    this.documentService.getDocument(+documentId)
      .subscribe(data => {
        this.editForm.setValue(data);
      });
  }

  public createTypeDoc() {
    this.typeDocService.createTypeDoc(this.typeDoc).subscribe(data => { });
    this.typeDocService.getTypeDocByName(this.typeDoc.name).subscribe(data => {
      this.typeDocArray.push(data);
    });

    console.log('after pushing: ' + this.typeDocArray);
  }

  public onSubmit() {
    this.documentService.updateDocument(this.editForm.value)
      .pipe(first())
      .subscribe(data => {
        },
        error => {
          alert('Кажется у нас возникла ошибка!');
        });
    window.location.reload();
  }

  public saveFile(document: Doc) {
    this.documentService.saveFile(document);
  }

}

function convertToBoolean(input: string): boolean | undefined {
  try {
    return JSON.parse(input);
  } catch (e) {
    return undefined;
  }
}
