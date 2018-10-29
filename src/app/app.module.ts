import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { routing } from './app.routing';
import { AppComponent } from './app.component';
import { FormUploadComponent } from './form-upload/form-upload.component';
import { DocumentService} from './service/document.service';
import { FormClassService} from './service/fromclass.service';
import { TypeDocService} from './service/typedoc.service';
import { HttpClientModule} from '@angular/common/http';
import { ListDocumentComponent } from './list-document/list-document.component';
import { FormEditComponent } from './form-edit/form-edit.component';
import { PdfViewerModule } from 'ng2-pdf-viewer';
import { PdfViewerComp } from './pdf-viewer/pdf-viewer.component';

@NgModule({
  declarations: [
    AppComponent,
    FormUploadComponent,
    ListDocumentComponent,
    FormEditComponent,
    PdfViewerComp
  ],
  imports: [
    routing,
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    PdfViewerModule,
  ],
  providers: [DocumentService, FormClassService, TypeDocService],
  bootstrap: [AppComponent]
})
export class AppModule { }
