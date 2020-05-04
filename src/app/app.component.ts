import { Component } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { BackgroundGeolocation, BackgroundGeolocationConfig, 
  BackgroundGeolocationResponse, BackgroundGeolocationEvents, BackgroundGeolocationAccuracy, } from '@ionic-native/background-geolocation/ngx'
import { ArduinoServiceService } from './arduino-service.service';

  declare var window;
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {
  arr:any = []
  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private bg: BackgroundGeolocation,
    private arduinoService: ArduinoServiceService
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.backgroundColorByHexString('#00979C');
      this.splashScreen.hide();
      const config:BackgroundGeolocationConfig = {
        desiredAccuracy: 0,
        distanceFilter: 5,
        debug: false,
        startOnBoot: true,
        stopOnTerminate: false,
        interval: 10000,
        notificationsEnabled: true,
        startForeground: true,
      };
      this.bg.configure(config).then( () => {
        this.bg.on( BackgroundGeolocationEvents.location).subscribe( location => {
          console.log(location)
          this.arduinoService.sendPosition(location.latitude, location.longitude)
        })
      })
      
      window.app = this;
    });
  }
}
