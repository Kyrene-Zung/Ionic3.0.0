import { Component } from '@angular/core';
import { ViewController,ToastController ,AlertController} from 'ionic-angular';

declare var Bmob;
var alert;
var toast;

@Component({
  selector: 'page-register',
  templateUrl: 'register.html'
})
export class RegisterPage {

	constructor(public viewCtrl: ViewController,
				public toastCtrl: ToastController,
				public alertCtrl: AlertController) {
		toast=this.toastCtrl;
		alert=this.alertCtrl;
	}

	//@Kyrene 20170419 add  dismiss()
	//1.import { ViewController }
	//2.constructor(public viewCtrl: ViewController)
	//dismiss(){
	//	this.viewCtrl.dismiss();
	//}

	//点击注册
	register(){
		     var user=document.getElementById('user');
         var userInput=user.getElementsByTagName('input');
         var password=document.getElementById('password');
         var passwordInput=password.getElementsByTagName('input');
         var sure=document.getElementById('passwordSure');
         var sureInput=sure.getElementsByTagName('input');
         //console.log(sureInput[0].value)
         var flag=true;
         var UserList = Bmob.Object.extend("UserList");
	       var userlist = new UserList();
         var query=new Bmob.Query(UserList);
	   if(userInput[0].value && passwordInput[0].value && sureInput[0].value){

	     		if(passwordInput[0].value!=sureInput[0].value){
	     			let Toast = this.toastCtrl.create({
      			      message: '确认密码不正确',
      			      duration: 1000
    			      });
                	Toast.present();
	     		}else{
            //查找用户表
            query.find({
              success: (results)=> {
                  for(var i=0;i<results.length;i++){
                        var object=results[i];
                        if(object.get('username')==userInput[0].value){
                            let Toast = this.toastCtrl.create({
                      			      message: '该用户名已存在！',
                      			      duration: 1000
                    			      });
                            Toast.present();
                            flag=false;
                            break;
                        }
                  }//for end

                  if(flag){
                        userlist.set("username", userInput[0].value);
            				    userlist.set("password", passwordInput[0].value);
            				    userlist.save(null, {
            					    success: function(object) {
                					    let Alert = alert.create({
                						      title: '注册成功！',
                						      subTitle: '欢迎使用本App!',
                						      buttons: ['OK']
                						   });
                						    Alert.present();
            					    },
            					    error: function(model, error) {
            					        let Alert = alert.create({
                						      title: '注册失败！',
                						      buttons: ['OK']
                						   });
                						    Alert.present();
            					    }
            				    });
                  }//if flag end
                },
                error: function(error) {
                  //console.log(222);
                  //alert("查询失败: " + error.code + " " + error.message);
                  alert("没有该用户！请注册。")
                }
            });//query end
          }//else end
	     }else{
	     	let toast = this.toastCtrl.create({
      			      message: '注册信息不能为空！',
      			      duration: 1000
    			      });
                toast.present();
	     }

	}//register end

//export end
}
