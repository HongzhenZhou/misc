// index.js
// 获取应用实例
const app = getApp()
const xueqiu = require("../../utils/xueqiu.js")

Page({
  data: {
    disablePicker: true,
    labelPicker: "",
    indexPicker: 0,
    arrayPicker: [],
    pickerHeight: 0,
    windowHeight: 0,
    windowWidth: 0,
    os: 'android',
    scrollViewHeight: 0,
    searchString: "",
    searchDone: false,
    isgood: false,
    recStocks: []
  },
  // 事件处理函数
  bindViewTap() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad() {
    if (!xueqiu.cook) 
      xueqiu.getCook()
 
    var h = wx.getSystemInfoSync().windowHeight;
    var w = wx.getSystemInfoSync().windowWidth;
    var os = wx.getSystemInfoSync().platform;
    this.setData({
      windowWidth: w,
      windowHeight: h,
      os: os,
      scrollViewHeight: h - 80, 
    });

    if (wx.request) {
      wx.request({
        //best
        //url: "https://pastebin.com/raw/VB7k2Qan",
        url: "https://gitee.com/wo3nibaba/d1/raw/master/best",
        timeout: 5000,
        success: res => {
          if (res.statusCode == 200 && res.header["Content-Type"] && res.header["Content-Type"].indexOf("text/plain") >= 0 && res.data) {
            let sa = res.data.trim().split('\n')
            sa = sa.filter((item, index, sa) => {
              return sa.indexOf(item, 0) === index;
            });
            sa.sort();
            let sb = [];
            sa.forEach((s, i) => {
              let sc = s.split(':')

              if (sc && sc.length == 2)
                return sb.push({"sid": sc[0].trim(), "sname": sc[1].trim(), "idx": i});
            })
            
            //console.log(sb)
            if (sb && sb.length > 0)
              this.setData({recStocks: sb, isgood: true})
            else {
              wx.request({
                //daily
                url: "https://gitee.com/wo3nibaba/d1/raw/master/today",
                timeout: 5000,
                success: res => {
                  if (res.statusCode == 200 && res.header["Content-Type"] && res.header["Content-Type"].indexOf("text/plain") >= 0 && res.data && res.data.indexOf(":") > 0) {
                    let sa = res.data.trim().split('\n')
                    sa = sa.filter((item, index, sa) => {
                      return sa.indexOf(item, 0) === index;
                    });
                    sa.sort();
                    let sb = [];
                    sa.forEach((s, i) => {
                      let sc = s.split(':')

                      if (sc && sc.length == 2)
                        return sb.push({"sid": sc[0].trim(), "sname": sc[1].trim(), "idx": i});
                    })
                    
                    //console.log(sb);
                    if (sb && sb.length > 0)
                      this.setData({recStocks: sb})
                  }
                }
              }); 
            }
          } else {
            /*
            wx.request({
              //daily
              url: "https://pastebin.com/g3ND7JKK",
              timeout: 5000,
              success: res => {
                if (res.statusCode == 200 && res.header["Content-Type"] && res.header["Content-Type"].indexOf("text/plain") >= 0) {
                  let sa = res.data.trim().split('\n')
                  sa = sa.filter((item, index, sa) => {
                    return sa.indexOf(item, 0) === index;
                  });
                  sa.sort()
                  let sb = sa.map((s, i) => {
                    let sc = s.split(':')
                    return {"sid": sc[0].trim(), "sname": sc[1].trim(), "idx": i}
                  })
                  //console.log(sb)
                  if (sb && sb.length > 0)
                    this.setData({recStocks: sb})
                }
              }
            });
            */
          }
        }
      })
    }
  },
  onShow() {
  },
  doCheck(e) {
    if (e && e.detail && e.detail.value) {
      let v = e.detail.value.trim()
      this.setData({searchString: v})
    }
  },
  doSearch(e) {
    if (this.data.searchString) {
      var v = this.data.searchString.trim();
      if (v && v.length > 2 && v.search(/^([036][0-9]{5,5}|[a-zA-Z]{3,7})$/) == 0) {
        this.setData({searchDoing: true})
        xueqiu.inquireSID(v, this)
      } else {
        v = "未知代码格式：" + v;
        this.setData({searchString: ""})
        wx.showToast({title: v,
          icon: "none"
        })
      }
    }
  },
  changePick(e) {
    let v = this.arrayPicker[e.detail.value].split(' ');
    if (v && v[0] && v[0].length >= 6 && v[1]) {
      if (xueqiu.checkExclude(v[0], v[1])) 
        this.setData({searchDoing: false})
      else {
        wx.showLoading({title: '数据下载中。。。'});
        xueqiu.fetchData(v[0], this, 3)
      }
    } else 
      this.setData({searchDoing: false})
    //this.setData({disablePicker: true, arrayPicker: [], labelPicker: "", pickerHeight: 0, indexPicker: 0, searchDoing: false});
    this.setData({disablePicker: true, arrayPicker: [], labelPicker: "", pickerHeight: 0, indexPicker: 0});
    this.arrayPicker = [];
  },
  cancelPick(e) {
    this.setData({disablePicker: true, arrayPicker: [], labelPicker: "", pickerHeight: 0, indexPicker: 0, searchDoing: false});
    this.arrayPicker = [];
  },
  onClickOne(e) {
    if (e && e.currentTarget && e.currentTarget.dataset && e.currentTarget.dataset.id) {
      const sid = e.currentTarget.dataset.id;
      this.setData({searchDoing: true});
      wx.showLoading({title: '数据下载中'});
      xueqiu.fetchData(sid, this, 3);
    }
  }
})
