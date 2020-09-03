<script>
  import Select from './Select.svelte';
  import { dueDateList, statusList, sortOrderList } from '../script/config.js'
  import { filteringCondition, tagListData } from '../script/stores.js';
  import { tasks } from '../script/tasks.js'

  const filterTasks = () => {
    localStorage.setItem('filteringConditionData',JSON.stringify($filteringCondition))    
  }

  const sortTasks = () => {
    tasks.sort($filteringCondition.sortOrder.value)
    localStorage.setItem('filteringConditionData',JSON.stringify($filteringCondition))
  }
</script>
<div class="c-header">
  <div class="nav">
    <div class="dueDate">
      <Select name="dueDate" list="{dueDateList}" bind:selected="{$filteringCondition.dueDate}" onchange="{filterTasks}" onblur="{filterTasks}" />
    </div>
    <div class="status">
      <Select name="status" list="{statusList}" bind:selected="{$filteringCondition.status}"  onchange="{filterTasks}" onblur="{filterTasks}" />
    </div>
    <div class="tag">
      <Select name="tag" list="{$tagListData}" bind:selected="{$filteringCondition.tag}" onchange="{filterTasks}" onblur="{filterTasks}" />
    </div>
    <div class="sort">
      <Select name="sort" list="{sortOrderList}" bind:selected="{$filteringCondition.sortOrder}" onchange="{sortTasks}" onblur="{sortTasks}" />
    </div>
  </div>
</div>