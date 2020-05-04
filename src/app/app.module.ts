import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { BluetoothSerial } from '@ionic-native/bluetooth-serial/ngx'
import { ModalContactPageModule } from './modal-contact/modal-contact.module';
import { Geolocation } from '@ionic-native/geolocation/ngx'
import { NativeGeocoder } from '@ionic-native/native-geocoder/ngx'

import { BackgroundGeolocation } from '@ionic-native/background-geolocation/ngx'
import { Sim } from '@ionic-native/sim/ngx';
@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule, ModalContactPageModule],
  providers: [
    StatusBar,
    SplashScreen,
    BluetoothSerial,
    Geolocation,
    NativeGeocoder,
    BackgroundGeolocation,
    Sim,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
