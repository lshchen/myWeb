// pages/richText/richText.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.showNavigationBarLoading();
    wx.setNavigationBarTitle({
      title: '去你奶奶个腿的。。。'
    })
    // wx.setNavigationBarColor()
    wx.hideHomeButton();
    // wx.setTopBarText({
    //   text: 'hello, world!'
    // })
    let requestTask = wx.request({
      url: '/login',
      type: 'post',
      dataType: 'json',
      success (res) {
        console.log(res);
      }
    });
    console.log(requestTask);
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
    this.openSocket();
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
  //WebSocket 连接
  openSocket() {
    wx.onSocketOpen(() => {
      console.log('WebSocket 已连接')
      this.setData({
        socketStatus: 'connected',
        waitingResponse: false
      })
      // this.sendMessage();
    })
    //WebSocket 断开
    wx.onSocketClose(() => {
      console.log('WebSocket 已断开')
      this.setData({
        socketStatus: 'closed'
      })
    })

    wx.onSocketError(error => {
      // showModal('发生错误', JSON.stringify(error))
      console.error('socket error:', error)
      this.setData({
        // loading: false
      })
    })

    // 监听服务器推送消息
    wx.onSocketMessage(message => {
      // showSuccess('收到信道消息')
      console.log('收到信道消息1=====' + message.data);
      var msgData = JSON.parse(message.data);
      console.log('收到信道消息2=====' + msgData.Error);
      this.setData({
        getSocketMessage: msgData
      })
    })

    // 打开信道
    wx.connectSocket({
      url: 'ws://140.143.53.58:2346',
      header: {},
      success: (res) => {
        console.log(res)
      },
      fail: (res) => {
        console.log(res)
      },
    })
  },

  closeSocket() {
    if (this.data.socketStatus === 'connected') {
      wx.closeSocket({
        success: () => {
          // showSuccess('Socket已断开')
          console.log('Socket已断开')
          this.setData({
            socketStatus: 'closed'
          })
        }
      })
    }
  },

  sendMessage() {
    if (this.data.socketStatus === 'connected') {
      console.log('发送了消息')
      wx.sendSocketMessage({
        data: 'Hello'
      })
    }
  },
  //指纹验证
  startAuth() {
    const startSoterAuthentication = () => {
      wx.startSoterAuthentication({
        requestAuthModes: ['fingerPrint'],
        challenge: this.data._codeInfo,
        // challenge: 'test',
        authContent: '验证指纹',
        success: (res) => {
          // wx.showToast({
          //     title: '验证成功'
          // })
          wx.showLoading({
            title: '支付中...',
            mask: true,
          })

          wx.request({
            url: app.getUrl("pay"),
            data: app.getData({
              amount: this.data.amount,
              order_id: this.data.order_id,
              is_finger: 1,
              mchequ_id: this.data.mchequ_id
            }),
            method: 'POST',
            header: app.getHeader(),
            success: (res) => {
              if (res.data.Error == 0) {
                wx.hideLoading();
                wx.showToast({
                  title: res.data.Msg,
                  mask: true,
                })
                this.setData({
                  isShow: false,
                  isShow1: false,
                  isShow2: false,
                })
                setTimeout(function () {
                  wx.navigateTo({
                    url: `../payment_success/payment_success?amount=${res.data.amount}&type=${res.data.bit_name}`
                  })
                }, 2000)
              } else {
                wx.hideLoading();
                wx.showToast({
                  title: res.data.Msg,
                  icon: 'none',
                  mask: true,
                })
              }
            }
          })

        },
        fail: (err) => {
          console.error(err)
          wx.showToast({
            title: '指纹验证失败',
            icon: 'none'
          })
        }
      })
    }

    const checkIsEnrolled = () => {
      wx.checkIsSoterEnrolledInDevice({
        checkAuthMode: 'fingerPrint',
        success: (res) => {
          console.log(res)
          if (parseInt(res.isEnrolled) <= 0) {
            wx.showModal({
              title: '错误',
              content: '您暂未录入指纹信息，请录入后重试',
              showCancel: false
            })
            return
          }
          startSoterAuthentication();
        },
        fail: (err) => {
          console.error(err)
        }
      })
    }

    wx.checkIsSupportSoterAuthentication({
      success: (res) => {
        console.log(res)
        checkIsEnrolled();
      },
      fail: (err) => {
        console.error(err)
        wx.showModal({
          title: '错误',
          content: '您的设备不支持指纹识别',
          showCancel: false
        })
      }
    })
  },
})
