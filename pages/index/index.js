//index.js
//获取应用实例
var tools = require('../../utils/util.js')

var app = getApp()
Page({
    data: {
        textareaIf: false,
        order_list: "",
        header: {
            banner: 'https://zxcs.ggwan.com/forecastbazijingpibundle/images/new/new_banner_j.jpg'
        },
        forms: {
            tips: '八字精批一生命运走向',
            date: '',
            timeIndex: 0,
            sex: 0,
            sort: ['健康平安套餐58元', '健康平安套餐158元', '健康平安套餐258元', '健康平安套餐358元', '健康平安套餐458元', '健康平安套餐558元'],
            time: ['时辰不清楚', '子时 0点', '丑时 1点', '丑时 2点', '寅时 3点', '寅时 4点', '卯时 5点', '卯时 6点', '辰时 7点', '辰时 8点', '巳时 9点', '巳时 10点', '午时 11点', '午时 12点', '未时 13点', '未时 14点', '申时 15点', '申时 16点', '酉时 17点', '酉时 18点', '戌时 19点', '戌时 20点', '亥时 21点', '亥时 22点', '子时 23点'],
            sortValue: '',
            sortIndex: 0,
            agreeChecked: 'true'
        },
        reveal: {
            tips: '你将揭晓这一生…',
            banner: 'https://zxcs.ggwan.com/forecastbazijingpibundle/images/new/new_four_lists_j.png',
            types: [{
                type_icon: 'https://zxcs.ggwan.com/forecastbazijingpibundle/images/new/new_list01_mingpan.png',
                names: '八字命盘\n',
                infos: '金木水火土 喜用神'
            },
            {
                type_icon: 'https://zxcs.ggwan.com/forecastbazijingpibundle/images/new/new_list02_yunshi.png',
                names: '运势\n',
                infos: '未来12个月'
            },
            {
                type_icon: 'https://zxcs.ggwan.com/forecastbazijingpibundle/images/new/new_list03_yearyunshi.png',
                names: '整年运势\n',
                infos: '透视整年命运起伏'
            }],
            footer_banner: 'https://zxcs.ggwan.com/forecastbazijingpibundle/images/new/new_tit01_j.png'
        },
        feedback: {
            tips: '测算用户的真实反馈',
            exp: [{
                photo: 'https://zxcs.ggwan.com/forecastbazijingpibundle/images/new/new_user01_pic.png',
                desc: '测算内容包括了财运，婚姻感情，事业职场，健康情况，并且还有流年运势和12个月详细分析。我认为这能帮助我全面掌握流年运势！'
            }, {
                photo: 'https://zxcs.ggwan.com/forecastbazijingpibundle/images/new/new_user02_pic.png',
                desc: '测试后3个月，真切感受到大运对运势的影响是深远且潜移默化的，老师说因为大运是很长一段时间的行运波动，所以每个事件都会被圆滑化。'
            }],
            footer_banner: 'https://zxcs.ggwan.com/forecastbazijingpibundle/images/new/new_tit02_j.png'
        },
        affect: {
            tips: '喜用神对一生命运的重大影响',
            exp: [{
                photo: 'https://zxcs.ggwan.com/forecastbazijingpibundle/images/new/new_wuxing01.png',
                titles: '喜用神属木、火的人\n',
                desc: '五行属木的人，一般比较情感丰富，心胸宽广，举止也洒脱。五行属火的人，敢于承担风险，富于冒险精神，有自信心，进取心'
            }, {
                photo: 'https://zxcs.ggwan.com/forecastbazijingpibundle/images/new/new_wuxing02.png',
                titles: '喜用神属金、水的人\n',
                desc: '五行属金的人，本质是较重意气，个性有棱有角且坚强，是个野心家。五行属水的人，足智多谋，聪明好学，有谋略，好思索，但易变动。'
            }, {
                photo: 'https://zxcs.ggwan.com/forecastbazijingpibundle/images/new/new_wuxing03.png',
                titles: '喜用神属土的人\n',
                desc: '五行属土的人，本质忠诚，信守诚诺，做事刻苦耐劳，有着坚韧不拔的耐心、耐力和韧性。'
            }],
            intro: '五行之间总有刑冲克害，需要用神，使命局达到平衡\n用神选得准，制凶助吉，防灾免灾，富贵荣身\n用神既为贵人，与之来往会多得其助',
            footer_banner: 'https://zxcs.ggwan.com/forecastbazijingpibundle/images/new/new_tit02_j.png'
        },
        avoid: {
            tips: '如何正确规避人生的低潮？',
            banner: 'https://zxcs.ggwan.com/forecastbazijingpibundle/images/new/new_yuce_qianhou_j.png',
            footer_banner: 'https://zxcs.ggwan.com/forecastbazijingpibundle/images/new/new_tit04_j.png',
        },
        immediate: {
            banner: 'https://zxcs.ggwan.com/forecastbazijingpibundle/images/new/new_tit05_j.png',
            benefit: '专业命盘精论，掌握一生好运秘诀：一次掌握十年大运、桃花婚姻、财运工作、健康家庭等运势的吉凶变化。 为你点出八字旺弱、五行喜忌，2017年每月运势好坏预测，助你时调整方向大展身手，如鱼得水。'
        }
    },
    test: function () {
        console.log(11111)
    },
    onLoad: function () {
        var _this = this;
        // 出生日期默认设置
        var nowDate = tools.getNowDate();
        this.setData({
            'forms.date': nowDate
        });
    },
    
    //事件处理函数
    bindDateChange: function (e) {
        this.setData({
            'forms.date': e.detail.value
        })
    },
    bindTimeChange: function (e) {
        this.setData({
            'forms.time': e.detail.value
        })
    },
    goTop: function(){
        console.log(111)
        this.setData({
            scrollTop: 0
        })
    },
    bindTimeChange: function (e) {
        this.setData({
            'forms.timeIndex': e.detail.value
        })
    },
    // 格式化数据
    format: function (data) {
        var validDate = {
            pay_point: "xcx_qimingjieming_default"
        };
        validDate.hour_mark = data.time == "0" ? 1 : 0;
        validDate.birthday = tools.formatDate(data.date, data.time);
        validDate.email = data.email;
        validDate.send_email = 1;
        validDate.familyname = data.username;
        validDate.firstname_length = data.username.length;
        validDate.gender = parseInt(data.sex);
        validDate.remark = data.remark;
        validDate.nameServiceType = 0;
        validDate.channel = 'other';
        // console.log(validDate);
        return validDate;
    },
    // 存订单号
    setLocalStorage: function (key, value) {
        var _this = this;
        var order_list = '';
        try {
            order_list = wx.getStorageSync(key)
            if (order_list) {
                order_list = ',' + order_list;
            }
        } catch (e) {
            // Do something when catch error
        }
        // console.log(order_list);
        wx.setStorage({
            key: key,
            data: value + order_list
        })
    },
    //下单
    submitHandler: function (e) {
        var _this = this;
        // this.format(e.detail.value);
        var date = e.detail.value;
        // 验证部分

        if (!tools.isNotEmpty(date.username)) {
            wx.showToast({
                title: '姓氏不能为空',
                duration: 2000,
                image: '../../images/toast-icon.png'
            })
            return false;
        }
        if (date.username.length > 4) {
            wx.showToast({
                title: '姓氏不能超过4个字',
                duration: 2000,
                image: '../../images/toast-icon.png'
            })
            return false;
        }
        if (!tools.isNotEmpty(date.email)) {
            wx.showToast({
                title: '邮箱不能为空',
                duration: 2000,
                image: '../../images/toast-icon.png'
            })
            return false;
        }
        if (!tools.isEmail(date.email)) {
            wx.showToast({
                title: '邮箱格式不正确',
                duration: 2000,
                image: '../../images/toast-icon.png'
            })
            return false;
        }
        //得到格式化后的数据
        // var sendDate = this.format(date);
        console.log(date)
        // wx.showLoading({
        //   title: '提交中',
        //   icon: 'loading'
        // });
        // wx.showToast({
        //     title: '提交中',
        //     duration: 4000,
        //     icon: 'loading'
        // })
        // wx.request({
        //     url: 'https://zxcs.linghit.com/api/v1/orders/register',
        //     method: 'POST',
        //     header: {
        //         'content-type': 'application/x-www-form-urlencoded'
        //     },
        //     data: sendDate,
        //     success: function (res) {
        //         // wx.hideLoading();
        //         var result = res.data;
        //         // console.log(result);
        //         if (result.msg) {
        //             wx.showToast({
        //                 title: result.msg,
        //                 duration: 2000,
        //                 image: '../../images/toast-icon.png'
        //             })
        //             return;
        //         };
        //         // console.log(result.order_id)
        //         if (result.order_id) {
        //             _this.setLocalStorage('history_order_list', result.order_id);
        //             // 跳转支付
        //             wx.navigateTo({
        //                 url: '../payment/payment?order_id=' + result.order_id
        //             })
        //         }
        //     },
        //     fail: function (res) {
        //         wx.showToast({
        //             title: res.data.msg,
        //             image: '../../images/toast-icon.png'
        //         })
        //         // do someing
        //     }
        // })
    }
})
