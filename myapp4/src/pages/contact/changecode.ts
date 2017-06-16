import { Component } from '@angular/core';
import { ViewController,NavController,ToastController} from 'ionic-angular';

import { LoginPage} from '../login/login';

declare var Bmob;
@Component({
  selector: 'page-changecode',
  templateUrl: 'changecode.html'
})
export class ChangecodePage {
public err={
  codeErr:''
}
	constructor(public viewCtrl: ViewController,public navCtrl: NavController, public toastCtrl: ToastController) {}

	//返回
	dismiss(){
		this.viewCtrl.dismiss();
	}

  //完成修改密码
  finish(){
    var Code=document.getElementById('Code');
    var sureCode=document.getElementById('sureCode');

    var CodeInput=Code.getElementsByTagName('input');
    var sureCodeInput=sureCode.getElementsByTagName('input');

    if(CodeInput[0].value && CodeInput[0].value==sureCodeInput[0].value && /^[0-9a-zA-Z_#]{6,16}$/.test(CodeInput[0].value) )
    {
      //this.err.codeErr="error";
      var user=sessionStorage.getItem('user');//获取当前用户名
      //查找用户表
      var UserList = Bmob.Object.extend("UserList");
      var query = new Bmob.Query(UserList);
      query.equalTo("username", user);
      query.find({
          success: (results)=> {
              console.log(CodeInput[0].value);
              results[0].set('password', CodeInput[0].value);
              results[0].save();
              sessionStorage.setItem('user','');
              this.navCtrl.setRoot(LoginPage);
              let toast =this.toastCtrl.create({
                message: '修改成功，重新登录！',
                duration: 1000
              });
              toast.present();
            },
            error: function(object, error) {
              var timer=null;
              clearTimeout(timer);
              this.err.codeErr="修改失败，请重新修改";
              timer=setTimeout(()=>{
                this.err.codeErr="";
              },1000);
            }
      });


    }else{
      var timer=null;
      clearTimeout(timer);
      this.err.codeErr="密码或确认密码的格式不正确！"
      timer=setTimeout(()=>{
        this.err.codeErr="";
      },1000);
    }

  }

//export end
}
