// pages/mine/mine.js
import { createStoreBindings } from 'mobx-miniprogram-bindings'
import { store } from '../../assets/js/store'
import Toast from '../../miniprogram_npm/vant-weapp/toast/toast';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    isLogin: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    name: '',
    avartUrl: '../../assets/imgs/avatar.png',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.storeBindings = createStoreBindings(this, {
      store,
      fields: ['numA', 'numB', 'sum'],
      actions: ['update'],
    });
    this.storeBindings.updateStoreBindings()
    Toast("hello");
    // 查看是否授权
    let self = this;
    wx.getSetting({
      success: function (res) {
        console.log(res);
        if (res.authSetting['scope.userInfo']) {
          wx.getUserInfo({
            success: function (res) {
              //用户已经授权过
              self.setData({
                name: res.userInfo.nickName,
                isLogin: true,
                avartUrl: res.userInfo.avatarUrl
              });
            }
          })
        }
      }
    });
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
    this.storeBindings.destroyStoreBindings()
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
  // 获得电话
  // <button class="btn-weixin"  open-type="getPhoneNumber" bindgetphonenumber="getPhoneNumber" wx:if="{{ !isRegister }}">点击登录</button>
  // 用户登录
  getUserInfo: function(e) {
    let self = this;
    console.log(e.detail.userInfo)
    if (e.detail.userInfo){
      //用户按了允许授权按钮
      self.setData({
        name: e.detail.userInfo.nickName,
        isLogin: true,
        avartUrl: e.detail.userInfo.avatarUrl
      });
    } else {
      //用户按了拒绝按钮
    }
  },
  lookList () {
    console.log('aa');
    wx.navigateTo({
      url: '/components/order_list/order_list'
    })
  }
})
