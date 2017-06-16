import { Component } from '@angular/core';
import { NavController,Slides } from 'ionic-angular';
import { ViewChild } from '@angular/core';

import { LoginPage} from '../login/login';
import { TabsPage} from '../tabs/tabs';

@Component({
	selector: 'page-guide',
  	templateUrl: 'guide.html'
})
export class GuidePage {

  @ViewChild(Slides) slides: Slides;

  constructor(public navCtrl: NavController) {


  }

   startShare() {

        if(!sessionStorage.getItem('user')){
          this.navCtrl.push(LoginPage);//进入登录页
        }else{
         this.navCtrl.push(TabsPage);//进入主页
        }
   }


}
