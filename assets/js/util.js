const app = getApp();
/**
 * 封装request请求
 */
const PromiseRequest = (url,data,method,dataType)=>{
  // 请求之前，先前之前的请求取消掉
  if (param.requestTaskKey && app.requestTasks[param.requestTaskKey]) {
    try {

      //getApp() 获取全局app对象内容
      app.requestTasks[param.requestTaskKey].abort()
    } catch (e) {
      console.error(e)
    }
  }
  url = app.getUrl(url);
  !url? '': url;
  !data? '':data;
  dataType === 'josn' ? 'application/json' : 'application/x-www-form-urlencoded';
  !method? 'POST': method;
  return new Promise((resolve,reject)=>{
    const requestTask = wx.request({
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
    if (param.requestTaskKey) {

      // 将当前请求存入全局对象里
      getApp().requestTasks[param.requestTaskKey] = requestTask
    }
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
