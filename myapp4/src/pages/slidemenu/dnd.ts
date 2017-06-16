import { Component } from '@angular/core';
import { ViewController } from 'ionic-angular';


@Component({
  selector: 'page-dnd',
  templateUrl: 'dnd.html'  
})
export class DndPage {
	
	constructor(public viewCtrl: ViewController) {}
 	dismiss(){
		this.viewCtrl.dismiss();
	}
//export end
}