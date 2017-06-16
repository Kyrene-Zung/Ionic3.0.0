import { ViewController,NavController } from 'ionic-angular';
import { Component } from '@angular/core';

import { NewsremindPage } from '../slidemenu/newsremind';
import { DndPage } from '../slidemenu/dnd';
import { PrivacyPage } from '../slidemenu/privacy';
import { RegularPage } from '../slidemenu/regular';
import { AboutPage } from '../slidemenu/about';
import { LoginPage } from '../login/login';


@Component({
  selector: 'page-setting',
  templateUrl: 'setting.html'
})
export class SettingPage {

	constructor(public viewCtrl: ViewController,public navCtrl: NavController) {}

	dismiss(){
		this.viewCtrl.dismiss();
	}
//新消息提醒
	newsremind(){
		this.navCtrl.push(NewsremindPage);
	}
//勿扰模式
	dnd(){
		this.navCtrl.push(DndPage);
	}
//隐私
	privacy(){
		this.navCtrl.push(PrivacyPage);
	}
//通用
	regular(){
		this.navCtrl.push(RegularPage);
	}
//关于
	about(){
		this.navCtrl.push(AboutPage);
	}
//退出
	quit(){
		sessionStorage.setItem('user','');
		this.navCtrl.push(LoginPage);
	}
//export end
}
