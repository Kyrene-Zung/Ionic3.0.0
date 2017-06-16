import { Component } from '@angular/core';
import { NavController,LoadingController,AlertController} from 'ionic-angular';

@Component({
  selector: 'page-contact',
  templateUrl: 'contact.html'
})
export class ContactPage {
	public user={
		username:'',
		password:''
	}

  constructor(public navCtrl: NavController,
  			  public loadingCtrl:LoadingController,
  			  public alertCtrl: AlertController) {
  		
  	
  }
	  //@Kyrene 20170418 add:显示输入的用户名
	  //1.add public user={...}
	  //2.
	  showFill(){
  		alert(this.user.username);
  	  }

  	  // @Kyrene 20170418 19：01模拟登录过程
  	 presentLoading(){
  		
  		// 1.import { LoadingController } from 'ionic-angular';	
  		// 2.public loadingCtrl:LoadingController
  		// 3.
  		this.loadingCtrl.create({
      		content: "Please wait...",
      		duration: 3000, //单位是毫秒
      		dismissOnPageChange: true
    	}).present();
  	  }


  	  // @Kyrene 20170418 19：54 alert
  	  // 1.import { AlertController } from 'ionic-angular';
  	  // 2.public alertCtrl: AlertController
  	  judgeLoading(){
  	  		if(this.user.username==""){
  	  		//提醒用户注意用户名字的正确性
  	  			let alertUserNameError=this.alertCtrl.create({
  	  				title:'Ionic Demo',
  	  				subTitle:"用户名不能为空！",
  	  				buttons:["OK"]
  	  			});
  	  			alertUserNameError.present();
  	  		}else{
  	  			this.loadingCtrl.create({
      				content: "Please wait...",
      				duration: 3000, //单位是毫秒
      				dismissOnPageChange: true
    			}).present();
  	  		}
  	  }

  	  //@Kyrene 20170418 19：54 toast 显示错误信息

}
