<script>
  import Select from './Select.svelte';
  import { dueDateList, statusList, tagList, sortOrderList } from '../script/config.js'
  import { filteringCondition } from '../script/stores.js';
  import { tasks } from '../script/tasks.js'

  let selected = {
    dueDate: dueDateList.filter(item => item.value == $filteringCondition.dueDate)[0],
    status: statusList.filter(item => item.value == $filteringCondition.status)[0],
    tag: tagList.filter(item => item.value == $filteringCondition.tag)[0],
    sortOrder: sortOrderList.filter(item => item.value == $filteringCondition.sortOrder)[0]
  }


  const filterTasks = (key) => {
    $filteringCondition[key] = selected[key].value
    localStorage.setItem('filteringConditionData',JSON.stringify($filteringCondition))    
  }

  const sortTasks = () => {
    tasks.sort(selected.sortOrder.value)
    $filteringCondition['sortOrder'] = selected['sortOrder'].value
    localStorage.setItem('filteringConditionData',JSON.stringify($filteringCondition))
  }
</script>
<div class="c-header">
  <div class="nav">
    <div class="dueDate">
      <Select name="dueDate" list="{dueDateList}" bind:selected="{selected.dueDate}" 
      onchange="{() => {
        filterTasks('dueDate')
      }}"
      onblur="{() => {
        filterTasks('dueDate')
      }}" />
    </div>
    <div class="status">
      <Select name="status" list="{statusList}" bind:selected="{selected.status}" 
      onchange="{() => {
        filterTasks('status')
      }}"
      onblur="{() => {
        filterTasks('status')
      }}" />
    </div>
    <div class="tag">
      <Select name="tag" list="{tagList}" bind:selected="{selected.tag}" 
      onchange="{() => {
        filterTasks('tag')
      }}"
      onblur="{() => {
        filterTasks('tag')
      }}" />
    </div>
    <div class="sort">
      <Select name="sort" list="{sortOrderList}" bind:selected="{selected.sortOrder}" onchange="{sortTasks}" onblur="{sortTasks}" />
    </div>
  </div>
</div>