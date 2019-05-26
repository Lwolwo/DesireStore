const desireData = require('../../data/desireData.js')
const userData = require('../../data/userData.js')

Page({

    /**
     * 页面的初始数据
     */
    data: {
        price: [2, 4, 9, 16],

        taskname: '',
        taskcount: '',

        difficulty: ['请选择难度', '简单', '普通', '中等', '困难'],
        index: 0
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {
        this.setData({
            desireData: desireData.desireData,
            userData: userData.userData
        })
    },

    buyDesire: function(e) {
        var desireid = e.currentTarget.dataset.desireid
        var self = this
        var user = this.data.userData
        var desireArray = this.data.desireData

        let index = self.findItem(desireArray, desireid)
        let item = self.data.desireData[index]
        let price = this.data.price[item.grade]


        wx.showModal({
            title: '确认',
            content: '确定使用￥' + price + ' 购买 \"' + item.title + '\" 这个欲望吗？',

            success(res) {
                if (res.confirm) {
                    if (user.money >= price) {


                        item.get++;
                        if (item.get >= item.allGet && item.allGet != -1) {
                            if (index > -1)
                                desireArray.splice(index, 1);


                        }


                        user.money -= price


                        self.setData({
                            desireData: desireArray,
                            userData: user
                        })

                    } else {
                        wx.showToast({
                            title: '￥余额不足，要继续努力才可以哦！',
                            icon: 'none',
                            duration: 1500,
                            mask: true
                        })
                    }

                }
            }
        })

    },

    clickButton() {
        var self = this
        var user = this.data.userData
        var desireArray = this.data.desireData

        wx.showActionSheet({
            itemList: ['添加', '排序'],
            success(res) {
                /* 初始化要添加的商品信息 */
                if (res.tapIndex == 0) {
                    self.setData({
                        showModal: true,
                        index: 0,
                        taskname: '',
                        taskcount: '',

                    })


                }

                if (res.tapIndex == 1) {
                    desireArray.sort(function(a, b) {
                        if (a.grade < b.grade) {
                            return -1;
                        } else {
                            return 1;
                        }
                    })

                    self.setData({
                        desireData: desireArray,

                    })
                }




            }
        })
    },

    close_mask: function() {
        this.setData({
            showModal: false
        })
    },

    bindPickerChange: function(e) {
        this.setData({
            index: e.detail.value
        })
    },

    addDesire() {
        var self = this
        let taskname = self.data.taskname;
        let taskcount = self.data.taskcount;
        let grade = self.data.index - 1;


        if (taskname.length == 0) {
            wx.showToast({
                title: '请输入商品名',
                duration: 2000,
                mask: true,
                icon: 'none'
            })
            return
        } else if (grade === -1) {
            wx.showToast({
                title: '请选择难度',
                duration: 2000,
                mask: true,
                icon: 'none'
            })
            return
        }



        if (taskcount.length == 0) {
            taskcount = -1;
        } else {
            taskcount = Number(taskcount);
            let re = /^[1-9]+[0-9]*]*$/
            if (!re.test(String(taskcount))) {
                wx.showToast({
                    title: '次数必须为正整数！',
                    duration: 2000,
                    mask: true,
                    icon: 'none'
                })
                return
            }


        }


       

        // 取到数组的最后一项的id
        let id = self.data.desireData[self.data.desireData.length - 1].desireid;

        var newdata = {
            desireid: id + 1,
            title: taskname,
            grade: grade,
            get: 0,
            allGet: taskcount
        }

        self.data.desireData.push(newdata)


        self.setData({
            desireData: self.data.desireData,
            showModal: false
        })

        wx.showToast({
            title: '添加成功',
            duration: 2000,
            mask: true,
            icon: 'success'
        })

    },

    getTaskName(e) {
        var val = e.detail.value
        this.setData({
            taskname: val
        })
    },

    getTaskCount(e) {
        var val = e.detail.value
        this.setData({
            taskcount: val
        })
    },

    findItem(array, id) {
        for (let i = 0; i < array.length; i++) {
            if (array[i].desireid == id)
                return i;
        }
        return -1;
    }


})