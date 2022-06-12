import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListComponent } from './list.component';
import { AddComponent } from './add.component';
import { EditComponent } from './edit.component';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { ProtectGuard } from '../protect.guard';
import { ViewComponent } from './view.component';
import { RequestComponent } from './request.component';
import { LittercardComponent } from './littercard.component';
import { AdoptstatusComponent } from './adoptstatus.component';
import { NgxPaginationModule } from 'ngx-pagination';

@NgModule({
  declarations: [
    ListComponent,
    AddComponent,
    EditComponent,
    ViewComponent,
    RequestComponent,
    LittercardComponent,
    AdoptstatusComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    NgxPaginationModule,

    RouterModule.forChild([
      { path: '', component: ListComponent },
      { path: 'view', component: ViewComponent },
      { path: 'view/:id', component: RequestComponent },
      { path: 'adopt/:id', component: AdoptstatusComponent },
      { path: 'add', component: AddComponent },
      {
        path: 'edit/:id',
        component: EditComponent,
        canActivate: [ProtectGuard],
      },
    ]),
  ],
})
export class LittersModule {}
