Page({

    /**
     * 页面的初始数据
     */
    data: {
        navigation: [{
                typeid: 0,
                title: '日常任务'
            },
            {
                typeid: 1,
                title: '主线任务'
            },
            {
                typeid: 2,
                title: '支线任务'
            }
        ],
        currentbar: 0,
        reward: [2, 4, 6, 8],
        difficultyClasses: ['item-difficulty--diff1', 'item-difficulty--diff2', 'item-difficulty--diff3', 'item-difficulty--diff4'],
        taskData: [],
        todaycheckedShow: true,
        checkedShow: true
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {
        this.setData({
            userData: wx.getStorageSync('userData'),
            taskData: wx.getStorageSync('taskData')
        })
    },
    // 数据监听器
    watch: {
        currentbar: function(newVal) {
            switch (newVal) {
                case 0:
                    this.setData({
                        reward: [2, 4, 6, 8]
                    });
                    break
                case 1:
                    this.setData({
                        reward: [2, 4, 6, 8]
                    });
                    break
                case 2:
                    this.setData({
                        reward: [1, 3, 5, 7]
                    });
                    break
            }
        }
    },
    // 计算属性
    computed: {
        todaycheckedNum: {
            require: ['taskData', 'currentbar'],
            fn({
                taskData,
                currentbar
            }) {
                var result = 0
                taskData.map(function(item) {
                    if (item.typeid === currentbar && !item.status && item.today) {
                        result++
                    }
                })
                return result
            }
        },
        checkedNum: {
            require: ['taskData', 'currentbar'],
            fn({
                taskData,
                currentbar
            }) {
                var result = 0
                taskData.map(function(item) {
                    if (item.typeid === currentbar && item.status) {
                        result++
                    }
                })
                return result
            }
        },
        expiredNum: {
            require: ['taskData', 'currentbar'],
            fn({
                taskData,
                currentbar
            }) {
                var result = 0
                taskData.forEach(item => {
                    if (item.typeid === currentbar && item.failed && !item.status) {
                        result++
                    }
                })
                return result
            }
        }
    },
    todaycheckedShowChange: function() {
        this.setData({
            todaycheckedShow: !this.data.todaycheckedShow
        })
    },
    checkedShowChange: function() {
        this.setData({
            checkedShow: !this.data.checkedShow
        })
    },
    // 切换tab事件
    changeTab: function(e) {
        var typeid = e.currentTarget.dataset.typeid
        this.setData({
            currentbar: typeid
        })
    },
    // 复选框选中事件
    checkboxChange: function(e) {
        var taskid = e.currentTarget.dataset.taskid
        var typeid = this.data.taskData[taskid].typeid
        var user = this.data.userData
        // 主线任务和支线任务都是一次性任务
        if (typeid === 1 || typeid === 2) {
            // TODO 修改任务的状态
            this.data.taskData[taskid].status = !this.data.taskData[taskid].status
            this.data.taskData[taskid].status ? this.data.checkedNum++ : this.data.checkedNum-- // 手动更新“已完成”数量，触发视图渲染
                if (this.data.taskData[taskid].failed) {
                    this.data.taskData[taskid].status ? this.data.expiredNum-- : this.data.expiredNum++ // 手动更新“已过期”数量，触发视图渲染
                }
            var money = 0
            if (this.data.taskData[taskid].status) {
                money = this.data.reward[this.data.taskData[taskid].difficulty]
            } else {
                money = -this.data.reward[this.data.taskData[taskid].difficulty]
            }
            user.money += money
            this.setData({
                taskData: this.data.taskData,
                checkedNum: this.data.checkedNum,
                expiredNum: this.data.expiredNum,
                userData: user
            })
            // 修改对应Storage
            wx.setStorageSync('taskData', this.data.taskData)
            wx.setStorageSync('userData', this.data.userData)
        }
        // 日常任务需要计算次数
        else {
            // TODO 修改任务状态
            var task = this.data.taskData[taskid]
            var user = this.data.userData
            var money = 0
            // 任务处于未完成情况，并且今天未check
            if (!task.today && !task.status) {
                task.today = !task.today
                task.checkcount++
                    // 今天check后，任务达成
                    if (task.checkcount === task.count) {
                        task.status = !task.status
                        this.data.checkedNum++
                            // 短期任务完成需要一次性加￥
                            money = this.data.reward[task.difficulty] * task.count
                    }
                // 今天check后，任务还未完成
                else {
                    this.data.todaycheckedNum++
                        if (task.time === 'long') {
                            money = this.data.reward[task.difficulty]
                        }
                }
            }
            // 任务处于未完成情况，但是今天已经check
            else if (task.today && !task.status) {
                task.today = !task.today
                task.checkcount--
                    this.data.todaycheckedNum--
                    if (task.time === 'long') {
                        money = -this.data.reward[task.difficulty]
                    }
            }
            // 任务已完成，且是今天刚刚完成的
            else if (task.today && task.status) {
                task.status = !task.status
                this.data.checkedNum--
                    task.today = !task.today
                task.checkcount--
                    money = -this.data.reward[task.difficulty] * task.count
            }
            // 任务已完成，但是不是今天完成的
            else {
                task.status = !task.status
                this.data.checkedNum--
                    money = -this.data.reward[task.difficulty] * task.count
            }
            this.data.taskData[taskid] = task
            user.money += money
            this.setData({
                taskData: this.data.taskData,
                checkedNum: this.data.checkedNum,
                expiredNum: this.data.expiredNum,
                userData: user
            })
            // 修改对应Storage
            wx.setStorageSync('taskData', this.data.taskData)
            wx.setStorageSync('userData', this.data.userData)
        }
    },
    clickButton() {
        this.setData({
            showModal: true,
        })
    },
    close_mask: function() {
        this.setData({
            showModal: false
        })
    }

})