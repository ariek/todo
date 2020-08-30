import { writable } from 'svelte/store'
import { dueDateList, statusList, tagList, sortOrderList } from '../script/config.js'

let initTaskListData = JSON.parse(localStorage.getItem('taskListData')) || []
let filteringConditionData = JSON.parse(localStorage.getItem('filteringConditionData')) || {
  'dueDate': dueDateList[0],
  'status': statusList[0],
  'tag': tagList[0],
  'sortOrder': sortOrderList[0]
}

export const filteringCondition = writable(filteringConditionData)
export const taskListData = writable(initTaskListData)
