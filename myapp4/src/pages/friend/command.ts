import { Component} from '@angular/core';
import { NavController,NavParams,ToastController} from 'ionic-angular';
declare var Bmob;
@Component({
  selector: 'page-command',
  templateUrl: 'command.html'
})
export class CommandPage {
  //因为主页面传入了一个，初始化 关注人发表的这条动态
	item;
  public commandList=[];
  constructor(public params: NavParams,public navCtrl: NavController,public toastCtrl: ToastController) {
    this.item = params.data.item;
  }
doRefresh(event){//刷新
  setTimeout(() => {
      this.importCommand(this);
      // console.log('Async operation has ended');
       event.complete();
     }, 1000);
}
  //进入页面前
  ionViewWillEnter(){
    this.importCommand(this);
  }
//导入评论
importCommand(that){
    var commandUser=that.item.username;//获取关注的用户名
    var UserCommand = Bmob.Object.extend("UserCommand");
    var query = new Bmob.Query(UserCommand);
    query.equalTo("commandUser", commandUser);
    query.find({
        success: function(results) {
          var j=results.length;
          //console.log(j);
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
  //console.log(this.item.username);
  //提交评论
  command(){
    var textarea=document.getElementById('commandText');
    var commandText=textarea.querySelector('textarea').value;
    //console.log(this.item.username);
    //console.log(commandUser);
    //添加当前用户对该好友的动态的评论到用户评论表
    var user=sessionStorage.getItem('user');//获取当前用户名
    var UserCommand = Bmob.Object.extend("UserCommand");
    var usercommand = new UserCommand();
    usercommand.set("userCommand", user);
    usercommand.set("commandText", commandText);
    usercommand.set("commandUser", this.item.username);
    usercommand.set("expressId", this.item.id);
    //console.log(usercommand);
    usercommand.save(null, {
      success: (usercommand)=> {
        let toast = this.toastCtrl.create({
          message: '评论成功',
          duration: 1000
        });
        toast.present();
        var commandTimes;
        //查找UserCommand 获取该条动态的评论条数
        var expressId=this.item.id;//获取改动态的ID
        var query = new Bmob.Query(UserCommand);
        query.equalTo("expressId", expressId);
        query.find({
              success: function(results) {
                commandTimes=results.length;

                //查找用户发表，找到该条动态 修改评论次数
                var UserExpress = Bmob.Object.extend("UserExpress");
                var query = new Bmob.Query(UserExpress);
                //  var userexpress = new UserExpress();
                query.get(expressId, {
                    success: function(userexpress) {
                      //alert(commandTimes);
                      userexpress.set('commandTimes', commandTimes);
                      userexpress.save();
                    },
                    error: function(object, error) {

                    }
                });//查找用户发表 end
                //alert(expressId);
              },
              error: function(error) {
                alert("查询失败: " + error.code + " " + error.message);
              }
        });//查找UserCommand end
      },
      error: function(usercommand, error) {
        alert("create object fail");
      }
    });
  }

  //
  cancleCommand(event,Commands){
  //  alert(Commands.id);
    var user=sessionStorage.getItem('user');//获取当前用户名
    if(Commands.userCommand==user){
      var UserCommand = Bmob.Object.extend("UserCommand");
      var query = new Bmob.Query(UserCommand);
      query.get(Commands.id, {
            success: (object)=>{
              // The object was retrieved successfully.
              //console.log(this.commandList);
                  for(var i=0;i<this.commandList.length;i++){
                    if(this.commandList[i].id==Commands.id){
                      this.commandList.splice(i,1);
                    }
                  }
                  object.destroy({
                    success: (deleteObject)=> {
                      let toast = this.toastCtrl.create({
                        message: '删除成功',
                        duration: 1000
                      });
                      toast.present();
                    },
                    error: function(GameScoretest, error) {
                      alert("删除失败1");
                    }
                  });
           },
          error: function(object, error) {
            alert("删除失败2");
          }
      });
    }else{
      let toast = this.toastCtrl.create({
        message: '你不是该评论的发表者',
        duration: 1000
      });
      toast.present();
    }
  }//cancleCommand end
//export end
}
