<script>
  import Input from './Input.svelte';
  import Select from './Select.svelte';
  import moment from 'moment'
  import { tagList, priorityList, dateToString } from '../script/config.js';
  import { taskListData } from '../script/stores.js';
  import { tasks } from '../script/tasks.js'

  const onClickRemoveBtn = (e) => {
    let create = Number(e.target.getAttribute('data-create'))
    tasks.remove(create)
    e.target.blur()
  }

  const onSubmitTitleForm = (e) => {
    tasks.save()
    e.target.title.blur()
  }

  const getDateStr = (dateStr) => {
    const now = moment()
    const todayStr = now.format('YYYY-MM-DD')
    const tomorrowStr = now.add(1,'day').format('YYYY-MM-DD')
    let str = ''

    if(!dateStr) return false

    if(dateStr === todayStr){
      str = '今日'
    } else if(dateStr === tomorrowStr){
      str = '明日'
    } else if(moment(dateStr).isBefore(now)){
      str = '期限切れ'
    } else {
      str = moment(dateStr).format('M/D')
    }

    return str
  }

  //tasks.reset()
</script>
<div class="c-taskList">
  {#each $taskListData as item, i}
    {#if !$taskListData[i - 1] || getDateStr($taskListData[i - 1].date) !== getDateStr(item.date)}
      <!-- div class="date"><span class="dateInner">{@html getDateStr(item.date)}</span></div -->
    {/if}
    <div class="task" data-create="{item.create}" data-priority="{item.priority.value}" data-done="{item.done}">
      <div class="main">
        <label class="done"><input type="checkbox" bind:checked="{item.done}" on:change="{tasks.save}" data-create="{item.create}"><span>Done</span></label>
        <form autocomplete="off" class="title" on:submit|preventDefault="{onSubmitTitleForm}"><input type="text" name="title" bind:value="{item.title}" on:change="{tasks.save}" on:blur="{tasks.save}"></form>
        <div class="close">
          <button type="button" on:click="{e => e.target.blur()}">×</button>
        </div>   
      </div>
      <div class="property">
        <div class="remove">
          <button type="button" class="m-remove" on:click="{onClickRemoveBtn}" data-create="{item.create}">削除</button>
        </div>
        <div class="date">
          <Input type="date" name="date" bind:data="{item.date}" onchange="{() => {
            item.date.text = dateToString(item.date.value)
            tasks.save()
          }}" />
        </div>
        <div class="priority">
          <Select name="priority" list="{priorityList}" bind:selected="{item.priority}" onchange="{tasks.save}" onblur="{tasks.save}" />
        </div>
        <div class="tag">
          <Select name="tag" list="{tagList}" bind:selected="{item.tag}" onchange="{tasks.save}" onblur="{tasks.save}" />
        </div>
      </div>
    </div>
  {/each}
</div>

