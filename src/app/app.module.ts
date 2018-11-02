import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { routing } from './app.routing';
import { AppComponent } from './app.component';
import { FormUploadComponent } from './form-upload/form-upload.component';
import { DocumentService} from './service/document.service';
import { TypeDocService} from './service/typedoc.service';
import { HttpClientModule} from '@angular/common/http';
import { ListDocumentComponent } from './list-document/list-document.component';
import { FormEditComponent } from './form-edit/form-edit.component';
import { SearchPipe } from './pipe/search.pipe';
import { OrderByPipe } from './pipe/order.by.pipe';

@NgModule({
  declarations: [
    AppComponent,
    FormUploadComponent,
    ListDocumentComponent,
    FormEditComponent,
    SearchPipe, OrderByPipe
  ],
  imports: [
    routing,
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [DocumentService, TypeDocService],
  bootstrap: [AppComponent]
})
export class AppModule { }
