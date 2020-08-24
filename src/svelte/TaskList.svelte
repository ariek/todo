<script>
  import { scheduleList, priorityList } from '../js/config.js';
  import { taskListData } from '../js/stores.js';
  import { tasks } from '../js/tasks.js'

  const onClickRemoveBtn = (e) => {
    let create = Number(event.target.getAttribute('data-create'))
    tasks.remove(create)
  }

  const onSubmitTitleForm = (e) => {
    tasks.save()
    e.target.title.blur()
  }

  //tasks.reset()
</script>
<div class="c-taskList">
  {#each $taskListData as item, i}
    {#if !$taskListData[i - 1] || $taskListData[i - 1].schedule !== item.schedule}
      <div class="until"><span>{scheduleList[item.schedule]}</span></div>
    {/if}
    <div class="task{(item.done) ? ' is-done' : ''}">
      <label class="done"><input type="checkbox" bind:checked="{item.done}" on:change="{tasks.save}" data-create="{item.create}"><span>Done</span></label>
      <form class="title" on:submit|preventDefault="{onSubmitTitleForm}"><input type="text" name="title" bind:value="{item.title}" on:change="{tasks.save}"></form>
      <div class="m-priority" data-value="{item.priority}">
        <select bind:value="{item.priority}" on:change="{tasks.sort}">
          {#each priorityList as priorityListItem,j}
            <option value="{j}">{priorityListItem}</option>
          {/each}
        </select>
      </div>
      <div class="m-schedule" data-value="{item.schedule}">
        <select bind:value="{item.schedule}" on:change="{tasks.sort}">
          {#each scheduleList as scheduleListItem,j}
            <option value="{j}">{scheduleListItem}</option>
          {/each}
        </select>
      </div>
      <button type="button" class="m-remove" on:click="{onClickRemoveBtn}" data-create="{item.create}">-</button>
    </div>
  {/each}
</div>

