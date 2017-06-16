import { Component } from '@angular/core';
import { NavController,LoadingController,ToastController,
        ModalController,ViewController} from 'ionic-angular';

import { RegisterPage} from '../login/register';
import { TabsPage} from '../tabs/tabs';

declare var Bmob;
var Ctrl;
let view;
var Toast;

@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})

export class LoginPage {
  //定义
	public user={
		username:'',
		code:'',
	}

  backgrounds=[
    "assets/images/bg2.jpg",
    "assets/images/bg19.jpg",
    "assets/images/bg7.jpg",
  ]
  //public login:any;

  constructor(public navCtrl: NavController,
  			  public toastCtrl: ToastController,
          public modalCtrl: ModalController,
          public loadingCtrl:LoadingController,
          public viewCtrl: ViewController) {

      if(sessionStorage.getItem('user')){ //如果浏览器有登录信息（退出没有）
        this.navCtrl.setRoot(TabsPage);   //有登陆进入主页
      }
      Ctrl=this.navCtrl;
      view=this.viewCtrl;
      Toast=this.toastCtrl;
  }


  	 //判断登录
  	  judgeLoading(){
  	  		if(this.user.username==""||this.user.code==""){

      	  			//@Kyrene 20170418 19：54 toast 显示错误信息
      	  			//1.import { ToastController } from 'ionic-angular';
      	  			//2.public toastCtrl: ToastController
      	  			//3.
      	  			let toast = this.toastCtrl.create({
      			      message: '用户或密码不能为空！',
      			      duration: 1000
    			      });
                toast.present();
  	  		  }else{

                var UserList = Bmob.Object.extend("UserList");// 创建Bmob.Object子类
                var query = new Bmob.Query(UserList);
                // 查询所有数据
                query.find({
                    success: function(results) {
                      var username=document.getElementById('username');
                      var userInput=username.getElementsByTagName('input');
                      var code=document.getElementById('code');
                      var codeInput=code.getElementsByTagName('input');
                      var flag=true;

                      // 循环处理查询到的数据
                      for (var i = 0; i < results.length; i++) {
                        var object = results[i];
                        if(object.get('username')==userInput[0].value &&
                           object.get('password')==codeInput[0].value)
                          {
                             sessionStorage.setItem('user',userInput[0].value);
                              flag=true;

                              Ctrl.push(TabsPage);//跳转到主页

                              //view.dismiss().catch(() => console.log('view was not dismissed'));
                              break;
                          }
                        else{
                              flag=false;
                          }
                      }
                      //循环结束
                      if(!flag){
                          //alert("没有该用户！请注册。");
                          let toast = Toast.create({
                            message: '用户名或密码不正确！',
                            duration: 1000
                          });
                          toast.present();
                      }
                    },

                    error: function(error) {
                      //console.log(222);
                      //alert("查询失败: " + error.code + " " + error.message);
                      alert("没有该用户！请注册。")
                    }

                });
                //转圈
      	  			this.loadingCtrl.create({
          				content: "Please wait...",
          				duration: 1000, //单位是毫秒
          				dismissOnPageChange: true
        			   }).present();
  	  		  }
  	  }

  	//@Kyrene 20170418 23：15 打开注册窗口
    //1.import { ModalController, NavParams } from 'ionic-angular';
    //2.public modalCtrl: ModalController
    //3.import { ContactPage } from '../contact/contact';
    //4.新建register.html/.ts
    //5.app.moudle.ts加RegisterPage

    openRegisterPage(){
      //let contactModal = this.modalCtrl.create(RegisterPage);
      //contactModal.present();

      this.navCtrl.push(RegisterPage);   //另一种写法不用dismiss()
    }


    //固定slides高度
    // ionViewWillEnter(){

        //  var login_container=document.getElementById('login_container');
        //  login_container.style.marginLeft=-login_container.offsetWidth/2+"px";
        //  login_container.style.marginTop=-login_container.offsetHeight/2+"px";
        //  console.log(login_container);
        //  console.log(login_container.style.marginLeft);
        //  console.log(login_container.style.marginTop);
        //  console.log('将纳入登录');
         //获取屏幕高度
    //      var screenHeight=window.screen.height;
    //      var slidesHeight=document.getElementById('slidesHeight');
    //      slidesHeight.style.height=screenHeight+"px";
    // }

 }
