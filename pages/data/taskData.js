/**
 * frequency: daily、weekly、weekdays、String(0-1-2-3-4-5-6)0-6对应周一到周日，用-连接
 * status: 0未完成 1完成
 * today: 0今日未完成 1今日完成
 */

var taskData = [
  {
    taskid: 0,
    title: '背单词',
    typeid: 0,
    difficulty: 0,
    time: 'long',
    frequency: 'daily',
    status: 0,
    today: 1
  },
  {
    taskid: 1,
    title: 'FE前端课程',
    typeid: 0,
    difficulty: 1,
    time: 'long',
    frequency: 'daily',
    status: 0,
    today: 0
  },
  {
    taskid: 2,
    title: '早睡早起',
    typeid: 0,
    difficulty: 1,
    time: 'long',
    frequency: 'daily',
    status: 0,
    today: 1
  },
  {
    taskid: 3,
    title: '口语练习 21天',
    typeid: 0,
    difficulty: 2,
    time: 'short',
    frequency: 'daily',
    status: 1,
    today: 0
  },
  {
    taskid: 4,
    title: '修改简历',
    typeid: 1,
    difficulty: 1,
    time: null,
    frequency: null,
    status: 0,
    today: 0
  },
  {
    taskid: 5,
    title: '打印资料',
    typeid: 1,
    difficulty: 0,
    time: null,
    frequency: null,
    status: 1,
    today: 0
  },
  {
    taskid: 6,
    title: '买草稿纸',
    typeid: 2,
    difficulty: 0,
    time: null,
    frequency: null,
    status: 0,
    today: 0
  },
  {
    taskid: 7,
    title: '学习强国',
    typeid: 2,
    difficulty: 3,
    time: null,
    frequency: null,
    status: 0,
    today: 0
  },
  {
    taskid: 8,
    title: '家教',
    typeid: 1,
    difficulty: 3,
    time: null,
    frequency: null,
    status: 0,
    today: 0
  },
]

module.exports = {
  taskData: taskData
}