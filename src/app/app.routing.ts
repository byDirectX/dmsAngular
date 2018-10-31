import { RouterModule, Routes } from '@angular/router';
import { FormEditComponent } from './form-edit/form-edit.component';
import { FormUploadComponent } from './form-upload/form-upload.component';
import { ListDocumentComponent } from './list-document/list-document.component';

const routes: Routes = [
    { path: '', redirectTo: '/list-document', pathMatch: 'full' },
    { path: 'list-document', component: ListDocumentComponent},
    { path: 'edit-document', component: FormEditComponent },
    { path: 'upload-document', component: FormUploadComponent },
];

export const routing = RouterModule.forRoot(routes);