const app = getApp()
Page({
  data: {
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    src: "", 
    baidutoken: "",
    base64: "",
    msg: ""
  },

  takePhoto() {
    var that = this;
    //拍照
    const ctx = wx.createCameraContext()
    ctx.takePhoto({
      quality: 'high',
      success: (res) => {
        this.setData({
          src: res.tempImagePath //获取图片
        })
        //图片base64编码
        wx.getFileSystemManager().readFile({
          filePath: this.data.src, //选择图片返回的相对路径
          encoding: 'base64', //编码格式
          success: res => { //成功的回调
            this.setData({
              base64: res.data
            })
          }
        })
        that.uploadPhoto();
      } //拍照成功结束
    }) //调用相机结束

    //失败尝试
    wx.showToast({
      title: '请重试',
      icon: 'loading',
      duration: 500
    })
  },

  //拍照人脸识别
  takePhotoFaceCheck() {
    var that = this;
    //拍照
    const ctx = wx.createCameraContext()
    ctx.takePhoto({
      quality: 'high',
      success: (res) => {
        this.setData({
          src: res.tempImagePath //获取图片
        })
        //图片base64编码
        wx.getFileSystemManager().readFile({
          filePath: this.data.src, //选择图片返回的相对路径
          encoding: 'base64', //编码格式
          success: res => { //成功的回调
            this.setData({
              base64: res.data
            })
          }
        })
        that.validPhoto();
      } //成功结束
    }) //调用结束

    //失败尝试
    wx.showToast({
      title: '请重试',
      icon: 'loading',
      duration: 500
    })
  },

  error(e) {
    console.log(e.detail)
  },
   //人脸搜索
   takePhotoFaceSearch() {
    var that = this;
    //拍照
    const ctx = wx.createCameraContext()
    ctx.takePhoto({
      quality: 'high',
      success: (res) => {
        this.setData({
          src: res.tempImagePath //获取图片
        })
        //图片base64编码
        wx.getFileSystemManager().readFile({
          filePath: this.data.src, //选择图片返回的相对路径
          encoding: 'base64', //编码格式
          success: res => { //成功的回调
            this.setData({
              base64: res.data
            })
          }
        })
        that.searchPhoto();
      } //成功结束
    }) //相机结束

    //失败尝试
    wx.showToast({
      title: '请重试',
      icon: 'loading',
      duration: 500
    })
  },

  uploadPhoto() {
    var that = this;
    //上传人脸进行注册
    wx.request({
      url: '上传人脸函数注册的地址',
      method: 'POST',
      data: {
        image: this.data.base64,
        image_type: 'BASE64'
      },
      header: {
        'Content-Type': 'application/json'
      },
      success(res) {
        that.setData({
          msg: res.data.error_msg
        })
        if (that.data.msg == "pic not has face") {
          wx.showToast({
            title: '未捕获到人脸',
            icon: 'error',
          })
        }
        if (that.data.msg == 'SUCCESS') {
          wx.showToast({
            title: '人脸录入成功',
            icon: 'success',
          })
        }
      }
    })
  },


  validPhoto() {
    var that = this;
    //识别人脸
    wx.request({
      url: '识别人脸函数地址',
      method: 'POST',
      data: {
        image: this.data.base64,
        image_type: 'BASE64'
      },
      header: {
        'Content-Type': 'application/json'
      },
      success(res) {
        that.setData({
          msg: res.data.error_msg
        })

        //做成功判断
        if (that.data.msg == "pic not has face") {
          wx.showToast({
            title: '未捕获到人脸',
            icon: 'error',
          })
        }
        if (that.data.msg == 'SUCCESS') {
          if(res.data.result.face_list[0].face_probability>0.7){
            wx.showToast({
              title: '人脸识别成功',
              icon: 'success',
            })
          }else{
            wx.showToast({
              title: '人脸识别失败',
              icon: 'error',
            })
          }
        }
      }
    });
  },

  searchPhoto() {
    var that = this;
    //上传人脸进行 比对
    wx.request({
      url: '人脸搜索函数地址',
      method: 'POST',
      data: {
        image: this.data.base64,
        image_type: 'BASE64'
      },
      header: {
        'Content-Type': 'application/json'
      },
      success(res) {
        that.setData({
          msg: res.data.error_msg
        })

        //做成功判断
        if (that.data.msg == "pic not has face") {
          wx.showToast({
            title: '未捕获到人脸',
            icon: 'error',
          })
        }
        if (that.data.msg == 'SUCCESS') {
          if(res.data.result.user_list[0].score>80){
            wx.showToast({
              title: '人脸搜索成功',
              icon: 'success',
            })
          }else{
            wx.showToast({
              title: '人脸搜索失败',
              icon: 'error',
            })
          }
        }
      }
    });
  },
})
