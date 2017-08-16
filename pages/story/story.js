Page({
  data: {
    current_story: '',
    page_id: '0',
    textdata: "put value",
  },
  onLoad: function (e) {
    console.log('I am a story page, I have just loaded with an id from the last page', e.id)
    console.log(e)
    var story_id = e.story_id;
    var page_id = e.page_id;
    this.setData({
      current_story: story_id
    })
    var that = this;
    wx.getSystemInfo({
      success: function (res) {
        that.setData({
          winWidth: res.windowWidth,
          winHeight: res.windowHeight
        });
      }
    });
    var url = 'http://localhost:3000/stories/' + story_id + '/pages/' + page_id;
    wx.request({
      url: url,
      method: 'GET',
      header: { 'content-type': 'application/json' },
      success: function (res) {
        that.setData({ textdata: res.data });
      },
      fail: function (res) {
      },
    });
  },
  A: function (e) {
    if (this.data.textdata.links.length < 1) {
      return;
    }

    var nextPageId = this.data.textdata.links[0].nextPageId
    var url = '../story/story?story_id=' + this.data.current_story + '&page_id=' + nextPageId
    // var url = 'http://localhost:3000' + this.data.textdata.links[0].path
    
    wx.redirectTo({
      url: url
    })
  },
  B: function (e) {
    if(this.data.textdata.links.length < 2){
      return;
    }
    var nextPageId = this.data.textdata.links[1].nextPageId

    var url = '../story/story?story_id=' + this.data.current_story + '&page_id=' + nextPageId

    wx.redirectTo({
      url: url
    })
  }
})