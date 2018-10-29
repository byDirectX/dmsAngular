import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PdfViewerComp } from './pdf-viewer.component';

describe('PdfViewerComponent', () => {
  let component: PdfViewerComp;
  let fixture: ComponentFixture<PdfViewerComp>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PdfViewerComp ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PdfViewerComp);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
