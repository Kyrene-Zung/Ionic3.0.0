import { Component } from '@angular/core';
import { ViewController } from 'ionic-angular';


@Component({
  selector: 'page-privacy',
  templateUrl: 'privacy.html'  
})
export class PrivacyPage {
	
	constructor(public viewCtrl: ViewController) {}
 	dismiss(){
		this.viewCtrl.dismiss();
	}
//export end
}