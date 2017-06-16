import { Component } from '@angular/core';
import { ViewController,ToastController,NavController} from 'ionic-angular';

import { ContactPage} from '../contact/contact';

declare var Bmob;
var Toast;
var Nav;

@Component({
  selector: 'page-expressbook',
  templateUrl: 'expressbook.html'
})
export class ExpressbookPage {

	constructor(public viewCtrl: ViewController,public toastCtrl: ToastController,public navCtrl: NavController) {
    Toast=this.toastCtrl;
    Nav=this.navCtrl;
  }

	//返回
	dismiss(){
		this.viewCtrl.dismiss();
	}

  express(){
    var textarea=document.getElementById('expressText');
    var expressText=textarea.querySelector('textarea').value;

    //添加数据

    var user=sessionStorage.getItem('user');//获取当前用户名
    console.log(user);

    var UserExpress = Bmob.Object.extend("UserExpress");
    var userexpress = new UserExpress();
    userexpress.set("username", user);
    userexpress.set("expressText", expressText);
    userexpress.set("expressImg", 'card1.jpg');

    userexpress.save(null, {
      success: function(object) {
        let toast = Toast.create({
          message: '已保存到我的发表中',
          duration: 1000
        });
        toast.present();
        Nav.push(ContactPage);
      },
      error: function(model, error) {
        alert("create object fail");
      }
    });


  }
}
