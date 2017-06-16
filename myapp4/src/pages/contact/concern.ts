import { Component } from '@angular/core';
import { ToastController} from 'ionic-angular';

declare var Bmob;
@Component({
  selector: 'page-concern',
  templateUrl: 'concern.html',
  //providers : [ImagePicker]
})
export class ConcernPage{
public concernUser={
  username:'',
  signature:'',
  headImg:'',
  flag:false
}
  constructor(public toastCtrl: ToastController) {

    }

//搜索框输入
  getItems(ev: any) {

   let val = ev.target.value;// 获取搜索框的值
   if(!val){
     this.concernUser.flag=false;
   }else{//查找数据库
     //查找用户表
     var UserList = Bmob.Object.extend("UserList");
     var query = new Bmob.Query(UserList);
     query.equalTo("username", val);
     query.find({
         success: (results)=>{
          var object=results[0];
          if(!object){
            this.concernUser.flag=false;
            //console.log(this.concernUser.flag);
          }else{
            this.concernUser.flag=true;
            //console.log(this.concernUser.flag);
            this.concernUser.username=object.get('username');
            this.concernUser.signature=object.get('signature');
            this.concernUser.headImg=object.get('headImg');
          }
         },
         error: function(error) {
             alert("发生错误，请终止程序" );
            //  let toast = this.toastCtrl.create({
            //    message: '没有这位用户！',
            //    duration: 1000
            //  });
            //  toast.present();
         }
     });
   }

        // if the value is an empty string don't filter the items
        //  if (val && val.trim() != '') {
        //    this.items = this.items.filter((item) => {
        //      return (item.toLowerCase().indexOf(val.toLowerCase()) > -1);
        //    })
        //  }
 }

 //加关注
 clickConcern(event,username){
   var flag=true;
   console.log(username);
   //查找用户关注表
     var user=sessionStorage.getItem('user');
     var UserConcern = Bmob.Object.extend("UserConcern");
     var userconcern = new UserConcern();

     var query = new Bmob.Query(UserConcern);
     query.equalTo("userConcern", user);
     console.log(query);
     query.find({
         success:(results)=> {
           console.log(results.length);
           for (var i = 0; i < results.length; i++){
             var object = results[i];
             console.log(username);
             if(object.get('concernUser')==username){//关注过了
               flag=false;
               let toast = this.toastCtrl.create({
                 message: '你已关注了该用户！',
                 duration: 1000
               });
               toast.present();
               break;
             }else{
                flag=true;
             }
           }
           if(flag){
             //添加到关注表
              userconcern.set("userConcern", user);
   				    userconcern.set("concernUser", username);
   				    userconcern.save(null, {
   					    success:(object)=> {
                  let toast = this.toastCtrl.create({
                    message: '关注成功！',
                    duration: 1000
                  });
                  toast.present();
   					    },
   					    error: function(model, error) {
                      alert('fail');
                }
              });
              //alert('OK');
            }
         },
         error: function(error) {
             alert("查询失败: " + error.code + " " + error.message);
         }
     });
 }

//export end
}
