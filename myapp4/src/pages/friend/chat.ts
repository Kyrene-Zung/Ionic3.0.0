import { Component} from '@angular/core';
import { NavController,NavParams,ToastController} from 'ionic-angular';

import { CommandPage} from '../friend/command';

declare var Bmob;
@Component({
  selector: 'page-chat',
  templateUrl: 'chat.html'
})
export class ChatPage{
	//因为主页面传入了一个，初始化
	item;
	//接受item import NavParams
  public concernUser=[];

	//构造函数
	 constructor(public params: NavParams,public navCtrl: NavController,public toastCtrl:ToastController) {
    	this.item = params.data.item;
    //console.log(this.item);
  	}
    //进入页面前
    ionViewWillEnter(){
      this.showExpress(this);
    }

    // //显示当前用户关注的人的发表
    // ngOnInit(){
    //   this.showExpress(this);
    // }
    doRefresh(event){//刷新
      setTimeout(() => {
          this.showExpress(this);
          // console.log('Async operation has ended');
           event.complete();
         }, 1000);
    }

    //查询当前用户关注的人的发表
    showExpress(that){
      var user=that.item.username;//获取关注的用户名
      //console.log(user);
      var UserExpress = Bmob.Object.extend("UserExpress");
      var query = new Bmob.Query(UserExpress);
      query.equalTo("username", user);
      query.find({
          success: function(results) {
            var j=results.length;
              for (var i = j-1; i>=0; i--) {
                var obj={};
                var object = results[i];
                var id=object.id;
                var time=object.createdAt;
                var month=time.substr(5,2);
                var date=time.substr(8,2);
                var expressImg=object.get('expressImg');
                var expressText=object.get('expressText');
                var username=object.get('username');
                var commandTimes=object.get('commandTimes');
                var praiseTimes=object.get('praiseTimes');
                obj={'id':id,'month':month,'date':date,'expressImg':expressImg,'expressText':expressText,"username":username,"commandTimes":commandTimes,"praiseTimes":praiseTimes,"color":false};
                that.concernUser[j-1-i]=obj;
                //console.log(that.concernUser);
            }
            //在查找关注人动态success里 查找用户点赞表
            var usercurrent=sessionStorage.getItem('user');//获取当前用户
            var UserPraise = Bmob.Object.extend("UserPraise");
            var query2 = new Bmob.Query(UserPraise);
            query2.equalTo("username",usercurrent);
            //查询有没有点赞
            query2.find({
                success: (results)=> {
                  //alert(results.length);
                  //console.log(j);
                  for (var i = 0; i < results.length; i++) {
                        var object = results[i];
                        // if (object.get('username') == user && object.get('dynamicId') == dynamicId) {
                        //   color='red';
                        //   that.system[j].color=color;
                        //   break;
                        // }else{
                        //   color='red';
                        //   that.system[j].color=color;
                        //   break;
                        // }
                      for(var j=0;j<that.concernUser.length;j++){
                        //console.log(object.get('dynamicId'));
                        //console.log(that.system[j].id);
                        //console.log(object.get('dynamicId'));
                        //console.log(that.concernUser[j].id);
                        if(object.get('dynamicId')==that.concernUser[j].id){
                          that.concernUser[j].color=true;
                        }
                      }
                  }
                },
                error: function(error) {
                  alert("查询失败: " + error.code + " " + error.message);
                }
            });//查询有没有点赞 end
          },
          error: function(error) {
              alert("查询失败: " + error.code + " " + error.message);
          }
      });
    }
//评论
command(event,clickExpress){//当前动态数组：clickExpress
  //当前用户评论关注的动态
  //点击一条动态，获取动态的id,输入评论内容
  //存储：动态的id 评论者 评论内容
  //点击评论总数，显示该动态的所有评论
  //alert(clickExpress.id);                            ////因为主页面传入了一个，初始化item;
  this.navCtrl.push(CommandPage,{item:clickExpress});//在constructor加上：this.item = params.data.item;
}
//点赞
praise(event,id){//传入发表动态的id
  //当前用户点赞该动态
  //获取该动态的点赞条数
  //保存到用户发表的点赞次数中

  var ele=event.currentTarget;

  //console.log(ele.childNodes[0].childNodes);
  //alert(id);
  var flag=false;
  var user=sessionStorage.getItem('user');//获取当前用户
  var UserPraise = Bmob.Object.extend("UserPraise");
  var userpraise = new UserPraise();
  var query = new Bmob.Query(UserPraise);
  query.equalTo('username',user);
  //查询有没有点赞
      query.find({
          success: (results)=> {
            //console.log(results.length);
            for (var i = 0; i < results.length; i++) {
                  var object = results[i];
                  if (object.get('dynamicId') == id) {
                    flag = true;
                    //取消点赞
                      object.destroy({
                             success: (object)=> {
                               // 删除成功
                               //alert('已取消点赞')
                               let toast = this.toastCtrl.create({
                                 message: '已取消点赞',
                                 duration: 1000
                               });
                               toast.present();
                               //查找UserPraise 获取该条动态的点赞次数
                               var dynamicId=id;//获取改动态的ID
                               var query = new Bmob.Query(UserPraise);
                               query.equalTo("dynamicId", dynamicId);
                               query.find({
                                     success: function(results) {
                                       var praiseTimes=results.length;
                                     //  console.log(results.length);
                                       //查找UserExpress，找到该条动态 修改点赞次数
                                       var UserExpress = Bmob.Object.extend("UserExpress");
                                       var query = new Bmob.Query(UserExpress);
                                       //  var userexpress = new UserExpress();
                                       query.get(dynamicId, {
                                           success: function(userexpress) {
                                           //  alert(praiseTimes);
                                             userexpress.set('praiseTimes', praiseTimes);
                                             userexpress.save();
                                           },
                                           error: function(object, error) {

                                           }
                                       });//查UserExpress表 end
                                       //alert(expressId);
                                     },
                                     error: function(error) {
                                       alert("查询失败: " + error.code + " " + error.message);
                                     }
                               });//查找用户点赞 end
                            },
                             error: (object, error)=> {
                                 // 删除失败
                                // alert(error);
                              //  alert('取消点赞失败')
                                let toast = this.toastCtrl.create({
                                  message: '取消点赞失败',
                                  duration: 1000
                                });
                                toast.present();
                             }
                        });
                      ele.childNodes[0].childNodes[1].style.color="#777171";
                      break;
                  } else {
                    flag = false;
                  }
                }//for end

              if(!flag){//添加到点赞列表中
                  userpraise.set("username", user);
                  userpraise.set("dynamicId", id);
                  ele.childNodes[0].childNodes[1].style.color="red";
                  //添加数据，第一个入口参数是null
                  userpraise.save(null, {
                    success: (usercollection)=>{
                      // 添加成功，返回成功之后的objectId（注意：返回的属性名字是id，不是objectId），你还可以在Bmob的Web管理后台看到对应的数据
                      let toast = this.toastCtrl.create({
                        message: '点赞成功',
                        duration: 1000
                      });
                      toast.present();
                      ele.childNodes[0].childNodes[1].style.color="red";
                      //查找UserPraise 获取该条动态的点赞次数
                      var dynamicId=id;//获取改动态的ID
                      var query = new Bmob.Query(UserPraise);
                      query.equalTo("dynamicId", dynamicId);
                      query.find({
                            success: function(results) {
                              var praiseTimes=results.length;
                            //  console.log(results.length);
                              //查找UserExpress，找到该条动态 修改点赞次数
                              var UserExpress = Bmob.Object.extend("UserExpress");
                              var query = new Bmob.Query(UserExpress);
                              //  var userexpress = new UserExpress();
                              query.get(dynamicId, {
                                  success: function(userexpress) {
                                  //  alert(praiseTimes);
                                    userexpress.set('praiseTimes', praiseTimes);
                                    userexpress.save();
                                  },
                                  error: function(object, error) {
                                  }
                              });//查UserExpress表 end
                              //alert(expressId);
                            },
                            error: function(error) {
                              alert("查询失败: " + error.code + " " + error.message);
                            }
                      });//查找用户点赞 end
                    },
                    error: function(usercollection, error) {
                      // 添加失败
                      alert('添加数据失败，返回错误信息：' + error.description);
                    }
                  });
              }//if !flag end

          },
          error: function(error) {
            alert("查询失败: " + error.code + " " + error.message);
          }
        });


}

//export end

}
