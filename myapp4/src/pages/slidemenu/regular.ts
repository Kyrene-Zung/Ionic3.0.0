
import { Component } from '@angular/core';
import { ViewController } from 'ionic-angular';


@Component({
  selector: 'page-regular',
  templateUrl: 'regular.html'  
})
export class RegularPage {
	
	constructor(public viewCtrl: ViewController) {}
 	dismiss(){
		this.viewCtrl.dismiss();
	}
//export end
}