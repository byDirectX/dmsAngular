import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { DocumentService } from '../service/document.service';
import { Doc } from '../model/doc';

@Component({
  selector: 'list-document',
  templateUrl: './list-document.component.html',
  styleUrls: ['./list-document.component.css']
})
export class ListDocumentComponent implements OnInit {

  private page = 0;
  private documents: Doc[];
  private documentId: number;

  private searchString: any = '';
  private typeSearch = 1;

  private order = 1;
  private ascending = true;

  private p = 1;

  constructor(private router: Router, private documentService: DocumentService,
    private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.getPages();
  }

  // setPage(i, event: any) {
  //   event.preventDefault();
  //   this.page = i;
  //   this.getPages();
  // }

  getPages() {
    console.log('calling getPages');
    // this.documentService.getDocuments(this.page).subscribe(
    //   data => {
    //     this.documents = data['content'];
    //     this.pages = new Array(data['totalPages']);
    //   },
    //   (error) => {
    //     console.log(error.error.message);
    //   }
    //   );
    this.documentService.getDocuments().subscribe(
      data => {
        this.documents = data;
      },
      (error) => {
        console.log(error.error.message);
      }
    );
    }

  removeDocument(document: Doc): void {
    this.documentService.removeDocument(document.id).subscribe(data => {
      this.documents = this.documents.filter(c => c !== document);
    });
  }

  editDocument(document: Doc): void {
    this.router.navigate(['edit-document/' + document.id]);
  }

  goToUploadDocument() {
    this.router.navigate(['upload-document']);
  }
}
