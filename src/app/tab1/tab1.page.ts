import { Component } from '@angular/core';
import { ArduinoServiceService } from '../arduino-service.service';
import { AlertController, ToastController } from '@ionic/angular';
import { Geolocation, Geoposition } from '@ionic-native/geolocation/ngx'
import { Observable } from 'rxjs';
import { BluetoothSerial } from '@ionic-native/bluetooth-serial/ngx';

declare var window;
@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {
  connectionState = false
  conn = new Observable
  watch = this.geoLoc.watchPosition();
  latitude: any = 0;
  longitude: any = 0;
  time: Date
  locations: any;
  constructor(
    private arduinoService : ArduinoServiceService,
    private alertCtrl: AlertController,
    private geoLoc: Geolocation,
    public bluetoothCtrl: BluetoothSerial,
    public toastCtrl: ToastController,
  ) {
    this.locations = [];
  }

  ngOnInit() {
    this.startBackgroundGeoLoc()
    this.arduinoService.defineStatusBluetooth().then( () => {
      this.connect()
    }).catch( () => {
      this.arduinoService.enableBluetooth().then( () => {
        this.connect()
      }).catch( err => {
        this.alertCtrl.create({
          header: 'Error',
          message: 'Check bluetooth Permission',
          buttons: ['ok']
        }).then( alert => {
          alert.present()
        })
      })
    })
     
  }

  startBackgroundGeoLoc() {
    console.log(window.app)
    window.app.bg.start();
  }

  doRefresh(event) {
    this.checkConnection()
    setTimeout(() => {event.target.complete()}, 500)
  };

  checkConnection() {
    this.arduinoService.bluetoothCtrl.isConnected().then(status => {
      console.log(status)
      if (status == 'OK') {
      this.connectionState = true
      } else {
        this.connectionState = false
      }
    }).catch(error => {
      console.log(error)
      this.connectionState = false
    })
  }

  // parseCoord(value) {
  //   value = value.toString();
  //   let i = value.indexOf(".");
  //   let degree = value.substring(0, i)
  //   let primi = value.substring(i+1, i+3)
  //   i =+ 4
  //   let secondi = value.substring(i)
  //   let res = degree + "°" + primi + "'" + secondi.substring(0, 2) + "." + secondi.substring(2)
  //   return res
  // }

  // provaInvio(lat, lon) {
  //   this.arduinoService.sendPosition(lat, lon)
  // }

  // getLocations() {
  //   this.locations = (JSON.parse(localStorage.getItem("location")) == null ? [] : JSON.parse(localStorage.getItem("location")));
  // }
  
  connect() {
    this.bluetoothCtrl.list().then(arr => {
      console.log(arr)
      let names = arr.map( dev => dev.name)
      let index = names.indexOf("ArduinoWDG")
      if (index >= 0) {
        console.log(arr[index].id)
        this.conn = this.bluetoothCtrl.connect(arr[index].id)
        this.conn.subscribe(success => {
          this.checkConnection()
          const toast = this.toastCtrl.create({
            color: 'dark',
            duration: 2000,
            message: 'Connected'
          }).then(toastEl => {
            toastEl.present()
          })
        }, failure => {
          this.checkConnection()
          const toast = this.toastCtrl.create({
            color: 'danger',
            duration: 2000,
            message: 'Error' + failure
          }).then(toastEl => {
            toastEl.present()
          })
        })
      } else {
        this.checkConnection()
        const toast = this.toastCtrl.create({
          color: 'danger',
          duration: 2000,
          message: 'No devices available'
        }).then(toastEl => {
          toastEl.present()
        })
      }
    }).catch( err => {
      this.checkConnection()
      const toast = this.toastCtrl.create({
        color: 'danger',
        duration: 2000,
        message: 'Something Went Wrong?!'
      }).then(toastEl => {
        toastEl.present()
      })
    })
  }

}
