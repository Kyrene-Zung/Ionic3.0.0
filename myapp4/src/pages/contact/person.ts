import { Component ,OnInit,ChangeDetectorRef} from '@angular/core';
import { ViewController ,AlertController,ToastController} from 'ionic-angular';

declare var Bmob;
var gender;
var phoneNum;
var email;
var signature;

@Component({
  selector: 'page-person',
  templateUrl: 'person.html'
})
export class PersonPage implements OnInit{

  testRadioOpen: boolean;
  testRadioResult;//性别

  //存储个人信息
  public personal={
    headImg:'m2.jpg',
    username:sessionStorage.getItem('user'),
    gender:'请选择',
    phoneNum:'请添加',
    email:'请添加',
    signature:'添加你的个性签名'
  }

	constructor(public viewCtrl: ViewController,
                public alertCtrl: AlertController,
                public toastCtrl: ToastController,
                public cd: ChangeDetectorRef) {
                }

	//返回
	dismiss(){
		this.viewCtrl.dismiss();
	}

  //初始化
    ngOnInit(){
          this.showPerMessage(this);
    }

  //查询数据库  显示个人信息
  showPerMessage(that){
      var user=sessionStorage.getItem('user');//获取当前用户名
      //查找用户表
      var UserList = Bmob.Object.extend("UserList");
      var query = new Bmob.Query(UserList);
      query.equalTo("username", user);
      query.find({
          success: function(results) {
            for (var i = 0; i < results.length; i++) {
              var object = results[i];
              that.personal.headImg=object.get('headImg');
              that.personal.username=object.get('username');
              that.personal.gender=object.get('gender');
              that.personal.phoneNum=object.get('phoneNum');
              that.personal.email=object.get('email');
              that.personal.signature=object.get('signature');
            }
          },
          error: function(error) {
              alert("查询失败: " + error.code + " " + error.message);
          }
      });
  }

  //点击头像
  changeImg(){
    let prompt = this.alertCtrl.create({
            title: '修改头像',
            message: "为保障你的数据安全，修改密码前请填写原密码。",
            buttons: [{
                      text: '取消',
                      handler: data => {console.log('Cancel clicked')}
                      }
                      //,
                      // {
                      //   text: '确定',
                      //   handler: data => { this.navCtrl.push(ChangecodePage);}
                      // }
                     ]
    });
    prompt.present();
  }

  //修改用户名
  changeName(){
    let alert = this.alertCtrl.create({
        title: '你好!Kyrene',
        subTitle: '用户名不可以修改!',
        buttons: ['确定']
      });
      alert.present();
  }

//修改性别 点击OK 上传到数据库
  changeSex(){
    //弹出选择框
        let alert = this.alertCtrl.create();
        alert.setTitle('请选择性别');
        alert.addInput({
          type: 'radio',
          label: '男',
          value: '男',
          checked: true
        });
        alert.addInput({
          type: 'radio',
          label: '女',
          value: '女',
          checked: false
        });
        alert.addButton('取消');
    //点击OK
        alert.addButton({
          text: '确定',
          handler: data => {
            this.testRadioOpen = false;
            this.testRadioResult = data;//选择性别
            this.personal.gender=this.testRadioResult;//赋值给
            gender=this.testRadioResult;
            //console.log(this.testRadioResult);

            //修改数据库
            var user=sessionStorage.getItem('user');//获取当前用户名
            //查找用户表
            var UserList = Bmob.Object.extend("UserList");
            //var userList = new UserList();

            var query = new Bmob.Query(UserList);
            query.equalTo("username", user);
            query.find({
                success: function(results) {
                  results[0].set('gender', gender);
                  results[0].save();
                },
                error: function(object, error) {

                }
            });
            //OK handler end
          }
        });//OK button end
        alert.present();
    }

//修改手机号码
  changeNUm(){
    let prompt = this.alertCtrl.create({
        title: '修改手机号码',
        inputs: [
          {
            name: 'phoneNum',
            placeholder: '手机号码'
          },
        ],
        buttons: [
          {
            text: '取消',
            handler: data => {
              //console.log('Cancel clicked');
              return;
            }
          },
          {
            text: '保存',
            handler: data => {//保存到数据库
              //console.log(data);
              //判断号码格式
              if( !(/^1[34578]\d{9}$/.test(data.phoneNum)) ){
                //alert("手机号码有误，请重填");
                let toast = this.toastCtrl.create({
                  message: '手机号码有误，请重填!',
                  duration: 1000
                });
                toast.present();
                return false;
              }else{
                this.personal.phoneNum=data.phoneNum;//赋值给
                phoneNum=Number(data.phoneNum);
              }
              //修改数据库
              var user=sessionStorage.getItem('user');//获取当前用户名
              //查找用户表
              var UserList = Bmob.Object.extend("UserList");
              //var userList = new UserList();

              var query = new Bmob.Query(UserList);
              query.equalTo("username", user);
              query.find({
                  success: function(results) {
                  //  console.log(typeof phoneNum);
                    results[0].set('phoneNum', phoneNum);
                    results[0].save();
                  },
                  error: function(object, error) {

                  }
              });
            }
          }
        ]
      });
      prompt.present();
  }

//修改email
  changeEmail(){
  let prompt = this.alertCtrl.create({
      title: '修改邮件地址',
      inputs: [
        {
          name: 'email',
          placeholder: '邮件地址'
        },
      ],
      buttons: [
        {
          text: '取消',
          handler: data => {
            //console.log('Cancel clicked');
            return;
          }
        },
        {
          text: '保存',
          handler: data => {//保存到数据库
            //console.log(data);
            //判断邮箱格式
            if( !( /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+/.test(data.email)) ){
              let toast = this.toastCtrl.create({
                message: 'email格式有误，请重填!',
                duration: 1000
              });
              toast.present();
              return false;
            }else{
              this.personal.email=data.email;//赋值给
              email=data.email;
            }
            //修改数据库
            var user=sessionStorage.getItem('user');//获取当前用户名
            //查找用户表
            var UserList = Bmob.Object.extend("UserList");
            //var userList = new UserList();

            var query = new Bmob.Query(UserList);
            query.equalTo("username", user);
            query.find({
                success: function(results) {
                //  console.log(typeof phoneNum);
                  results[0].set('email', email);
                  results[0].save();
                },
                error: function(object, error) {

                }
            });
          }
        }
      ]
    });
    prompt.present();
}

//个性签名
  changeSignature(){
    let prompt = this.alertCtrl.create({
        title: '个性签名',
        inputs: [
          {
            name: 'signature',
            placeholder: '个性签名'
          },
        ],
        buttons: [
          {
            text: '取消',
            handler: data => {
              //console.log('Cancel clicked');
              return;
            }
          },
          {
            text: '保存',
            handler: data => {//保存到数据库
              //console.log(data);

                this.personal.signature=data.signature;//赋值给
                signature=data.signature;

              //修改数据库
              var user=sessionStorage.getItem('user');//获取当前用户名
              //查找用户表
              var UserList = Bmob.Object.extend("UserList");
              //var userList = new UserList();

              var query = new Bmob.Query(UserList);
              query.equalTo("username", user);
              query.find({
                  success: function(results) {
                  //  console.log(typeof phoneNum);
                    results[0].set('signature', signature);
                    results[0].save();
                  },
                  error: function(object, error) {

                  }
              });
            }
          }
        ]
      });
      prompt.present();
  }
//export end
}
