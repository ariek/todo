<script>
  import { scheduleList, priorityList } from '../js/config.js';
  import { tasks } from '../js/tasks.js'
  
  const onSubmitForm = (e) => {
    let title = e.target.title.value
    let priority = Number(e.target.priority.value) || 0
    let schedule = Number(e.target.schedule.value) || 0
    tasks.add(title,priority,schedule)
    e.target.title.value = ''
  }

</script>
<form class="c-taskInput" on:submit|preventDefault="{onSubmitForm}">
  <div class="title">
    <div class="titleInner"><input type="text" name="title"></div>
  </div>
  <div class="priority m-priority">
    <select name="priority">
      {#each priorityList as item,index}
        {#if index == 1}
        <option value="{index}" selected>{item}</option>
        {:else}
        <option value="{index}">{item}</option>
        {/if}
      {/each}
    </select>
  </div>
  <div class="schedule m-schedule">
    <select name="schedule">
      {#each scheduleList as item,index}
        <option value="{index}">{item}</option>
      {/each}
    </select>
  </div>
  <button type="submit" class="add">+</button>
</form>