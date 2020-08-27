<script>
  import Select from './Select.svelte';
  import { dueDateList, statusList, tagList, sortOrderList } from '../script/config.js'
  import { tasks } from '../script/tasks.js'

  let dueDate = dueDateList[1]
  let status = statusList[1]
  let tag = tagList[0]
  let sortOrder = sortOrderList[0]

  const sortTasks = () => {
    tasks.sort(sortOrder.value)
  }
</script>
<div class="c-header">
  <div class="nav">
    <div class="dueDate">
      <Select name="dueDate" list="{dueDateList}" bind:selected="{dueDate}" />
    </div>
    <div class="status">
      <Select name="status" list="{statusList}" bind:selected="{status}" />
    </div>
    <div class="tag">
      <Select name="tag" list="{tagList}" bind:selected="{tag}" />
    </div>
    <div class="sort">
      <Select name="sort" list="{sortOrderList}" bind:selected="{sortOrder}" onchange="{sortTasks}" onblur="{sortTasks}" />
    </div>
  </div>
</div>