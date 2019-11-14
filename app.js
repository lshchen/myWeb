//app.js
import apiUrl from './assets/js/API.js'
import Wux from 'components/wux'
App({
  onLaunch: function () {
   wx.setBackgroundFetchToken({
     token: 'aa'
   });
    wx.onBackgroundFetchData({
      success: function () {
        console.log('bb');
      }
    });
    /**
     * 获得头部胶囊的高度、宽度
     */
    let clientRect = wx.getMenuButtonBoundingClientRect();
    wx.getSystemInfo({
      success: (res)=> {
        let statusBarHeight = res.statusBarHeight;
        let navTop = clientRect.top; //胶囊按钮与顶部的距离
        let navHeight = statusBarHeight + clientRect.height + (clientRect.top - statusBarHeight) * 2; //导航高度
        this.globalData.navHeight = navHeight;
        this.globalData.navTop = navTop;
        this.globalData.windowHeight = res.windowHeight;
      },
      fail: function(err){
        this.infoTip(err.Msg);
      }
    });
    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              this.globalData.userInfo = res.userInfo

              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            }
          })
        }
      }
    });
  },
  globalData: {
    userInfo: null
  },
  /**获取url */
  getUrl (key) {
    return apiUrl.getUrl(key);
  },
  /**信息提示 */
  infoTip(Msg) {
    wx.showTabBar({
      title: Msg || '数据异常',
      icon: 'none',
      mask: true
    })
  },
  /**
     * 图片地址拼接函数  arry(一维数组)
     */
  concatImgUrl(arry, key) {
    if (arry.length > 0) {
      for (var i = 0; i < arry.length; i++) {
        arry[i][key] = wx.getStorageSync('backend_domain') + arry[i][key];
      }
    }
    return arry;
  },
  Wux: Wux,
})
