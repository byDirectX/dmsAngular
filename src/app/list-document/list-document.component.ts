import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DocumentService } from '../service/document.service';
import { Document } from '../model/document';

@Component({
  selector: 'list-document',
  templateUrl: './list-document.component.html',
  styleUrls: ['./list-document.component.css']
})
export class ListDocumentComponent implements OnInit {

  documents: Document[];

  constructor(private router: Router, private documentService: DocumentService) { }

  ngOnInit() {
    this.documentService.getDocuments().subscribe(data => (this.documents = data));
  }

  removeDocument(document: Document): void {
    this.documentService.removeDocument(document.id).subscribe(data => {
      this.documents = this.documents.filter(c => c !== document);
    })
  }

  editDocument(document: Document): void {
    localStorage.removeItem('editDocumentId');
    localStorage.setItem('editDocumentId', document.id.toString());
    this.router.navigate(['edit-document']);
  }

}
