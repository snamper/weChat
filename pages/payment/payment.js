
var app = getApp()
Page({
    data: {
        banner: 'https://zxcs.linghit.com/ordersbundle/newimages/bazi_banner_01.jpg',
        orderInfo: {
            user_name: '嘎嘎嘎',
            gender: '男',
            birthday: '1985年01月01日(公历)',
            creat_time: '2017年05月29日20时06分',
            price: 88
        },
        title_banner: 'https://zxcs.linghit.com/ordersbundle/newimages/bazi_title_text.png',
        unlock: [{
            title: '您的八字命盘',
            tips: '今年内有何重大变故，亲情、爱情、事业、财运等有什么需要特别注意的地方？今生是富是穷，姻缘是好是坏，财运是多是少，其实这一切的信息就蕴藏在你的八字当中。',
            btn: 'https://zxcs.linghit.com/ordersbundle/newimages/bazi_part1.png'
        }, {
            title: '您的财运分析',
            tips: '本周财运走势，今日财运方位，先天财运如何？一目了然的财运分析，更有详细流年财运分析和增强的财运方法，让你今年赚个盘满盆满！',
            btn: 'https://zxcs.linghit.com/ordersbundle/newimages/bazi_part2.png'
        }, {
            title: '您的生活建议'
        }, {
            title: '您的爱情恋爱建议'
        }, {
            title: '您的事业成就分析'
        }, {
            title: '您的性格分析'
        }, {
            title: '您的2017年流月运程'
        }],
        scrollTop: 0,
        order_id: ''
    },
    //回到顶部
    goTop() {
        this.setData({
            scrollTop: 0
        })
    },
    //获取baby信息
    fetchBabyInfo: function (order_id) {
        var _this = this;
        wx.request({
            url: 'https://zxcs.linghit.com/api/v1/orders/query',
            data: {
                order_id: order_id
            },
            method: 'GET',
            success: function (res) {
                // wx.hideLoading();
                var res = res.data;
                if (res.msg) {
                    wx.showToast({
                        title: res.msg,
                        duration: 2000
                    })
                    return;
                }
                var {family_name, birthday, hour, hour_mark, gender, email, nameServiceType, price} = res;
                let orderInfo = {
                    family_name,
                    birthday,
                    hour,
                    hour_mark,
                    gender,
                    nameServiceType,
                    price,
                    email
                }
                _this.setData({
                    babyInfo: orderInfo,
                })
            },
            fail: function (res) {
                // fail
            }
        })
    },
    onLoad: function (e) {
        var order_id = e.order_id;
        this.setData({
            order_id: order_id
        })
        // this.fetchBabyInfo(order_id);
    },
    payHandler: function () {

        // wx.redirectTo({
        //     url: '../success/success'
        // })
        wx.pro.login()
            .then(data => {
                wx.pro.request({
                    url: 'https://pay.linghit.com/v2/wechat/mina/pay',
                    data: {
                        order_id: this.data.order_id,
                        code: data.code
                    }
                })
                    .then(data => {
                        wx.requestPayment({
                            'timeStamp': data.timeStamp + '',
                            'nonceStr': data.nonceStr,
                            'package': data.package,
                            'signType': 'MD5',
                            'paySign': data.paySign,
                            'success': function (res) {
                                // success
                                wx.redirectTo({
                                    url: '../success/success'
                                })
                            },
                            'fail': function (res) {
                                // fail
                            },
                            'complete': function (res) {
                                // complete
                            }
                        })
                    })

            })
    }

})