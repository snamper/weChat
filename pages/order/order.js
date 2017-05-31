var Promise = require('../../utils/promise').Promise

var app = getApp()
Page({
  data: {
      order_id: '',
      showdOrder: [],
      orderInfoList: [{
          order_id: 'KHFZOK0F80425F39B78704',
          status: '已支付',
          unique: 1
      },
          {
              order_id: 'KHFZOK0F80425F39B78704',
              status: '已支付',
              unique: 2
          }]
  },
  // 取订单号
  getLocalStorage: function(key){
    var orderArr = "";
    try {
      var order_list = wx.getStorageSync(key)
      if (order_list) {
          orderArr = order_list.split(',');
          // 微信限制最大并发数为5
          if(orderArr.length > 5){
            orderArr.splice(5);
          }
          return orderArr.reverse();
      } else {
        return ;
      }
    } catch (e) {
          // Do something when catch error
    }
  },
  //显示历史订单信息
  //promise
  getInfo: function(order){
    // console.log(order)
    if(this.data.showdOrder.indexOf(order) > -1){
      return Promise.resolve();
    }
    var obj = {
      url: 'https://zxcs.linghit.com/api/v1/orders/query',
      data: {
        order_id: order
      },
      toast: {}
    }
    return wx.pro.request(obj);
  },
  promiseGetInfo: function(){
    var _this = this;
    var orderArr = this.getLocalStorage('history_order_list');
    if(!orderArr) {
        return false;
    }
    var length = orderArr.length;
    orderArr.map(this.getInfo).reduce(function(pre,cur,index){
      return pre.then(function(){
        cur.then(data => {
          // _this.displayInfo(data);

          if(data.msg){
            wx.showToast({
              title: data.msg,
              duration: 2000
            })
            return ;
          }
          if(data.is_paid){
            let {create_at,family_name,birthday,hour,hour_mark,gender,email,nameServiceType,price,order_id} = data;
            const length = _this.data.orderInfoList.length;
            _this.data.showdOrder.push(data.order_id);
            // console.log(data);
            let orderInfo = {
                create_at,
                family_name,
                birthday,
                hour,
                hour_mark,
                gender,
                nameServiceType,
                price,
                email,
                order_id,
                unique: 'unique_' + length
            }
            _this.data.orderInfoList.unshift(orderInfo);
            _this.setData({
              orderInfoList: _this.data.orderInfoList,
              showdOrder: _this.data.showdOrder
            })
          }
        });
        return cur;
      })
    },Promise.resolve());
  },
  onLoad: function(){
    // console.log(wx.pro);
  },
  onShow: function(){
    this.promiseGetInfo();
  },
  keyInput: function(e){
    this.setData({
      order_id: e.detail.value
    })
  },
  //查询订单
  searchOrder: function(){
    var _this = this;
    let order_id = this.data.order_id;
    if(this.data.showdOrder.indexOf(order_id)>-1){
        wx.showToast({
          title: "该订单已显示"
        })
        return ;
    }
    wx.showToast({
      title: '查询中...',
      icon: 'loading'
    });
    wx.request({
      url: 'https://zxcs.linghit.com/api/v1/orders/query',
      data: {
        order_id: order_id
      },
      method: 'GET', 
      success: function(res){
        var res = res.data;
        if(res.msg){
          wx.showToast({
              title: res.msg,
              duration: 2000
            })
            return ;
        }
        //暂时这样，看后台数据
        if(!res.is_paid){
          wx.navigateTo({
            url: '../payment/payment?order_id=' + res.order_id
          })
        }else{
            const length = _this.data.orderInfoList.length;
            var {create_at,family_name,birthday,hour,hour_mark,gender,email,nameServiceType,price,order_id} = res;
            //保存展示记录
            _this.data.showdOrder.push(order_id);
            let orderInfo = {
              create_at,
              family_name,
              birthday,
              hour,
              hour_mark,
              gender,
              nameServiceType,
              price,
              email,
              order_id,
              unique: 'unique_' + length
            }
            _this.data.orderInfoList.push(orderInfo);
            //触发视图更新
            _this.setData({
              orderInfoList: _this.data.orderInfoList,
              showdOrder: _this.data.showdOrder
            })
        }
      },
      fail: function(res) {
        // fail
      }
    })
  }
})