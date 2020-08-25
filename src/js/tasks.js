import moment from 'moment'
import { taskListData } from './stores.js';

let taskList = JSON.parse(localStorage.getItem('taskListData')) || []

const add = (title,tag,priority,date) => {
  if(!title) return false
  let now = new Date()
  let item = {
    create: now.getTime(),
    title: title,
    tag: tag || '',
    priority: priority || 0,
    date: date || '1970-01-01',
    timestamp: moment(date || '1970-01-01').format('X'),
    repeat: false,
    done: false,
    property: false
  }
  taskList.push(item)
  sort()
}

const remove = (create) => {
  taskList = taskList.filter(item => item.create !== create)
  sort()
}

const sort = () => {
  taskList.forEach(item => {
    item.timestamp = moment(item.date || '1970-01-01').format('X')
  })
  taskList = taskList.sort((a,b) => a.create - b.create)
  taskList = taskList.sort((a,b) => b.priority - a.priority)
  taskList = taskList.sort((a,b) => a.timestamp - b.timestamp)
  save()
}

const save = () => {
  localStorage.setItem('taskListData',JSON.stringify(taskList))
  taskListData.set(taskList)
}

const reset = () => {
  localStorage.clear()
  taskListData.set([])
}

const createTasks = () => {
  return {
    add: add,
    remove: remove,
    sort: sort,
    save: save,
    reset: reset
  }
}

export const tasks = createTasks()
