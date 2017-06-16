import { ViewController } from 'ionic-angular';
import { Component } from '@angular/core';
declare var Bmob;
@Component({
  selector: 'page-mycollection',
  templateUrl: 'mycollection.html'
})
export class MycollectionPage {
	public collection=[];
	constructor(public viewCtrl: ViewController) {}

	dismiss(){
		this.viewCtrl.dismiss();
	}

//进入页面前
ionViewWillEnter(){
  this.mycollection(this);
}

doRefresh(event){//刷新
  setTimeout(() => {
      this.mycollection(this);
      // console.log('Async operation has ended');
       event.complete();
     }, 1000);
}

mycollection(that){
        //查找用户收藏表
        var user=sessionStorage.getItem('user');//获取当前用户
        var UserCollection = Bmob.Object.extend("UserCollection");
        var query = new Bmob.Query(UserCollection);
        query.equalTo("username", user);
        //查询收藏的id
        query.find({
            success: (results)=> {
              var arr=[]
              for (var i = 0; i < results.length; i++) {
                    var object = results[i];
                    arr[i]=object.get('dynamicId');
              }
              //console.log(arr);
              //查找系统动态表
              var SystemDynamic = Bmob.Object.extend("SystemDynamic");
              var query = new Bmob.Query(SystemDynamic);
              query.find({
                  success: (results)=> {
                    var j=results.length;
                    for (var i = j-1; i>=0; i--){//从后面遍历
                        var object = results[i];
                        var obj={};
                      for(var k=0;k<arr.length;k++){
                          if(arr[k]==object.id){
                            var dynamicId=object.id;
                            var image=object.get("image");
                            var pointTimes=object.get("pointTimes");
                            var content=object.get("dynamicContent");
                            var commandTimes=object.get("commandTimes");
                            var time=object.createdAt;
                            obj={"id":dynamicId,"image":image,"pointTimes":pointTimes,"content":content,"commandTimes":commandTimes,'color':true,"time":time}
                            that.collection[arr.length-1-k]=obj;
                            //console.log(obj);
                            //console.log(that.collection);

                            break;
                          }else{
                            continue;
                          }
                      }//2nd for end
                    }//1st for end
                  },
                  error: function(error) {
                    alert("查询失败: " + error.code + " " + error.message);
                  }
                });//查找系统表end
                //console.log(that.system);
            },
            error: function(error) {
              alert("查询失败: " + error.code + " " + error.message);
            }
        });//查询有没有收藏 end

        
  }//mycollection end

  //取消收藏
  cancleCollect(event,id){
    //alert(id);
    var user=sessionStorage.getItem('user');//获取当前用户
    var UserCollection = Bmob.Object.extend("UserCollection");
    var query = new Bmob.Query(UserCollection);
    query.equalTo('username',user);
    query.find({
        success: (results)=> {
          //删除前台
          for(var j=0;j<this.collection.length;j++){
            if(this.collection[j].id==id){
              this.collection.splice(j,1);
            }
          }
          //删除后台
          for(var i=0;i<results.length;i++){
            var object=results[i];
            //console.log(object.id)
            if(object.get('dynamicId')==id){
              object.destroy({
                     success: function(object) {
                       // 删除成功
                       alert('已取消收藏')
                    },
                    error: function(object, error) {
                        // 删除失败
                       // alert(error);
                       alert('取消收藏失败')
                    }
             });//destroy end
           }//if end
          }//for end
        },
        error: function(error) {
          alert("查询失败: " + error.code + " " + error.message);
        }
    });
  }
//export end
}
