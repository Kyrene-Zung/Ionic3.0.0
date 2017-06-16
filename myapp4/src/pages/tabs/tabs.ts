import { Component,ViewChild } from '@angular/core';

import { FriendPage } from '../friend/friend';
import { ContactPage } from '../contact/contact';
import { HomePage } from '../home/home';

import {Tabs} from 'ionic-angular';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = HomePage;
  tab2Root = FriendPage;
  tab3Root = ContactPage;

  @ViewChild('mainTab') tabRef:Tabs; 
  // this tells the tabs component which Pages 
  // should be each tab's root Page


  constructor() {
  		
  }
  	//@Kyrene 20170418 10:59 add
	 //当进入页面完成后触发
	 //ionViewDidEnter(){
    		//动态选定某个一个tab
        //1.导入import {IonicApp} from 'ionic-angular';import { Component,ViewChild } from '@angular/core';
        //2.附上： @ViewChild('mainTab') tabRef:Tabs; 
        //3.
		//let mainTab = this.tabRef; 
		//console.log(this);
		//mainTab.select(2);
	//}

}
