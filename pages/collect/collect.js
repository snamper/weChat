Page({
    data: {
        icon: 'https://zxcs.ggwan.com/forecastbazijingpibundle/images/user_info.png',
        user: {
            name: '狗狗狗',
            gender: '女',
            lunar: '丙戌年四月二十丙寅时',
            birthday: '1946年05月20日 04时'
        },
        types: [{
            text: '一、您的八字命盘',
            value: 'bazimingpan'
        }, {
            text: '二、您的财运分析',
            value: 'caiyunfenxi'
        }, {
            text: '三、您的生活建议',
            value: 'shenghuojianyi'
        }, {
            text: '四、您的爱情恋爱建议',
            value: 'aiqingjianyi'
        }, {
            text: '五、您的事业成就分析',
            value: 'shiyefenxi'
        }, {
            text: '六、您的性格分析',
            value: 'xinggefenxi'
        }, {
            text: '七、您的2017年流月运程',
            value: 'liuyueyuncheng'
        }]
    },
    viewRe: function (e) {
        console.log(e.target.dataset)
    },
    linkIndex: function () {
        wx.switchTab({
            url: '../index/index'
        })
    },
    linkOrder: function () {
        wx.switchTab({
            url: '../order/order'
        })
    }
})