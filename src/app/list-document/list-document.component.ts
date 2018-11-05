import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { DocumentService } from '../service/document.service';
import { Doc } from '../model/doc';
import { fromEvent } from 'rxjs';
import { filter, debounceTime, distinctUntilChanged, mergeMap } from 'rxjs/operators';

@Component({
  selector: 'list-document',
  templateUrl: './list-document.component.html',
  styleUrls: ['./list-document.component.css']
})
export class ListDocumentComponent implements OnInit {

  public documents: Doc[];
  private documentId: number;

  @ViewChild('searchString')
  public searchString: ElementRef<HTMLInputElement> = null;

  public typeSearch = 1;

  public order = 1;
  public ascending = true;

  private p = 1;

  constructor(private router: Router, private documentService: DocumentService,
    private activatedRoute: ActivatedRoute) {
    this.documentService.getDocuments('', 1).subscribe(
      request => {
        this.documents = request;
      }
    );
  }

  ngOnInit() {
    fromEvent(this.searchString.nativeElement, 'input').pipe(
      filter((value) => !!value),
      debounceTime(250),
      distinctUntilChanged(),
      mergeMap((value) => this.documentService
        .getDocuments(this.searchString.nativeElement.value, this.typeSearch)))
      .subscribe((response) => {
        this.documents = response;
        console.log(response);
        console.log(this.documents);
    });
  }

  // selectionChange() {
  //   console.log(this.typeSearch + ' | ' + this.searchString.nativeElement.value);
  //   this.documentService.getDocuments(this.searchString.nativeElement.value, this.typeSearch)
  //     .subscribe((response) => {
  //       this.documents = response;
  //       console.log(response);
  //     }
  //   );
  // }

  // getPages() {
  //   console.log('calling getPages');
    // this.documentService.getDocuments(this.page).subscribe(
    //   data => {
    //     this.documents = data['content'];
    //     this.pages = new Array(data['totalPages']);
    //   },
    //   (error) => {
    //     console.log(error.error.message);
    //   }
    //   );


    // work //
    // this.documentService.getDocuments().subscribe(
    //   data => {
    //     this.documents = data;
    //   },
    //   (error) => {
    //     console.log(error.error.message);
    //   }
    // );
    // }

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
