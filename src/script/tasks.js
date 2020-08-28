import { priorityList, tagList, dateToString } from '../script/config.js'
import { taskListData } from './stores.js';

let taskList = JSON.parse(localStorage.getItem('taskListData')) || []

const add = (title,tag,priority,date) => {
  if(!title) return false
  let now = new Date()
  let item = {
    create: now.getTime(),
    title: title,
    tag: tag || tagList[0],
    priority: priority || priorityList[3],
    date: date || {value: '', text: dateToString('')},
    repeat: false,
    done: false
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
    //taskList = taskList.sort((a,b) => ((orderBy.toUpperCase() === 'DESC') ? -1 : 1) * (Number(a[key]) - Number(b[key])))
    taskList = taskList.sort((a,b) => {
      let flg = 0
      let valA = a[key].value || a[key]
      let valB = b[key].value || b[key]
      if(valA > valB){
        flg = 1
      } else if(valA < valB){
        flg = -1
      }
      if(orderBy.toUpperCase() === 'DESC') flg * -1
      return flg
    })
  }
  if(key){
    sortByKey('create')
  }
  if(key === 'date'){
    sortByKey('priority')
    sortByKey('date', orderBy)
  } else if(key === 'priority'){
    sortByKey('date')
    sortByKey('priority', orderBy)
  } else if(key === 'tag'){
    sortByKey('priority')
    sortByKey('date')
    sortByKey('tag', orderBy)
  } else if(key === 'title'){
    sortByKey('priority')
    sortByKey('date')
    sortByKey('title', orderBy)
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
