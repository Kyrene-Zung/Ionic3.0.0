import { Component } from '@angular/core';
import { ViewController } from 'ionic-angular';


@Component({
  selector: 'page-knowabout',
  templateUrl: 'knowabout.html'  
})
export class KnowaboutPage {
	
	constructor(public viewCtrl: ViewController) {}

	dismiss(){
		this.viewCtrl.dismiss();
	}
//export end
}