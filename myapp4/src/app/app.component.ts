import { Component,OnInit } from '@angular/core';
import { Platform , ModalController,MenuController} from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';


import { GuidePage } from '../pages/guide/guide';
import { KnowaboutPage } from '../pages/slidemenu/knowabout';
import { MycollectionPage } from '../pages/slidemenu/mycollection';
// import { PresonalPage } from '../pages/slidemenu/presonal';
import { SettingPage } from '../pages/slidemenu/setting';
import { Usermessage} from '../pages/home/usermessage';

declare var Bmob;

@Component({
  templateUrl: 'app.html',
  //selector: 'page-app',
})
export class MyApp implements OnInit{
  rootPage:any = GuidePage;
  public user:Usermessage=new Usermessage();

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen,
  public modalCtrl: ModalController,public menuCtrl: MenuController) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
    });
  }

  ngOnInit(){
    this.importUser(this);
  }

  //了解app
  knowAbout(){
    let modal = this.modalCtrl.create(KnowaboutPage);
    modal.present();
  }
  //我的收藏
  myCollection(){
    let modal = this.modalCtrl.create(MycollectionPage);
    modal.present();
  }
  //个性化
  presonal(){
    var personalbg=document.getElementById('personalbg');
    //console.log(personalbg)
  //  console.log(personalbg.getAttribute('style'));
    if(personalbg.getAttribute('style')=='background: url(../assets/images/bg13.jpg);background-size: cover;')
    {
        personalbg.removeAttribute('style');
        personalbg.setAttribute('style','background: url(../assets/images/bg17.jpg);background-size: cover;');
    }
    else{
         personalbg.removeAttribute('style');
         personalbg.setAttribute('style','background: url(../assets/images/bg13.jpg);background-size: cover;');
    }
  }
  //设置
  setting(){
    let modal = this.modalCtrl.create(SettingPage);
    modal.present();
  }

  //初始化
importUser(that){
  //查找用户表
    var user = sessionStorage.getItem('user');
    var UserList = Bmob.Object.extend("UserList");
    var query = new Bmob.Query(UserList);
    query.equalTo("username", user);

    query.find({
        success: function(results) {
            for (var i = 0; i < results.length; i++) {
              var object = results[i];
              var signature = object.get("signature");
              var headImg = object.get("headImg");
              var username = object.get("username");
              that.user.headImg=headImg;
              that.user.signature=signature;
              that.user.username=username;
            }
        },
        error: function(error) {
            alert("查询失败: " + error.code + " " + error.message);
        }
    });

  }
  //进入页面前  不可以？？？？
  ionViewWillEnter(){
    //this.importUser(this);
    alert(111);
  }
  //export end
}
