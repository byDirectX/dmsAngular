import { Component, OnInit } from '@angular/core';
import { Document } from '../model/document';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { DocumentService } from '../service/document.service';
import { Router } from '@angular/router';
import { first } from 'rxjs/operators';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'form-edit',
  templateUrl: './form-edit.component.html',
  styleUrls: ['./form-edit.component.css']
})
export class FormEditComponent implements OnInit {

  document: Document;
  editForm: FormGroup;

  constructor(private formBuilder: FormBuilder, private router: Router,
    private documentService: DocumentService, private route: ActivatedRoute) { }

  ngOnInit() {
    const documentId = localStorage.getItem('editDocumentId');
    // const documentId = this.route.snapshot.paramMap.get("id");
    //this.route.params.subscribe(params => this.documentId = params['id'])

    if (!documentId) {
      alert('Действие невозможно');
      // this.router.navigate(['list-document']);
      this.router.navigate(['']);
      return;
    }

    this.editForm = this.formBuilder.group({
      id: [],
      fileName: ['', Validators.required],
      fileAutor: ['', Validators.required],
      dateUploading: ['', Validators.required],
      dateLastEditing: ['', Validators.required],
      fileVersion: ['', Validators.required],
      ext: ['', Validators.required],
      filePath: ['', Validators.required],
      size: ['', Validators.required],
      typeDoc: ['', Validators.required]
    });
    
    this.documentService.getDocument(+documentId)
      .subscribe(data => {
        this.editForm.setValue(data);
      });
  }

  onSubmit() {
    this.documentService.updateDocument(this.editForm.value)
      .pipe(first())
      .subscribe(data => {
        // this.router.navigate(['list-document']);
        this.router.navigate(['']);
      },
      error => {
        alert(error);
      });
  }

}
