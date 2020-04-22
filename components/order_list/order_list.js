// components/order_list/order_list.js
const computedBehavior = require('miniprogram-computed')
import { storeBindingsBehavior } from 'mobx-miniprogram-bindings'
import {store} from '../../assets/js/store'
Component({
  behaviors: [computedBehavior,storeBindingsBehavior],
  /**
   * 组件的属性列表
   */
  properties: {

  },
  storeBindings: {
    store,
    fields: {
      numA: () => store.numA,
      numB: (store) => store.numB,
      sum: 'sum'
    },
    actions: {
      buttonTap: 'update'
    },
  },
  /**
   * 组件的初始数据
   */
  data: {
    a: 1,
    b: 1,
  },
  computed: {
    sum(data) {
      // 注意： computed 函数中不能访问 this ，只有 data 对象可供访问
      // 这个函数的返回值会被设置到 this.data.sum 字段中
      return data.a + data.b
    },
  },
  watch: {
    'a, b': function(a, b) {
      this.setData({
        sum: a + b
      })
    },
  },
  /**
   * 组件的方法列表
   */
  methods: {
    learn () {
      wx.navigateTo({
        url: '/pages/richText/richText',
      });
    },
    onTap() {
      console.log(this.data.sum)
      this.setData({
        a: this.data.b,
        b: this.data.a + this.data.b,
      })
      // 立刻更新
      this.updateStoreBindings()
    },
    message1 (data){
      console.log(data)
    },
    downLoadAndUpdate (updateManager) {
      var self = this
      wx.showLoading();
      //静默下载更新小程序新版本
      updateManager.onUpdateReady(function () {
        wx.hideLoading();
        //新的版本已经下载好，调用 applyUpdate 应用新版本并重启
        updateManager.applyUpdate()
      })
      updateManager.onUpdateFailed(function () {
        wx.hideLoading();
        // 新的版本下载失败
        wx.showModal({
          title: '已经有新版本了哟~',
          content: '新版本已经上线啦~，请您删除当前小程序，重新搜索打开哟~',
          confirmColor: '#DBB864',
        })
      })
    }
  },
  pageLifetimes: {
    show: function() {
      // 页面被展示
      const eventChannel = this.getOpenerEventChannel();
      eventChannel.emit('acceptDataFromOpenedPage', {data: 'test...'});
      eventChannel.emit('someEvent', {data: 'test...1'});
      eventChannel.on('message',this.message1);
      let updateManager = wx.getUpdateManager();
      updateManager.onCheckForUpdate(function (res){
        console.log(res);
        if (res.hasUpdate){
          wx.showModal({
            title: '更新提示',
            content: '检测到新版本，是否下载新版本并重启小程序？',
            cancelColor: '#999',
            confirmColor: '#DBB864',
            success: function (res) {
              if (res.confirm) {
                //2. 用户确定下载更新小程序，小程序下载及更新静默进行
                self.downLoadAndUpdate(updateManager)
              } else if (res.cancel) {
                //用户点击取消按钮的处理，如果需要强制更新，则给出二次弹窗，如果不需要，则这里的代码都可以删掉了
                wx.showModal({
                  title: '温馨提示~',
                  content: '本次版本更新涉及到新的功能添加，旧版本无法正常访问的哦~',
                  cancelColor: '#999',
                  showCancel: false, //隐藏取消按钮
                  confirmColor: '#DBB864',
                  confirmText: "确定更新", //只保留确定更新按钮
                  success: function (res) {
                    if (res.confirm) {
                      //下载新版本，并重新应用
                      self.downLoadAndUpdate(updateManager)
                    }
                  }
                })
              }
            }
          })
        }
      })
      wx.showActionSheet({
        itemList: ['A', 'B', 'C'],
        success (res) {
          console.log(res.tapIndex)
        },
        fail (res) {
          console.log(res.errMsg)
        }
      })
    },
    hide: function() {
      // 页面被隐藏
    },
    resize: function(size) {
      // 页面尺寸变化
    }
  }
})
