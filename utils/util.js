/**
 * 封装request请求
 */
const PromiseRequest = (url,data,method,dataType)=>{
  !url? '': url;
  !data? '':data;
  dataType === 'josn' ? 'application/json' : 'application/x-www-form-urlencoded';
  !method? 'POST': method;
  return new Promise((resolve,reject)=>{
    wx.request({
      url: url,
      data: data,
      method: method,
      header: {
        'content-type': dataType
      },
      success: res => { //服务器返回数据
        if (res.statusCode == 200) {
          resolve(res);
        } else { //返回错误提示信息
          // app.tipInfo();
        }
      },
      error: function (e) {
        reject('网络出错');
      }
    })
  }).catch(function (reason) {
    console.log('catch:', reason);
  });
};
 
/**
 *格式化日期 
 */
const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}
/**
 * 补0操作
 */
const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}

module.exports = {
  formatTime: formatTime,
  PromiseRequest: PromiseRequest
}
