import { Component} from '@angular/core';
import { ViewController,NavController } from 'ionic-angular';

import { MycommandPage} from '../contact/mycommand';

declare var Bmob;

@Component({
  selector: 'page-myexpress',
  templateUrl: 'myexpress.html'
})
export class MyexpressPage{

  public express=[];

	constructor(public viewCtrl: ViewController,public navCtrl: NavController) {}

	//返回
	dismiss(){
		this.viewCtrl.dismiss();
	}
  //进入页面前
  ionViewWillEnter(){
    this.showExpress(this);
  }
  //
  // //显示我的发表
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

  showExpress(that){
    var user=sessionStorage.getItem('user');//获取当前用户名

    var UserExpress = Bmob.Object.extend("UserExpress");
    var query = new Bmob.Query(UserExpress);
    query.equalTo("username", user);
    query.find({
        success: function(results) {
          //console.log( results.length);
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
              var praiseTimes=object.get('praiseTimes');
              var commandTimes=object.get('commandTimes');
              obj={'id':id,'month':month,'date':date,'expressImg':expressImg,'expressText':expressText,'praiseTimes':praiseTimes,'commandTimes':commandTimes};
              that.express[j-1-i]=obj;
              //console.log(that.express);
          }
        },
        error: function(error) {
            alert("查询失败: " + error.code + " " + error.message);
        }
    });
  }

//查看我的动态的评论
myCommand(event,expressItem){
  //alert(expressItem.id);
  this.navCtrl.push(MycommandPage,{item:expressItem});
}

  //export end
}
