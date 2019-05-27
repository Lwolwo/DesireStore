var taskData = [
  {
    // 通用字段
    title: '背单词',         // string，任务描述
    typeid: 0,              // number，任务类型，0日常，1主线，2支线
    difficulty: 0,          // number，任务难度，0简单，1普通，2中等，3困难
    due: '2019-05-27',      // string，任务截止时间，使用new Date().Format('yyyy-MM-dd')初始化
    count: 1,               // number, 主线支线默认1次，日常任务默认无限次0，可选填次数
    checkcount: 0,          // number, 完成次数，默认0

    // 以下字段创建自动初始化
    lastwork: null,         // string，上次完成时间，初始化null

    // 以下属性用于判断任务的状态，有没有赋初值不影响后续使用
    status: {
      finished: false,      // 任务是否完成，初始化false
      expired: false,       // 任务是否过期，初始化false
      today: false,         // 今日是否完成，初始化false
    }
  },
  {
    "_openid": 'oCdYN5KMbzXZqRIRn-Jp4OoA-Vfk',
    title: '背单词',
    typeid: 0,
    difficulty: 0,
    due: null,
    count: 1,
    checkcount: 0,
    lastwork: null,

    status: {
      finished: false,
      expired: false,
      today: false,
    }
  },
  {
    taskid: 1,
    title: 'FE前端课程',
    typeid: 0,
    difficulty: 1,
    time: 'short',
    frequency: 'daily',
    status: 0,
    today: 0,
    failed: 0,
    overtime: '2019-05-24',
    count: 20,
    checkcount: 19
  },
  {
    taskid: 2,
    title: '早睡早起',
    typeid: 0,
    difficulty: 1,
    time: 'long',
    frequency: 'daily',
    status: 0,
    today: 1,
    failed: 0,
    overtime: null,
    count: null,
    checkcount: 2
  },
  {
    taskid: 3,
    title: '口语练习 21天',
    typeid: 0,
    difficulty: 2,
    time: 'short',
    frequency: 'daily',
    status: 1,
    today: 0,
    failed: 0,
    overtime: '2019-05-28',
    count: 21,
    checkcount: 16
  },
  {
    taskid: 4,
    title: '修改简历',
    typeid: 1,
    difficulty: 1,
    time: null,
    frequency: null,
    status: 0,
    today: 0,
    failed: 0,
    overtime: '2019-05-25',
    count: null,
    checkcount: 0
  },
  {
    taskid: 5,
    title: '打印资料',
    typeid: 1,
    difficulty: 0,
    time: null,
    frequency: null,
    status: 1,
    today: 0,
    failed: 0,
    overtime: '2019-05-23',
    count: null,
    checkcount: 1
  },
  {
    taskid: 6,
    title: '买草稿纸',
    typeid: 2,
    difficulty: 0,
    time: null,
    frequency: null,
    status: 0,
    today: 0,
    failed: 0,
    overtime: '2019-05-24',
    count: null,
    checkcount: 0
  },
  {
    taskid: 7,
    title: '学习强国',
    typeid: 2,
    difficulty: 3,
    time: null,
    frequency: null,
    status: 0,
    today: 0,
    failed: 0,
    overtime: '2019-05-24',
    count: null,
    checkcount: 0
  },
  {
    taskid: 8,
    title: '家教',
    typeid: 1,
    difficulty: 3,
    time: null,
    frequency: null,
    status: 0,
    today: 0,
    failed: 0,
    overtime: '2019-05-25',
    count: null,
    checkcount: 0
  },
]

module.exports = {
  taskData: taskData
}