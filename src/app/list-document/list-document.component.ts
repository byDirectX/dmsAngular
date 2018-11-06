import {Component, ElementRef, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';
import {DocumentService} from '../service/document.service';
import {Doc} from '../model/doc';
import {fromEvent, Subject} from 'rxjs';
import {filter, debounceTime, distinctUntilChanged, mergeMap, takeUntil} from 'rxjs/operators';

enum Types {
  Name = 1,
  Author = 2,
  TypeDoc = 3,
  Extension = 4
}

@Component({
  selector: 'app-list-document',
  templateUrl: './list-document.component.html',
  styleUrls: ['./list-document.component.css']
})
export class ListDocumentComponent implements OnInit, OnDestroy {

  public documents: Doc[];
  private documentId: number;

  @ViewChild('searchString')
  public searchString: ElementRef<HTMLInputElement> = null;
  public typeSearch = 1;
  public order = 1;
  public ascending = true;

  public types = Types;

  public p = 1;

  private destroy$ = new Subject<void>();


  public constructor(private router: Router, private documentService: DocumentService,
              private activatedRoute: ActivatedRoute) {
    this.documentService.getDocuments('', this.typeSearch, this.order, this.ascending).subscribe(
      request => {
        this.documents = request;
        console.log('request list documents: ' + request + ' ' + this.documents);
      }
    );
  }

  public ngOnInit() {
    fromEvent(this.searchString.nativeElement, 'input').pipe(
      filter((value) => !!value),
      debounceTime(250),
      distinctUntilChanged(),
      mergeMap((value) => this.documentService
        .getDocuments(this.searchString.nativeElement.value, this.typeSearch, this.order, this.ascending)),
      takeUntil(this.destroy$))
      .subscribe((response) => {
        this.documents = response;
      });
  }

  public ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  public selectionChange() {
    this.documentService.getDocuments(this.searchString.nativeElement.value, this.typeSearch, this.order, this.ascending)
      .subscribe(request => {
        this.documents = request;
      });
  }

  public removeDocument(document: Doc): void {
    this.documentService.removeDocument(document.id).subscribe(data => {
      this.documents = this.documents.filter(c => c !== document);
    });
  }

  public editDocument(document: Doc): void {
    this.router.navigate(['edit-document', document.id]);
  }

  public goToUploadDocument() {
    this.router.navigate(['upload-document']);
  }
}
