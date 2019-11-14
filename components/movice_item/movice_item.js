// components/movice_item/movice_item.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    movices: {
      type: Object,
      value: {}
    },
    index: {
      type: Number,
      value: 0
    },
    FilmCode: {
      type: String,
      value: ''
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    acts: []
  },

  /**
   * 组件的方法列表
   */
  methods: {
    buyTicket (e) {
      var id = e.currentTarget.dataset.id;
      console.log(id)
      // wx.navigateTo({
      //   url: `/pages/views/screening/screening?id=${id}&title=${wx.getStorageSync('shopName')}`
      // })
    }
  },
  lifetimes: {
    ready: function () {
      let acts = [];
      let str = '';
      this.data.movices.act_list.forEach((item,i)=>{
        if (i === this.data.movices.act_list.length -1) {
          str += item.name;
        } else {
          str += item.name + '/';
        }
      });
      acts.push(str);
      this.setData({
        acts
      })
    }
  }
})
