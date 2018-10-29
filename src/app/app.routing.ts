import { RouterModule, Routes } from '@angular/router';
import { FormEditComponent } from './form-edit/form-edit.component';
import { FormUploadComponent } from './form-upload/form-upload.component';
import { ListDocumentComponent } from './list-document/list-document.component';
import { PdfViewerComp } from './pdf-viewer/pdf-viewer.component';

const routes: Routes = [
    // { path: 'list-document', component: ListDocumentComponent },
    { path: '', component: ListDocumentComponent},
    { path: 'edit-document', component: FormEditComponent },
    { path: 'upload-document', component: FormUploadComponent },
    { path: 'pdf-view', component: PdfViewerComp }
];

export const routing = RouterModule.forRoot(routes);