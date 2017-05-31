//获取当前时间
function getNowDate() {
  var date = new Date();
  var year = date.getFullYear()
  var month = date.getMonth() + 1
  var day = date.getDate()
  return [year, month, day].map(formatNumber).join('-')
}
function formatNumber(n) {
  n = n.toString()
  return n[1] ? n : '0' + n
}
//格式化时间
function formatDate(date,time){
  var date =  date.replace(/-/g,"");
  var time = time == "0" ? "00" : (time > 10 ? time-1:'0'+(time - 1));
  return date+time;
}
// 是否为空
function isNotEmpty(s) {
    return !/^\s*$/.test(s);
}
//验证邮箱
function isEmail(s) {
    return /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/.test(s);
}
//存localstorage
function setLocalStorage(key,value){
  var order_list = "";
  wx.getStorage({
    key: key,
    success: function(res){
      console.log(this);
      this.order_list = res.data;
      console.log(order_list);
    }
  });
  wx.setStorage({
    key: key,
    data: value + order_list,
  })
}

module.exports = {
  getNowDate: getNowDate,
  formatDate: formatDate,
  isNotEmpty: isNotEmpty,
  isEmail: isEmail
}
