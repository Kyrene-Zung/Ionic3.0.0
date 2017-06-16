import { Component} from '@angular/core';
import { NavController,AlertController } from 'ionic-angular';

import { ChatPage} from '../friend/chat';
import { LoginPage} from '../login/login';

declare var Bmob;


@Component({
  selector: 'page-friend',
  templateUrl: 'friend.html'
})
export class FriendPage {
	public friend=[];

	//@Kyrene 构造数据源
	// 1.一般数据源都是从 api 进行获取，这里我们只是模拟一些已经取到了数据
  // public contacts = [
  //   { 'contactid': 1, 'contactname': '梦小白', 'contacttext': '18888888888' },
  //   { 'contactid': 2, 'contactname': '梦小白2', 'contacttext': '18888888888' },
  //   { 'contactid': 3, 'contactname': '梦小白3', 'contacttext': '18888888888' },
  //   { 'contactid': 4, 'contactname': '梦小白4', 'contacttext': '18888888888' },
  //   { 'contactid': 5, 'contactname': '梦小白5', 'contacttext': '18888888888' },
  //   { 'contactid': 6, 'contactname': '梦小白6', 'contacttext': '18888888888' }
  // ];
  // contact = this.contacts[0];

// 2.这里要使用 this.fruitsList[0],必须使用this.fruitsList来指代上面我们已经定义好的属性,如果使用fruitsList的话,Angular就不知道它表示是什么.
//3.在对应的.html加上:*ngFor="let contact of contacts"循环
//4.可以加上点击事件

  constructor(public navCtrl: NavController,public alertCtrl: AlertController) {

    if(!sessionStorage.getItem('user')){
        this.navCtrl.setRoot(LoginPage);
      }
  }

//初始化
ionViewWillEnter(){
  this.importFriend(this);
}

doRefresh(event){//刷新
  setTimeout(() => {
      this.importFriend(this);
      // console.log('Async operation has ended');
       event.complete();
     }, 1000);
}


  //导入关注人列表
  importFriend(that){
    //查找用户关注表
    var arr=[];
      var user=sessionStorage.getItem('user');
      var UserConcern = Bmob.Object.extend("UserConcern");
      var query = new Bmob.Query(UserConcern);
      query.equalTo("userConcern", user);
      query.find({
          success: function(results) {
                //var t=results.length;
                  for (var i = 0; i < results.length; i++) {
                    var object = results[i];
                    //console.log(object);
                    var concernUser = object.get("concernUser");
                    arr[i]=concernUser;
                      //console.log(obj);
                    //  that.friend = arr;
                  //console.log(that.friend);
                }//for1 end
                //console.log(arr);
                //查找用户表
                  var UserList = Bmob.Object.extend("UserList");
                  var query = new Bmob.Query(UserList);
                  var obj={};
                // query.equalTo("username", concernUser);
                query.find({
                    success: function(results) {
                            for(var i=0;i<results.length;i++){
                                var object = results[i];
                                for(var j=0;j<arr.length;j++){
                                  if(arr[j]==object.get("username")){
                                    var username=object.get("username");
                                    var signature = object.get("signature");
                                    var headImg = object.get("headImg");
                                    obj={'username':username,'signature':signature,"headImg":headImg};
                                    that.friend[j]=obj;
                                    // if(that.friend.length==t){
                                    //   return;
                                    // }else{
                                    //   console.log(that.friend);
                                    //   that.friend[that.friend.length]=obj;
                                    // }
                                  }
                                }//for2 end
                              }  //for1 end
                      //console.log(obj);
                      },
                      error: function(error) {
                          alert("查询失败: " + error.code + " " + error.message);
                      }
                  });//  query.find end
          },
          error: function(error) {
              alert("查询失败: " + error.code + " " + error.message);
          }
      });

  }

  //点listItem事件
  itemClick(event,friends){
  	 //alert(contact.contactname);
     //@Kyrene 20140420 add 点击列表的时候，加载对应的详细列表页面/聊天窗口
     //1.import { NavController } from 'ionic-angular';
     //2.
     this.navCtrl.push(ChatPage,{item:friends});//把页面push出来,页面：Chat,传入一个friends

  }

//取消关注
      cancleConcern(event,concernName){
              event.stopPropagation();
              let alert = this.alertCtrl.create({
                      title: '取消关注',
                      message: '确定取消关注吗?',
                      buttons: [
                        {
                          text: '取消',
                          role: 'cancel',
                          handler: () => {
                            return ;
                          }
                        },
                        {
                          text: '确定',
                          handler: () => {

                            //查找用户关注表
                              var user=sessionStorage.getItem('user');
                              var UserConcern = Bmob.Object.extend("UserConcern");
                              //var userconcern = new UserConcern();

                              var query = new Bmob.Query(UserConcern);
                              query.equalTo("userConcern", user);
                              query.find({
                                  success: (results)=> {
                                    //删除页面的
                                    for(var i=0;i<this.friend.length;i++){
                                      if(this.friend[i].username==concernName){
                                        this.friend.splice(i,1);
                                      }
                                    }
                                    //删除后台的
                                    for (var i = 0; i < results.length; i++){
                                      var object = results[i];
                                      if(object.get('concernUser')==concernName){
                                        //找到用户关注的这个人
                                        //在关注表移除
                                        object.destroy({
                                               success: function(object) {
                                                 // 删除成功

                                              },
                                               error: function(object, error) {
                                                   // 删除失败
                                                  // alert(error);
                                               }
                                          });
                                        break;
                                      }else{
                                         continue;
                                      }
                                    }//for end
                                  },
                                  error:function(error) {
                                      //alert("查询失败: " + error.code + " " + error.message);
                                  }
                              });//find end
                          }//handler end
                        }
                      ]//button end
                    });//create end
                    alert.present();
      }//cancleConcern() end
//export end
}
