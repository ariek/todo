import { writable } from 'svelte/store'
import { dueDateList, statusList, defaultTag, sortOrderList } from '../script/config.js'

let initTaskListData = JSON.parse(localStorage.getItem('taskListData')) || []
//let initTagListData = JSON.parse(localStorage.getItem('taskListData')) || defaultTag
let initTagListData = JSON.parse(localStorage.getItem('tagListData')) || [defaultTag]
let initFilteringConditionData = JSON.parse(localStorage.getItem('filteringConditionData')) || {
  'dueDate': dueDateList[0],
  'status': statusList[0],
  'tag': defaultTag,
  'sortOrder': sortOrderList[0]
}

export const taskListData = writable(initTaskListData)
export const tagListData = writable(initTagListData)
export const filteringCondition = writable(initFilteringConditionData)