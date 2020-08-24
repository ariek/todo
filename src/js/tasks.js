import { taskListData } from './stores.js';

let taskList = JSON.parse(localStorage.getItem('taskListData')) || []

const add = (title,priority,schedule) => {
  if(!title) return false
  let now = new Date()
  let item = {
    create: now.getTime(),
    title: title,
    priority: priority || 0,
    schedule: schedule || 0,
    repeat: false,
    done: false
  }
  taskList.push(item)
  sort()
}

const remove = (create) => {
  taskList = taskList.filter(item => item.create !== create)
  sort()
}

const sort = () => {    
  taskList = taskList.sort((a,b) => a.create - b.create)
  taskList = taskList.sort((a,b) => a.priority - b.priority)
  taskList = taskList.sort((a,b) => a.schedule - b.schedule)
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
