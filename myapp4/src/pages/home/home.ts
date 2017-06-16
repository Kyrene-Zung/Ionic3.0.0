import { Component} from '@angular/core';
import { NavController,ToastController} from 'ionic-angular';
// import { LoginPage} from '../login/login';
import { Usermessage} from '../home/usermessage';
//import { Systemdynamic} from '../home/systemdynamic';


declare var Bmob;

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  public user:Usermessage=new Usermessage();
  public system=[];

  constructor(public navCtrl: NavController,public toastCtrl:ToastController) {

  }
    // ngOnInit(){
    //   console.log(sessionStorage.getItem('user'));
    //   this.importUser(this);
    // }

    //进入页面前
    ionViewWillEnter(){
      this.importUser(this);
    }
    doRefresh(event){//刷新
      setTimeout(() => {
          this.importUser(this);
          // console.log('Async operation has ended');
           event.complete();
         }, 1000);
    }
  //@Kyrence 20170430 16:51 add
  //当将要进入页面时触发
  importUser(that){
  //查找用户表 显示用户信息
    var user=sessionStorage.getItem('user');//获取当前用户
    var UserList = Bmob.Object.extend("UserList");
    var query = new Bmob.Query(UserList);
    query.equalTo("username", user);

    query.find({
        success: function(results) {
            for (var i = 0; i < results.length; i++) {
              var object = results[i];
              var signature = object.get("signature");//个性签名
              var headImg = object.get("headImg");//头像
              that.user.headImg=headImg;
              that.user.signature=signature;
              //console.log( that.user.headImg)
            }
        },
        error: function(error) {
            alert("查询失败: " + error.code + " " + error.message);
        }
    });


   //查找系统动态表 显示系统动态
    var SystemDynamic = Bmob.Object.extend("SystemDynamic");
    var query1 = new Bmob.Query(SystemDynamic);
    query1.find({
        success: function(results) {
          var j=results.length;
          for (var i = j-1; i>=0; i--) {
            //console.log(i);
            var obj={};
            var object = results[i];
            var dynamicId=object.id;
            var image=object.get("image");
            var praiseTimes=object.get("praiseTimes");
            var content=object.get("dynamicContent");
            //var commandTimes=object.get("commandTimes");
            var time=object.createdAt;

            obj={"id":dynamicId,"image":image,"praiseTimes":praiseTimes,"content":content,'color':false,'color1':false,"time":time}
            that.system[j-1-i]=obj;

            // if(arr.length==j){
            //   break;
            // }else{
            //   arr=that.system;
            //   arr.unshift(obj);
            // }

          //  console.log(arr);
            //that.system[i]=obj;
          //  console.log(that.system);
          }//查找系统动态表 for end

          //在查找系统的success里 查找用户收藏表
          var UserCollection = Bmob.Object.extend("UserCollection");
          var query = new Bmob.Query(UserCollection);
          query.equalTo("username", user);//根据用户名查询用户有没有收藏过这个id的动态（用户收藏表有没有这条记录）
          //查询有没有收藏
          query.find({
              success: (results)=> {
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
                    for(var j=0;j<that.system.length;j++){
                      //console.log(object.get('dynamicId'));
                      //console.log(that.system[j].id);

                      if(object.get('dynamicId')==that.system[j].id){
                        that.system[j].color=true;
                      }
                    }
                }
                  //console.log(that.system);

              },
              error: function(error) {
                alert("查询失败: " + error.code + " " + error.message);
              }
          });//查询有没有收藏 end

          //在查找系统的success里 查找用户点赞表
          var UserPraise = Bmob.Object.extend("UserPraise");
          var query2 = new Bmob.Query(UserPraise);
          query2.equalTo("username", user);
          //查询有没有点赞
          query2.find({
              success: (results)=> {
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
                    for(var j=0;j<that.system.length;j++){
                      //console.log(object.get('dynamicId'));
                      //console.log(that.system[j].id);

                      if(object.get('dynamicId')==that.system[j].id){
                        that.system[j].color1=true;
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
    });//查询系统动态 end
}

//点击收藏
collection(event,id){
  var ele=event.currentTarget;

  //console.log(ele.childNodes[0].childNodes);
  //alert(id);
  var flag=false;
  var user=sessionStorage.getItem('user');//获取当前用户
  var UserCollection = Bmob.Object.extend("UserCollection");
  var usercollection = new UserCollection();
  var query = new Bmob.Query(UserCollection);
          //查询有没有收藏
          query.find({
          success: (results)=> {
            for (var i = 0; i < results.length; i++) {
                  var object = results[i];
                  if (object.get('username') == user && object.get('dynamicId') == id) {
                    flag = true;
                    //取消收藏
                      object.destroy({
                             success: (object)=> {
                               // 删除成功
                               //alert('已取消收藏')
                               let toast = this.toastCtrl.create({
                                 message: '已取消收藏',
                                 duration: 1000
                               });
                               toast.present();
                            },
                             error: (object, error)=> {
                                 // 删除失败
                                // alert(error);
                                //alert('取消失败')
                                let toast = this.toastCtrl.create({
                                  message: '取消失败',
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
            }

            if(!flag){//添加到收藏列表中
                usercollection.set("username", user);
                usercollection.set("dynamicId", id);
                ele.childNodes[0].childNodes[1].style.color="red";
                //添加数据，第一个入口参数是null
                usercollection.save(null, {
                  success: (usercollection)=> {
                    // 添加成功，返回成功之后的objectId（注意：返回的属性名字是id，不是objectId），你还可以在Bmob的Web管理后台看到对应的数据
                    //alert('收藏成功' );
                    let toast = this.toastCtrl.create({
                      message: '收藏成功',
                      duration: 1000
                    });
                    toast.present();
                    ele.childNodes[0].childNodes[1].style.color="red";
                  },
                  error: function(usercollection, error) {
                    // 添加失败
                    alert('添加数据失败，返回错误信息：' + error.description);
                  }
                });
            }
          },
          error: function(error) {
            alert("查询失败: " + error.code + " " + error.message);
          }
        });
    }

//点赞
    praise(event,id){
      var ele=event.currentTarget;

      //console.log(ele.childNodes[0].childNodes);
      //alert(id);
      var flag=false;
      var user=sessionStorage.getItem('user');//获取当前用户
      var UserPraise = Bmob.Object.extend("UserPraise");
      var userpraise = new UserPraise();
      var query = new Bmob.Query(UserPraise);
      //查询有没有点赞
          query.find({
              success: (results)=> {
                for (var i = 0; i < results.length; i++) {
                      var object = results[i];
                      if (object.get('username') == user && object.get('dynamicId') == id) {
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
                                   ele.childNodes[0].childNodes[1].style.color="#777171";
                                   //查找UserPraise 获取该条动态的点赞次数
                                   var dynamicId=id;//获取改动态的ID
                                   var query = new Bmob.Query(UserPraise);
                                   query.equalTo("dynamicId", dynamicId);
                                   query.find({
                                         success: function(results) {
                                           var praiseTimes=results.length;
                                         //  console.log(results.length);
                                           //查找系统，找到该条动态 修改点赞次数
                                           var SystemDynamic = Bmob.Object.extend("SystemDynamic");
                                           var query = new Bmob.Query(SystemDynamic);
                                           //  var userexpress = new UserExpress();
                                           query.get(dynamicId, {
                                               success: function(systemnynamic) {
                                               //  alert(praiseTimes);
                                                 systemnynamic.set('praiseTimes', praiseTimes);
                                                 systemnynamic.save();
                                               },
                                               error: function(object, error) {

                                               }
                                           });//查系统动态表 end
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
                                  //查找系统，找到该条动态 修改点赞次数
                                  var SystemDynamic = Bmob.Object.extend("SystemDynamic");
                                  var query = new Bmob.Query(SystemDynamic);
                                  //  var userexpress = new UserExpress();
                                  query.get(dynamicId, {
                                      success: function(systemnynamic) {
                                      //  alert(praiseTimes);
                                        systemnynamic.set('praiseTimes', praiseTimes);
                                        systemnynamic.save();
                                      },
                                      error: function(object, error) {

                                      }
                                  });//查系统动态表 end
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
//expotr end
}
