import { writable } from 'svelte/store';

let initTaskListData = JSON.parse(localStorage.getItem('taskListData')) || []

export const taskListData = writable(initTaskListData)
