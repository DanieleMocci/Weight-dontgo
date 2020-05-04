import { Component } from '@angular/core';
import { ModalController, NavParams, IonRouterOutlet } from '@ionic/angular';
import { ModalContactPage } from '../modal-contact/modal-contact.page';
import { ArduinoServiceService } from '../arduino-service.service';
import { Contact } from '../contact';
import { BluetoothSerial } from '@ionic-native/bluetooth-serial/ngx';



@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {

  syncTimeStamp: Date
  contactArr: Contact[]
  default: string = "../assets/icon/favicon.png"
  constructor(
    public modalCtrl: ModalController,
    private routerOutlet: IonRouterOutlet,
    private arduinoService: ArduinoServiceService,
    public bluetoothCtrl: BluetoothSerial
  ) {}

  ngOnInit() {
    this.syncData()
    let syncMoment = new Date()
    this.setSyncDate(syncMoment)
  }

    openModalContatto(contactArr) {
      let id = 0;
      let main = false
      if (contactArr) {
      id = this.getId(contactArr)
      main = this.checkMain(contactArr)
      } else {
        main = true
      }
     if (id == -1) {
       window.alert("Memory out of space")
       return
     } 
    this.modalCtrl.create({
      component: ModalContactPage, 
      animated: true,
      showBackdrop: true,
      componentProps: {
        'id': id,
        'isMainFree': main
      }
    }).then(modalElem => {
      modalElem.present();
    })
  }

  openModalContattoForModify(contact) {
    console.log(contact)
    this.modalCtrl.create({
      component: ModalContactPage,
      animated: true,
      showBackdrop: true,
      componentProps: {
        'contactData': contact,
        'id': contact.id
      }
    }).then(modalElem  => {
      modalElem.present();
    })
  }

  syncData() {
      this.bluetoothCtrl.write("gc:\n").then( res => {
        this.arduinoService.data.subscribe(data => {
        this.setContactArray([]);
        let cleanArr: Contact[] = [];
        console.log('Working on RawData')
        let rawArr: Array<string> = data.split(";");
        rawArr.pop();
        rawArr.forEach( (rawContact) => {
          console.log('working on dataString: ', rawContact)
          let contact: Contact = new Contact,
              rawId: string = rawContact.split(":")[0],
              rawName_Numb = rawContact.split(":")[1],
              name = rawName_Numb.split("_")[0].trim(),
              numb = rawName_Numb.split("_")[1].trim();
              console.log('id: ', rawId)
              console.log('name: ', name)
              console.log('numb: ', numb)
              console.log('check if data exist')
              if (name) {
                if (numb.includes('+39')) {
                  numb = numb.slice(3)
                  contact.main = true
                }
                contact.name = name;
                contact.id = parseInt(rawId);
                contact.number = numb
                console.log(JSON.stringify(contact))
              }
              console.log("porto i dati nell'array")
              cleanArr.push(contact)
        })
        this.setContactArray(cleanArr)

        })
      })
    
    
    
    this.setSyncDate(new Date)
  }


  setSyncDate(syncMoment: Date) {
    this.syncTimeStamp = syncMoment
  }

  getSyncDate() {
    if (this.syncTimeStamp) {
    return "Last Sync " + this.syncTimeStamp.toDateString() + " - " + this.syncTimeStamp.toLocaleTimeString()
    } else {
      return 'No sync timeStamp'
    }
  };

  setContactArray(array: Contact[]) {
    this.contactArr = array
  }

  delete(contact: Contact) {
    this.arduinoService.deleteContact(contact.id).then( () => {
      this.syncData()
    }).catch(err => {
      window.alert(err)
    })
  }

  getId(arr: Contact[]) {
    var rawIds:number[] = []
    arr.forEach(el => {
        rawIds.push(el.id)
    });
    if (rawIds.includes(0)) {
        if (rawIds.includes(1)) {
            if (rawIds.includes(2)) {
                return -1
            } else {
                return 2
            }
        } else {
            return 1
        }
    } else {
        return 0
    }
}

checkMain(arr: Contact[]) {
  var rawMain:boolean[] = [];
  arr.forEach(el => {
    rawMain.push(el.main)
  });
  if (rawMain.includes(true)) {
    return false
  } else {
    return true
  }
}

}

