import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ModalContactPageRoutingModule } from './modal-contact-routing.module';

import { ModalContactPage } from './modal-contact.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ModalContactPageRoutingModule
  ],
  declarations: [ModalContactPage]
})
export class ModalContactPageModule {}
