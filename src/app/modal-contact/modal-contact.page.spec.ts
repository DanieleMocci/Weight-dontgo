import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ModalContactPage } from './modal-contact.page';

describe('ModalContactPage', () => {
  let component: ModalContactPage;
  let fixture: ComponentFixture<ModalContactPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalContactPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ModalContactPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
