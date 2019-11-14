//index.js
//获取应用实例
const app = getApp()
const utils = require('../../assets/js/util.js')
const dataTime = require('../../assets/js/dataFormat.js');
const nowTime = dataTime.formatTime(new Date(), "yyyy-MM-dd", 0);
const formatLocation = dataTime.formatLocation;
Page({
  data: {
    contentTop: 64,
    shopList: [],
    addressTitle: '',
    loading: true, //加载动画
    imgUrls: [], //轮播图片
    isShade: true, //遮罩层
    flag: false,
    dataList: [] // 影片信息
  },
  onLoad: function() {
    this.setData({
      contentTop: app.globalData.navHeight
    });
    this.verifyLogin();
    this.getShopList();
  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {
    this.setData({
      addressTitle: wx.getStorageSync('shopName')
    })
    this.getIndexInfo();
    this.getBannerInfo();
  },
  /**验证登录*/
  verifyLogin() {
    utils.PromiseRequest('login', {}, 'POST').then((res) => {
      if (res.data.code == 200) {
        if (res.data.data.backend_domain) {
          wx.setStorageSync('backend_domain', res.data.data.backend_domain);
        }
      } else {
        app.infoTip(res.data.Msg);
      }
      wx.setStorageSync('flag', false);
    })
  },
  /**获得店铺列表 */
  getShopList() {
    utils.PromiseRequest('shop/index', {}, 'POST')
      .then(res => {
        if (res.data.code === 200) {
          this.setData({
            shopList: res.data.data
          })
        }
      })
      .then(res => {
        this.getLocation();
      });
  },
  /**获得位置 */
  getLocation() {
    let self = this;
    if (!wx.getStorageSync('flag')) {
      wx.getLocation({
        type: 'wgs84',
        success: function(res) {
          self.setData({
            location: formatLocation(res.longitude, res.latitude),
          });
          var formdata = {
            longitude: res.longitude,
            latitude: res.latitude
          };
          utils.PromiseRequest("get-bylocation", formdata)
            .then(res => {
              if (res.data.code == 200) {
                var datas = res.data.data[0];
                wx.setStorageSync('code', datas.theater_code);
                wx.setStorageSync('shopName', datas.theater_name);
                wx.setStorageSync('shopAddress', datas.address);
                wx.setStorageSync('longitude', datas.longitude);
                wx.setStorageSync('latitude', datas.latitude);
                wx.setStorageSync('phone', datas.phone);
                wx.setStorageSync('flag', true);
                self.setData({
                  addressTitle: datas.theater_name
                })
                self.getBannerInfo();
                self.getIndexInfo();
              }
            })
        },
        fail: (res) => {
          var shopAddrList = self.data.shopList;
          if (!wx.getStorageSync('shopName')) {
            wx.setStorageSync('code', shopAddrList[0].theater_code);
            wx.setStorageSync('shopName', shopAddrList[0].theater_name);
            wx.setStorageSync('shopAddress', shopAddrList[0].address);
            wx.setStorageSync('longitude', shopAddrList[0].longitude);
            wx.setStorageSync('latitude', shopAddrList[0].latitude);
            wx.setStorageSync('phone', shopAddrList[0].phone);
            self.setData({
              addressTitle: shopAddrList[0].theater_name
            })
            self.getBannerInfo();
            self.getIndexInfo();
          }
        }
      });
    }
  },
  /**
   * 获取轮播图
   */
  getBannerInfo() {
    // 轮播图片
    let data = {
      "banner_list": [
        {
          "image": "uploads\/parts\/201909\/06226331346509743.jpg"
        },
        {
          "image": "uploads\/parts\/201909\/06226331690476483.jpg"
        }
      ],
      "background_img": "uploads\/single\/201910\/06256059952331448.jpg",
      "FilmImg": "",
      "alert_img": {
        "img": "uploads\/single\/201911\/06259221969828903.jpg",
        "ad_status": 1,
        "activity": [
          {
            "id": "2",
            "slide_item_id": "10",
            "content": "001778018748",
            "img_url": "",
            "type": "2",
            "status": "0",
            "extend_content": ""
          },
          {
            "id": "3",
            "slide_item_id": "10",
            "content": "<p style=\"text-align: center;\">双11大放送<\/p><p style=\"text-align: center;\"><img src=\"http:\/\/cinemashop.oss-cn-beijing.aliyuncs.com\/uploads\/editor\/201910\/06257588416361757.jpg\" title=\"06257588416361757.jpg\" alt=\"160831.97920732_291X114X3.jpg\"\/><\/p><p style=\"text-align: center;\">手慢无<\/p><p style=\"text-align: center;\"><img src=\"http:\/\/cinemashop.oss-cn-beijing.aliyuncs.com\/uploads\/editor\/201910\/06257588549986461.jpg\" title=\"06257588549986461.jpg\" alt=\"timg.jpg\" width=\"291\" height=\"151\"\/><\/p><p style=\"text-align: center;\"><br\/><\/p><p style=\"text-align: center;\"><br\/><\/p>",
            "img_url": "uploads\/rights\/201910\/06256016562619947.jpg",
            "type": "1",
            "status": "0",
            "extend_content": ""
          },
          {
            "id": "4",
            "slide_item_id": "10",
            "content": "<p style=\"text-align: center;\">微信优惠<\/p><p style=\"text-align: center;\"><img src=\"http:\/\/cinemashop.oss-cn-beijing.aliyuncs.com\/uploads\/editor\/201910\/06257740189260589.jpg\" title=\"06257740189260589.jpg\" alt=\"timg (1).jpg\"\/><\/p>",
            "img_url": "",
            "type": "4",
            "status": "1",
            "extend_content": "9694218"
          }
        ]
      }
    };
    //登录背景图片
    wx.setStorageSync("urlImgBgdft", data.background_img);
    var datas = data.banner_list;
    app.concatImgUrl(datas, 'image');
    this.setData({
      imgUrls: datas,
      adInfo: data.alert_img.activity // 天窗广告
    })

    if (data.alert_img.ad_status == 0) {
      this.setData({
        isShade: true
      })
    } else if (data.alert_img.ad_status == 1) {
      this.setData({
        adPic: wx.getStorageSync('backend_domain') + data.alert_img.img, // 遮罩层图片
        isShade: wx.getStorageSync("isShade") || false,
      })
    };
    utils.PromiseRequest('slide', {})
      .then(res => {
        //登录背景图片
        wx.setStorageSync("urlImgBgdft", res.data.data.background_img)
        // 轮播图片
        var datas = res.data.data.banner_list;
        app.concatImgUrl(datas, 'image');
        this.setData({
          imgUrls: datas,
          adInfo: res.data.data.alert_img.activity // 天窗广告
        })

        if (res.data.data.alert_img.ad_status == 0) {
          this.setData({
            isShade: true
          })
        } else if (res.data.data.alert_img.ad_status == 1) {
          this.setData({
            adPic: wx.getStorageSync('backend_domain') + res.data.data.alert_img.img, // 遮罩层图片
            isShade: wx.getStorageSync("isShade") || false,
          })
        }

      })
        
  },
  /**
   * 获取主页在售影片信息
   */
  getIndexInfo() {
    var formdata = {
      pPlanDate: nowTime
    };
    utils.PromiseRequest("query-film-info", formdata, "POST")
      .then(res => {
        if (res.data.code == 30003) {
          // let datas = res.data.data;
          let datas = [
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
              "direct_list": [{
                "id": "1",
                "video_management_id": "1",
                "name": "徐峥",
                "image": "uploads\/parts\/201909\/06220413525772028.jpg",
                "type": "1",
                "update_uid": "0"
              }],
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
          app.concatImgUrl(datas, 'video_image');
          this.setData({
            dataList: datas
          })
        }
      })
      .then(res => {
        this.setData({
          loading: false
        })
      })
  },
  /**隐藏遮罩层 */
  hideShade () {
    this.setData({
      isShade: true
    })
    wx.setStorageSync("isShade", this.data.isShade);
  },
  /**遮罩层广告 */
  gotoAd () {
    var adInfo = this.data.adInfo;
    var targetInfo = null;

    for (var i = 0; i < adInfo.length; i++) {
      if (adInfo[i].status == "1") {
        targetInfo = adInfo[i];
      }
    }

    wx.setStorageSync("targetInfo", targetInfo);

    this.setData({
      isShade: true
    })

    wx.setStorageSync("isShade", this.data.isShade);

    if (targetInfo.type == "1") {
      wx.navigateTo({
        url: `../richText/richText`
      })
    } else if (targetInfo.type == "2") {
      wx.navigateTo({
        url: `/pages/views/screening/screening?id=${targetInfo.content}`
      })
    } else if (targetInfo.type == "4") {
      wx.navigateTo({
        url: `../views/richText/richText?id=${targetInfo.extend_content}`
      })
    } else {
      return;
    }
  },
  /**获得影片详情 */
  godetail(e) {
    var id = e.currentTarget.dataset.id;
    console.log('aassss')
    wx.navigateTo({
      url: `/pages/movice_detail/movice_detail?id=${id}`
    })
  }
})