import { Component } from '@angular/core';
import { ViewController } from 'ionic-angular';


@Component({
  selector: 'page-newsremind',
  templateUrl: 'newsremind.html'  
})
export class NewsremindPage {
	
	constructor(public viewCtrl: ViewController) {}

	dismiss(){
		this.viewCtrl.dismiss();
	}
//export end
}