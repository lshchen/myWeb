const App = getApp();
Component({
  behaviors: [],
  properties: {
    myProperty: {
      type: String
    }
  },
  data: {
    noMore: false
  },
  methods: {
    lower: function(){
     this.setData({
       noMore: true
     });
    }
  },
	lifetimes: {
    attached: function() {
      // 在组件实例进入页面节点树时执行
    },
    detached: function() {
      // 在组件实例被从页面节点树移除时执行
    },
  },
  pageLifetimes: {
    show: function() {
      // 页面被展示
      this.setData({
        windowHeight:App.globalData.windowHeight
      });
    },
    hide: function() {
      // 页面被隐藏
    },
    resize: function(size) {
      // 页面尺寸变化
    }
  },

})
