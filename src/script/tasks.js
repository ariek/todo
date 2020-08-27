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
  save()
}

const remove = (create) => {
  taskList = taskList.filter(item => item.create !== create)
  save()
}

const update = (create,key,value) => {
  let index = taskList.findIndex((item) => {
    return item.create === create
  })
  taskList[index][key] = value
  taskList = taskList
  save()
}

const sort = (key = 'date', orderBy = 'ASC') => {
  const sortByKey = (key,orderBy = 'ASC') => {
    taskList = taskList.sort((a,b) => ((orderBy.toUpperCase() === 'DESC') ? -1 : 1) * (Number(a[key]) - Number(b[key])))
  }
  taskList.forEach(item => {
    item.timestamp = moment(item.date || '1970-01-01').format('X')
  })
  sortByKey('create')
  if(key === 'date'){
    sortByKey('priority')
    sortByKey('timestamp', orderBy)
  } else if(key === 'priority'){
    sortByKey('timestamp')
    sortByKey('priority', orderBy)
  } else if(key === 'tag'){
    sortByKey('priority')
    sortByKey('timestamp')
    sortByKey('tag', orderBy)
  }
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
    update: update,
    sort: sort,
    save: save,
    reset: reset
  }
}

export const tasks = createTasks()
