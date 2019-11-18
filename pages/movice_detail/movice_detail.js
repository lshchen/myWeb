// pages/movice_detail/movice_detail.js
const utils = require('../../assets/js/util.js');
const dataTime = require('../../assets/js/dataFormat.js');
const nowTime = dataTime.formatTime(new Date(), "yyyy-MM-dd", 0);
const App = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    isShowAll: false,
    stagePhotoList: [],
    boxOfficeList: [
      // {
      //     id: 1,
      //     number: '2',
      //     title: '昨日票房排行'
      // },
      // {
      //     id: 2,
      //     number: '51132',
      //     title: '首日票房(万）'
      // },
      // {
      //     id: 3,
      //     number: '147929',
      //     title: '累计票房(万）'
      // },
    ],
    starsList: [],
  },
  /**
     * 查看文字全介绍 
     */
  showText() {
    this.setData({
      isShowAll: !this.data.isShowAll
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if (options.id) {
      this.setData({
        filmCode: options.id
      })
    }
    this.$wuxRater = App.Wux().$wuxRater;
    this.getIndexInfo();
  
   
    console.log(this.data)
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
  /**
     * 获取影片信息
     */
  getIndexInfo() {
  
    var formdata = {
      pPlanDate: nowTime || '2019-09-08'
    };

    utils.PromiseRequest("query-film-info", formdata, "POST")
      .then(res => {
        if (res.data.code == 200) {
        }
        // var data = res.data.data,
        var data = [
          {
            "FilmCode": "001104962018",
            "FilmName": "我不是药神",
            "Version": "普通",
            "Duration": "120",
            "PublishDate": "2018-11-22",
            "Publisher": "发行方403",
            "Producer": "制片人594",
            "Director": "导演88",
            "Cast": "演员563",
            "Introduction": "影片简介272",
            "video_image": "uploads\/parts\/201909\/06220414008480374.jpg",
            "score": "9.5",
            "content": "印度神油店老板程勇日子过得窝囊，店里没生意，老父病危，手术费筹不齐。前妻跟有钱人怀上了孩子，还要把他儿子的抚养权给拿走。一日，店里来了一个白血病患者，求他从印度带回一批仿制的特效药，好让买不起天价正版药的患者保住一线生机。百般不愿却走投无路的程勇，意外因此一夕翻身，平价特效药救人无数，让他被病患封为“药神”，但随着利益而来的，是一场让他的生活以及贫穷病患性命都陷入危机的多方拉锯战",
            "act_list": [
              {
                "id": "2",
                "video_management_id": "1",
                "name": "王传君",
                "image": "uploads\/parts\/201909\/06220414835356829.jpg",
                "type": "0",
                "update_uid": "0"
              }, 
              {
                "id": "5",
                "video_management_id": "1",
                "name": "周一围",
                "image": "uploads\/parts\/201909\/06220436968930425.jpg",
                "type": "0",
                "update_uid": "0"
              }
            ],
            "direct_list": [
              {
                "id": "1",
                "video_management_id": "1",
                "name": "徐峥",
                "image": "uploads\/parts\/201909\/06220413525772028.jpg",
                "type": "1",
                "update_uid": "0"
              }
            ],
            "subhead": "愿贫穷不再是生命的原罪"
          }, 
          {
            "FilmCode": "001902699799",
            "FilmName": "愤怒的小鸟",
            "Version": "普通",
            "Duration": "120",
            "PublishDate": "2019-08-26",
            "Publisher": "发行方960",
            "Producer": "制片人275",
            "Director": "导演2",
            "Cast": "演员105",
            "Introduction": "影片简介760",
            "video_image": "uploads\/parts\/201909\/06225741171195269.jpg",
            "score": "8.8",
            "content": "在一座与世隔绝的美丽小岛上，住着一群乐天知命的鸟。作为一只天生拥有黑粗眉的小鸟，“胖红”走到哪里都被嘲笑或是无视，它对在家门外踢球的捣蛋鬼毫不客气，暴脾气让它更加孤僻。不过即便是暴躁的“胖红”也有脾气相投的死党，“飞镖黄”恰克与“炸弹黑”就是它的好基友。不过易怒的胖红、亢奋的恰克和容易爆炸的炸弹总是因为各自的怪性格而不被其他的鸟接纳。当“绿猪”初到小鸟岛时，正是敏锐的“胖红”发现了蹊跷之处，然而法官大人却无视“胖红”的忠告，导致蠢萌“绿猪”诡计得逞",
            "act_list": [
              {
                "id": "77",
                "video_management_id": "3",
                "name": "杰森·苏戴奇斯",
                "image": "uploads\/parts\/201909\/06225742515799242.jpg",
                "type": "0",
                "update_uid": "0"
              }, 
              {
                "id": "78",
                "video_management_id": "3",
                "name": "乔什·盖德",
                "image": "uploads\/parts\/201909\/06225742771985143.jpg",
                "type": "0",
                "update_uid": "0"
              }, 
              {
                "id": "79",
                "video_management_id": "3",
                "name": "丹尼·麦克布耐德",
                "image": "uploads\/parts\/201909\/06225743092130398.jpg",
                "type": "0",
                "update_uid": "0"
              }
            ],
            "direct_list": [
              {
                "id": "75",
                "video_management_id": "3",
                "name": "费格尔·雷利",
                "image": "uploads\/parts\/201909\/06225742080309459.jpg",
                "type": "1",
                "update_uid": "0"
              }, 
              {
                "id": "76",
                "video_management_id": "3",
                "name": "克雷·卡提斯",
                "image": "uploads\/parts\/201909\/06225742180290659.jpg",
                "type": "1",
                "update_uid": "0"
              }
            ],
            "subhead": "改编自同名手游"
          }, 
          {
            "FilmCode": "002725661831",
            "FilmName": "小程序预售",
            "Version": "巨幕",
            "Duration": "120",
            "PublishDate": "2019-01-26",
            "Publisher": "发行方515",
            "Producer": "制片人636",
            "Director": "导演496",
            "Cast": "演员201",
            "Introduction": "影片简介463",
            "video_image": "",
            "score": "",
            "content": null,
            "act_list": [],
            "direct_list": [],
            "subhead": ""
          }
        ];
        var len = data.length;
        var scores = null;
        for (var i = 0; i < len; i++) {
          if (data[i].FilmCode == this.data.filmCode) {
            var data = data[i];
            data.video_image = wx.getStorageSync('backend_domain') + data.video_image;
            console.log(data.video_image)
            this.setData({
              details: data
            })
            scores = data.score / 2
            break;
          }
        }
        scores = scores.toFixed(1);
        this.$wuxRater.init('decimal', {
          value: scores,
          disabled: !0,
        })
      })
      .then(res => {
        var detail = this.data.details.act_list;
        var detaildir = this.data.details.direct_list;
        App.concatImgUrl(detail, 'image');
        App.concatImgUrl(detaildir, 'image');
        var arryAct = [];

        for (var i = 0; i < detaildir.length; i++) {
          arryAct.push(detaildir[i])
        }
        for (var i = 0; i < detail.length; i++) {
          arryAct.push(detail[i])
        }
        for (var i = 0; i < detail.length; i++) {
          arryAct.push(detail[i])
        }
        this.setData({
          starsList: arryAct
        })
        console.log(this.data.startsList)
      })
  }
})