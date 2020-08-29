import { writable } from 'svelte/store';

let initTaskListData = JSON.parse(localStorage.getItem('taskListData')) || []
let filteringConditionData = JSON.parse(localStorage.getItem('filteringConditionData')) || {
  'dueDate': '',
  'status': '',
  'tag': '',
  'sortOrder': ''
}

export const filteringCondition = writable(filteringConditionData)
export const taskListData = writable(initTaskListData)
