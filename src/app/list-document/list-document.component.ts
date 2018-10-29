import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DocumentService } from '../service/document.service';
import { Document } from '../model/document';
import { first } from 'rxjs/operators';

@Component({
  selector: 'list-document',
  templateUrl: './list-document.component.html',
  styleUrls: ['./list-document.component.css']
})
export class ListDocumentComponent implements OnInit {

  private page: number = 0;
  private documents: Document[];
  private pages: number[];

  constructor(private router: Router, private documentService: DocumentService) { }

  ngOnInit() {
    this.getPages();
  }

  setPage(i, event:any) {
    // check
    event.preventDefault();
    this.page = i;
    this.getPages();
  }

  getPages() {
    this.documentService.getDocuments(this.page).subscribe(
      data => {
        this.documents = data['content'];
        this.pages = new Array(data['totalPages']);
      },
      (error) => {
        console.log(error.error.message);
      }
      )
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
