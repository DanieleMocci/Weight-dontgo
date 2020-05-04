import { Component, OnInit, Input, Output } from '@angular/core';
import { ModalController, NavParams, ToastController, LoadingController } from '@ionic/angular'
import { Contact } from '../contact';
import { EventEmitter } from 'protractor';
import { VirtualTimeScheduler } from 'rxjs';
import { BluetoothSerial } from '@ionic-native/bluetooth-serial/ngx';
import { stringify } from 'querystring';
import { ArduinoServiceService } from '../arduino-service.service';
import { Sim } from '@ionic-native/sim/ngx'

@Component({
  selector: 'app-modal-contact',
  templateUrl: './modal-contact.page.html',
  styleUrls: ['./modal-contact.page.scss'],
})
export class ModalContactPage implements OnInit {
  @Input() contactData: Contact;
  @Input() id: number;
  @Input() isMainFree: boolean
  isUpdate : boolean = false
  constructor(
    private modalCtrl : ModalController, 
    navParams: NavParams, 
    public toastCtrl : ToastController,
    public loadingCtrl: LoadingController,
    private arduinoService: ArduinoServiceService,
    private sim: Sim) { }

  ngOnInit() {
    document.getElementsByName('name')[0].focus
    if (!this.contactData) {
      this.contactData = {
        name: '',
        number: '',
        id: this.id,
        main: false
      }
    } else {
      this.isUpdate = true
    }
    // if (this.isMainFree) {
    //   this.sim.hasReadPermission().then( success => {
    //     this.sim.getSimInfo().then( info => {
    //       this.contactData.number = info.phoneNumber
    //     }).catch( err => {
    //       console.log(err)
    //     })
    //   }).catch(failure => {
    //     this.sim.requestReadPermission().then( () => {
    //       this.sim.getSimInfo().then( info => {
    //         this.contactData.number = info.phoneNumber
    //       }).catch( err => {
    //         console.log(err)
    //       })
    //     }).catch( () => {
    //       console.log('Permission denied')
    //     })
    //   })
    // }
  }

  dismiss() {
    this.modalCtrl.dismiss()
  }

  getTitle() {
    if (this.isUpdate) {
      return 'Update: ' + this.contactData.name
    } else {
      return 'Insert contact'
    }
  }

  getLabelButton() {
    if (this.isUpdate) {
      return 'Update'
    } else {
      return 'Insert'
    }
  }

  submit() {
    console.log('inizio submit')
    
    if (!this.contactData.name && !this.contactData.number) {
      return
    }

    if (!this.isMainFree && this.contactData.main) {
      window.alert('Only one priority contact allowed')
      return
    }

    if (this.contactData.number.length != 10 ) {
      window.alert('Wrong number')
      return
    } 
    let initMsg = this.isUpdate ? 'Updated: ' : 'Inserted: '
    const loading = this.loadingCtrl.create({
      message: 'Sending...',
    }).then(loadingElem => {
      loadingElem.present().then(() => {
        this.arduinoService.setNewContact(this.contactData, this.isUpdate).then( () => {
          this.loadingCtrl.dismiss();
          const toast = this.toastCtrl.create({
            color: "dark",
            duration: 2000,
            message: initMsg + this.contactData.name
          }).then( toastElem => {
            toastElem.present()
          })
          this.dismiss()
        }).catch( err => {
          this.loadingCtrl.dismiss()
          const toast = this.toastCtrl.create({
            color: 'danger',
            duration: 2000,
            message: err
          }).then(toastElem => {
            toastElem.present()
          })
        })
      }).catch(err => {
        this.loadingCtrl.dismiss()
        const toast = this.toastCtrl.create({
          color: 'danger',
          duration: 2000,
          message: 'Error'
        }).then(toastElem => {
          toastElem.present()
        })
      })
    })

  }

  

}

