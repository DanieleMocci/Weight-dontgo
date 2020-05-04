import { Injectable } from '@angular/core';
import { AngularDelegate, ToastController } from '@ionic/angular';
import { noop, Observable, Subscriber } from 'rxjs';
import { Contact } from './contact';
import { BluetoothSerial } from '@ionic-native/bluetooth-serial/ngx';
import {BackgroundGeolocation} from '@ionic-native/background-geolocation/ngx'

@Injectable({
  providedIn: 'root'
})
export class ArduinoServiceService {
  statConn: boolean = false
  data = this.bluetoothCtrl.subscribe("\n")
  constructor(
    public bluetoothCtrl: BluetoothSerial,
    public toastCtrl: ToastController,
  ) { }


  getBatteryStatus() {
      //TODO get batteryStatus
      return noop()
  }

  getSensorData() {
    //TODO getSensorData
    return noop()
  }



  setNewContact(contactData, isUpdate) {
    console.log("E' una modifica: ", isUpdate)
    console.log('scrivo i dati al bluetooth serial')
    let initString = 'sc'
    let number
    if (isUpdate) {
      initString = 'mc'
    }
    if (contactData.main) {
      number = '+39' + contactData.number
    } else {
      number = contactData.number
    }
    console.log(initString + contactData.id + ':' + contactData.name + '_' + contactData.number + '\n')
    return this.bluetoothCtrl.write(initString + contactData.id + ":" + contactData.name + "_" + number + "\n").then(res => {
      console.log(res)
    })
  }

  deleteContact(id) {
    return this.bluetoothCtrl.write("dc" + id + "\n")
  }

  defineStatusBluetooth() {
    return this.bluetoothCtrl.isEnabled()
  }

  enableBluetooth() {
    return this.bluetoothCtrl.enable()
  }

  sendPosition(lat, lon) {
      this.bluetoothCtrl.write("gp:" + lat + "_" + lon + "\n")
  }
}
