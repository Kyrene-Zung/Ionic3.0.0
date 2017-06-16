import { Component } from '@angular/core';
import { NavController,LoadingController,AlertController,ToastController,
        ModalController} from 'ionic-angular';

import { PersonPage} from '../contact/person';
import { ChangecodePage} from '../contact/changecode';
import { ExpressbookPage} from '../contact/expressbook';
import { MyexpressPage} from '../contact/myexpress';
import { BookstorePage} from '../contact/bookstore';
import { ConcernPage} from '../contact/concern';


import { LoginPage} from '../login/login';
import { FriendPage } from '../friend/friend';

declare var Bmob;
var ctrl;
var Toast;
@Component({
  selector: 'page-contact',
  templateUrl: 'contact.html',
  //providers : [ImagePicker]
})
export class ContactPage {

	public items  = [
    {'icon':'people','name':'个人信息','color':'primary'},
    {'icon':'barcode','name':'修改密码','color':'danger'},
    {'icon':'book','name':'发表图书','color':'secondary'},
    {'icon':'cafe','name':'我的发表','color':'gold'},
    {'icon':'checkbox','name':'我的关注','color':'#FF8C00'},
    {'icon':'checkbox','name':'关注朋友','color':'#FF8C00'}
  ];
item=this.items[0];

  constructor(public navCtrl: NavController,
  			  public loadingCtrl:LoadingController,
  			  public alertCtrl: AlertController,
  			  public toastCtrl: ToastController,
          public modalCtrl: ModalController) {

      if(!sessionStorage.getItem('user')){
        this.navCtrl.setRoot(LoginPage);

      }
        ctrl=this.navCtrl;
        Toast=this.toastCtrl;
  }

  //点击列表
  itemSelected(item){
      //console.log(item.name);
      if(item.name=="个人信息"){
        this.navCtrl.push(PersonPage);
      }else if(item.name=="修改密码"){
          let prompt = this.alertCtrl.create({
                  title: '修改密码',
                  message: "为保障你的数据安全，修改密码前请填写原密码。",
                  inputs: [{
                            name: 'oldcode',
                            type:'password',
                            placeholder: ''
                          },],
                  buttons: [{
                            text: '取消',
                            handler: data => {console.log('Cancel clicked');}
                            },
                            {
                              text: '确定',
                              handler: data => {
                                var user=sessionStorage.getItem('user');//获取当前用户名
                                //查找用户表
                                var UserList = Bmob.Object.extend("UserList");
                                var query = new Bmob.Query(UserList);
                                query.equalTo("username", user);
                                query.find({
                                    success: function(results) {
                                        var object = results[0];
                                        console.log(data.oldcode);
                                        if(data.oldcode==object.get('password')){
                                          ctrl.push(ChangecodePage);
                                        }else{
                                          let toast =Toast.create({
                                            message: '密码有误，请重填!',
                                            duration: 1000
                                          });
                                          toast.present();
                                        }
                                    },
                                    error: function(error) {
                                        alert("查询失败: " + error.code + " " + error.message);
                                    }
                                });
                              }
                            }
                           ]
          });
          prompt.present();
      }else if(item.name=="发表图书"){
          this.navCtrl.push(ExpressbookPage);
      }else if(item.name=="我的发表"){
          this.navCtrl.push(MyexpressPage);
      }
      else if(item.name=="我的关注"){
          this.navCtrl.push(FriendPage);
      }else if(item.name=="关注朋友"){
          this.navCtrl.push(ConcernPage);
      }
  }

  //附近书店
  bookstore(){
    this.navCtrl.push(BookstorePage);
  }
//export end
}
