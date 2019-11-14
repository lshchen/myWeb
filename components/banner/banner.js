// components/banner/banner.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    bannerList: {
      type: Array,
      value: []
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    swiperCurrent: 0 //当前轮播图片下标
  },

  /**
   * 组件的方法列表
   */
  methods: {
    changeIndex (options) {
      this.setData({
        swiperCurrent: options.detail.current
      });
    }
  }
})
