<script>
  import moment from 'moment'
  import { tagList, priorityList } from '../script/config.js';
  import { taskListData } from '../script/stores.js';
  import { tasks } from '../script/tasks.js'

  const onClickRemoveBtn = (e) => {
    let create = Number(e.target.getAttribute('data-create'))
    tasks.remove(create)
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
    <div class="task{item.property ? ' shows-property' : ''}" data-create="{item.create}" data-priority="{item.priority}" data-done="{item.done}">
      <div class="main">
        <label class="done"><input type="checkbox" bind:checked="{item.done}" on:change="{tasks.save}" data-create="{item.create}"><span>Done</span></label>
        <form class="title" on:submit|preventDefault="{onSubmitTitleForm}"><input type="text" name="title" bind:value="{item.title}" on:change="{tasks.save}" on:blur="{tasks.save}"></form>
        <div class="menu">
          <button type="button" class="m-menu" on:click="{
            (event) => {
              item.property = !item.property
              tasks.save()
            }
          }"></button>
        </div>     
      </div>
      <div class="property">
        <div class="remove">
          <button type="button" class="m-remove" on:click="{onClickRemoveBtn}" data-create="{item.create}">削除</button>
        </div>
        <div class="schedule">
          <div class="m-schedule" data-value="{item.date}">
            <label>
              <input type="date" name="date" bind:value="{item.date}" on:change="{tasks.save}" on:blur="{tasks.save}" pattern="[0-9]{4}-[0-9]{2}-[0-9]{2}">
            </label>
          </div>
        </div>
        <div class="priority">
          <div class="m-priority" data-value="{item.priority}">
            <label>
              <select name="priority" bind:value="{item.priority}" on:change="{tasks.save}" on:blur="{tasks.save}">
                {#each priorityList as priorityListItem}
                  <option value="{priorityListItem.value}">{priorityListItem.text}</option>
                {/each}
              </select>
            </label>
          </div>
        </div>
        <div class="tag">
          <div class="m-tag" data-value="{item.tag}">
            <label>
              <select bind:value="{item.tag}" on:change="{tasks.save}" on:blur="{tasks.save}">
                {#each tagList as tagListItem}
                  <option value="{tagListItem.value}">{tagListItem.text}</option>
                {/each}
              </select>
            </label>
          </div>
        </div>
      </div>
    </div>
  {/each}
</div>

