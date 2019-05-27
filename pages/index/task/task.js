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
        taskData: [],
        checkedShow: true,
        animationData: {},
        today: '',

        addTaskData: {
            taskname: '',
            taskcount: '',
            indexType: 0,
            type: ['请选择任务类型', '日常任务', '主线任务', '支线任务'],
            indexDiff: 0,
            difficulty: ['请选择任务难度', '简单', '普通', '中等', '困难'],
            due: '',
            checkcount: 0,
            lastwork: null,

            status: {
                finished: false,
                expired: false,
                today: false,
            }


        }
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {
        this.setData({
            today: (new Date()).Format('yyyy-MM-dd'),
            userData: wx.getStorageSync('userData'),
            taskData: wx.getStorageSync('taskData')
        })
    },
    onShow: function() {
        const animation = wx.createAnimation({
            duration: 1000,
            timingFunction: 'ease',
        })

        this.animation = animation
    },
    // 数据监听器
    watch: {
        currentbar: function(newVal) {
            switch (newVal) {
                case 0:
                    this.setData({
                        reward: [2, 4, 6, 8]
                    });
                    break // 日常任务
                case 1:
                    this.setData({
                        reward: [2, 4, 6, 8]
                    });
                    break // 主线任务
                case 2:
                    this.setData({
                        reward: [1, 3, 5, 7]
                    });
                    break // 支线任务
            }
        }
    },
    // 计算属性
    computed: {
        expiredNum: {
            require: ['taskData', 'currentbar'],
            fn({
                taskData,
                currentbar
            }) {
                var result = 0
                taskData.forEach(item => {
                    if (item.typeid === currentbar && item.status.expired) {
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
                taskData.forEach(item => {
                    if (item.typeid === currentbar && item.status.finished) {
                        result++
                    }
                })
                return result
            }
        }
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
        var taskindex = e.currentTarget.dataset.taskindex
        var user = this.data.userData
        var task = this.data.taskData
        var item = task[taskindex]

        // 处理任务次数逻辑
        item.checkcount++
            item.status.checked = true
        if (item.checkcount === item.count) {
            item.status.finished = true
        }
        task[taskindex] = item

        // 处理任务奖励逻辑
        var money = 0
        money = this.data.reward[item.difficulty]
        user.money += money

        // 修改数据，渲染列表
        this.setData({
            userData: user,
            taskData: task
        })

        // 处理复选框动画
        this.animation.opacity(0.2).step()
        this.setData({
            animationData: this.animation.export()
        })

        // 修改对应Storage
        wx.setStorageSync('taskData', this.data.taskData)
        wx.setStorageSync('userData', this.data.userData)
    },

    clickButton() {
        var data = {
            taskname: '',
            taskcount: '',
            indexType: 0,
            type: ['请选择任务类型', '日常任务', '主线任务', '支线任务'],
            indexDiff: 0,
            difficulty: ['请选择任务难度', '简单', '普通', '中等', '困难'],
            due: '',
            checkcount: 0,
            lastwork: null,

            status: {
                finished: false,
                expired: false,
                today: false,
            }
        }

        this.setData({
            addTaskData: data,
            showModal: true,
        })
    },

    close_mask: function() {
        this.setData({
            showModal: false
        })
    },

    getTaskName(e) {
        var val = e.detail.value
        this.setData({
            'addTaskData.taskname': val
        })

    },

    getTaskCount(e) {
        var val = e.detail.value
        this.setData({
            'addTaskData.taskcount': val
        })
    },

    bindPickerChangeType(e) {
        var str = 'addTaskData.indexType'
        this.setData({
            [str]: e.detail.value
        })

    },

    bindPickerChangeDiff(e) {
        var str = 'addTaskData.indexDiff'
        this.setData({
            [str]: e.detail.value
        })
    },

    bindDateChange(e) {
        var str = 'addTaskData.due'
        this.setData({
            [str]: e.detail.value
        })
    },

    addTask() {
        var data = this.data.addTaskData
        console.log(data)


        // 错误检测
        if (data.taskname.length == 0) {
            wx.showToast({
                title: '请输入任务名',
                duration: 2000,
                mask: true,
                icon: 'none'
            })
            return
        } else if (data.indexType === 0) {
            wx.showToast({
                title: '请选择任务类型',
                duration: 2000,
                mask: true,
                icon: 'none'
            })
            return
        } else if (data.indexDiff === 0) {
            wx.showToast({
                title: '请选择任务难度',
                duration: 2000,
                mask: true,
                icon: 'none'
            })
            return
        }

        console.log('taskcount', data.taskcount)

        if (data.taskcount.length === 0) {
            if (data.indexType === 0) {
                data.taskcount = 0;
            } else if (data.indexType === 1 || data.indexType === 2) {
                data.taskcount = 1;
            }

        } else {
            data.taskcount = Number(data.taskcount);
            let re = /^[1-9]+[0-9]*]*$/
            if (!re.test(String(data.taskcount))) {
                wx.showToast({
                    title: '次数必须为正整数！',
                    duration: 2000,
                    mask: true,
                    icon: 'none'
                })
                return
            }
        }

        if (data.due.length == 0) {
            data.due = null;
        }

        // 构造新任务对象
        var newtask = {
          title: data.taskname,
          typeid: data.indexType - 1,
          difficulty: data.indexDiff - 1,
          due: data.due,
          count: data.taskcount,
          checkcount: 0,

          lastwork: null,
          status: {
              finished: false,
              expired: false,
              today: false,
          }
        }

        const db = wx.cloud.database()
        db.collection('taskData1').add({
            data: {

                title: data.taskname,
                typeid: data.indexType - 1,
                difficulty: data.indexDiff - 1,
                due: data.due,
                count: data.taskcount,
                checkcount: 0,

                lastwork: null,
                status: {
                    finished: false,
                    expired: false,
                    today: false,
                }

            },
            success: res => {
                // 在返回结果中会包含新创建的记录的 _id
                console.log('[数据库] [新增记录] 成功，记录 _id: ', res._id)
                wx.showToast({
                    title: '新增任务成功',
                })
                
                // 新任务对象加上_id字段
                newtask._id = res._id
                var taskData = this.data.taskData
                taskData.push(newtask)

                // 渲染视图层
                this.setData({
                  taskData: taskData,
                  showModal: false
                })
                wx.setStorageSync('taskData', this.data.taskData)
            },
            fail: err => {
                wx.showToast({
                    icon: 'none',
                    title: '新增任务失败'
                })
                console.error('[数据库] [新增记录] 失败：', err)
                return
            }
        })



    }


})