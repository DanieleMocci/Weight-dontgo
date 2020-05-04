import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ModalContactPage } from './modal-contact.page';

const routes: Routes = [
  {
    path: '',
    component: ModalContactPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ModalContactPageRoutingModule {}
