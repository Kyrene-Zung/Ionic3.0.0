import { Component } from '@angular/core';

@Component({
  selector: 'page-bookstore',
  templateUrl: 'bookstore.html'
})
export class BookstorePage {
	public map: any;
	constructor() {}

	loadMap() {
    // var geolocation;
	    this.map = new AMap.Map('container', {
	      resizeEnable: true,
	      zoom: 8,
        showButton:true,
	      center: [116.39,39.9]
	    });
    //   var citysearch;
    //   citysearch = new AMap.CitySearch();
    //   //自动获取用户IP，返回当前城市
    //    citysearch.getLocalCity((status, result)=> {
    //        console.log(status);
    //        if (status === 'complete' && result.info === 'OK') {
    //            if (result && result.city && result.bounds) {
    //                var cityinfo = result.city;
    //                var citybounds = result.bounds;
    //                document.getElementById('tip').innerHTML = '您当前所在城市：'+cityinfo;
    //                //地图显示当前城市
    //                this.map.setBounds(citybounds);
    //            } else {
    //             document.getElementById('tip').innerHTML = result.info;
    //         }
    //       }
    //     });
    //     this.map.plugin('AMap.Geolocation',()=> {
    //     geolocation = new AMap.Geolocation({
    //         enableHighAccuracy: true,//是否使用高精度定位，默认:true
    //         timeout: 10000,          //超过10秒后停止定位，默认：无穷大
    //         buttonOffset: new AMap.Pixel(10, 20),//定位按钮与设置的停靠位置的偏移量，默认：Pixel(10, 20)
    //         zoomToAccuracy: true,
    //         //定位成功后调整地图视野范围使定位位置及精度范围视野内可见，默认：false
    //         buttonPosition:'RB'
    //     });
    //     this.map.addControl(geolocation);
    //     geolocation.getCurrentPosition();
    //
    // });
    //


	}

	ionViewDidLoad() {
	    this.loadMap();
	}

//export end
}
