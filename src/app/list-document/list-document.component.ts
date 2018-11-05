import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { DocumentService } from '../service/document.service';
import { Doc } from '../model/doc';
import { fromEvent } from 'rxjs';
import { filter, debounceTime, distinctUntilChanged, mergeMap } from 'rxjs/operators';

enum Types {
  Name = 1,
  Author = 2,
  TypeDoc = 3,
  Extension = 4
}

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

  public types = Types;

  public p = 1;

  constructor(private router: Router, private documentService: DocumentService,
    private activatedRoute: ActivatedRoute) {
    this.documentService.getDocuments('', this.typeSearch, this.order, this.ascending).subscribe(
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
        .getDocuments(this.searchString.nativeElement.value, this.typeSearch, this.order, this.ascending)))
      .subscribe((response) => {
        this.documents = response;
        console.log(response);
        console.log(this.documents);
    });
  }

  selectionChange() {
    this.documentService.getDocuments(this.searchString.nativeElement.value, this.typeSearch, this.order, this.ascending)
      .subscribe(request => {
        this.documents = request;
        console.log(request);
        console.log(this.documents);
      });
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
