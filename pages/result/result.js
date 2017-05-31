var app = getApp()

Page({
  data:{
      mp: {
          banner: 'https://zxcs.ggwan.com/forecastbazijingpibundle/images/detail1_banner.png',

      }
  },
  fetchResult(order_id,option) {
      var url = app.globalData.api.result;
    //   console.log(url);
      wx.request({
          url: url,
          data: {
              order_id,
              option
          },
          method: 'GET',
          success: (res)=>{
            var data = Object.assign(this.data.mp,res.data[option])
            // console.log(data);
            this.setData({
                mp: data
            })
          },
          fail: function(res) {},
          complete: function(res) {},
      })
  },
  onLoad() {
      this.fetchResult('KHFZOK0F80425F39B78704', 'bazimingpan');
  }
})