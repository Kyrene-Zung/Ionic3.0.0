import { ViewController } from 'ionic-angular';
import { Component } from '@angular/core';

@Component({
  selector: 'page-presonal',
  templateUrl: 'presonal.html'  
})
export class PresonalPage {
	
	constructor(public viewCtrl: ViewController) {}

	dismiss(){
		this.viewCtrl.dismiss();
	}
//export end
}