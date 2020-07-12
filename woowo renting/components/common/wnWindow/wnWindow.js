const app = getApp();

// wnWindow.js
Component({
  /**
   * Component properties
   */
  properties: {
    ifShowTabBar: {
      type: Boolean,
      value: false
    },
    ifCustomNav: {
      type: Boolean,
      value: true
    },
    ifShowGoToTop: {
      type: Boolean,
      value: true
    },

    extraBottomBlockHeight: {
      type: Number,
      value: 0
    },

    currentTopPos: {
      type: Number,
      value: 0,
      observer (newVal, oldVal) {
        let that = this;
        
        that.setData({
          currentTopPosition: newVal
        })
      }
    },
  },

  /**
   * Component initial data
   */
  data: {
    screenHeight: Number,
    screenWidth: Number,

    windowHeight: Number,

    navBarHeight: Number,
    tabBarHeight: Number,
    bottomGapHeight: 0,

    scrollHeight: {
      type: Number,
      value: 0
    },

    
    currentTopPosition: Number,
    scrollToThere: String
  },

  /**
   * Component methods
   */
  methods: {
    _onScrollToUpper: function() {
      let that = this;

      let timeInverval = setInterval(() => {
        if (that.data.currentTopPos > -5) {
          clearInterval(timeInverval);
          that.triggerEvent('wnScrollToUpper', {});
        }
      }, 1)
      // that.triggerEvent('wnScrollToUpper', {})
    },

    // _onScrollToLower: function () {
    //   let that = this;
    //   that.triggerEvent('wnScrollToLower', {})
    // },

    // _onScroll: function (event) {

    //   let that = this;

    //   that.setData({
    //     currentTopPos: event.detail.scrollTop,
    //     scrollHeight: event.detail.scrollHeight
    //   })
    // },

    _onGoToTop: function () {
      let that = this;

      wx.pageScrollTo({
        scrollTop: 0,
        duration: 300
      });
      // that.setData({
      //   scrollToThere: 'top'
      // })
    }

  },

  ready: function () {
    let that = this;

    let screenHeight = app.globalData.screenHeight;
    let screenWidth = app.globalData.screenWidth;
    let navBarHeight = app.globalData.statusBarHeight + app.globalData.defaultNavBarHeight;
    let tabBarHeight = app.globalData.wnTabBarHeight;
    let bottomGapHeight =  app.globalData.bottomGapHeight;

    let windowHeight = screenHeight;
    if (that.data.ifCustomNav) {
      windowHeight -= navBarHeight;
    }
    if (that.data.ifShowTabBar) {
      windowHeight -= tabBarHeight;
    }

    that.setData({
      screenHeight: screenHeight,
      screenWidth: screenWidth,
      navBarHeight: navBarHeight,
      tabBarHeight: tabBarHeight,
      windowHeight: windowHeight,
      bottomGapHeight: bottomGapHeight
    })
  }
})
