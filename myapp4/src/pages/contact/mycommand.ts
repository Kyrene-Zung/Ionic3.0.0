import { Component} from '@angular/core';
import { NavParams,ToastController} from 'ionic-angular';


declare var Bmob;
@Component({
  selector: 'page-mycommand',
  templateUrl: 'mycommand.html'
})
export class MycommandPage{
  //因为主页面传入了一个，初始化
	item;
  public commandList=[];
  constructor(public params: NavParams){
    this.item = params.data.item;
  }

  doRefresh(event){//刷新
    setTimeout(() => {
        this.importCommand(this);
         //console.log('Async operation has ended');
         event.complete();
       }, 1000);
  }

  //进入页面前
  ionViewWillEnter(){
    this.importCommand(this);
  }

  //导入评论
  importCommand(that){
      var expressId=that.item.id;//获取我的发表的id
      var UserCommand = Bmob.Object.extend("UserCommand");
      var query = new Bmob.Query(UserCommand);
      query.equalTo("expressId", expressId);
      query.find({
          success: function(results) {
            var j=results.length;
            console.log(j);
              for (var i = j-1; i>=0; i--) {
                var obj={};
                var object = results[i];
                var time=object.createdAt;
                var userCommand=object.get('userCommand');
                var commandText=object.get('commandText');
                var id=object.id;
                obj={"id":id,"userCommand":userCommand,"commandText":commandText,"time":time};
                that.commandList[j-1-i]=obj;
                //console.log(obj);
            }
          },
          error: function(error) {
              alert("查询失败: " + error.code + " " + error.message);
          }
      });
  }
}//export end
