<script>
  import moment from 'moment'
  import { priorityList, tagList } from '../script/config.js'
  import { tasks } from '../script/tasks.js'

  let title = ''
  let date = moment().format('YYYY-MM-DD')
  let priority = 3
  let tag = ''

  const onSubmitForm = (e) => {
    tasks.add(title,tag,priority,date)
    e.target.title.value = ''
  }

</script>
<div class="c-taskInput" tabindex="0">
  <form autocomplete="off" on:submit|preventDefault="{onSubmitForm}">
    <div class="title">
      <div class="titleInner"><input type="text" name="title" bind:value="{title}" placeholder="やることを入力"></div>
    </div>
    <div class="submit">
      <button type="submit" class="add">+</button>
    </div>
    <div class="property">
      <div class="schedule">
        <div class="m-schedule">
          <label>
            <input type="date" name="date" bind:value="{date}" pattern="[0-9]{4}-[0-9]{2}-[0-9]{2}">
          </label>
        </div>
      </div>
      <div class="priority">
        <div class="m-priority" data-value="{priority}">
          <label>
            <select name="priority" bind:value="{priority}">
              {#each priorityList as item}
                <option value="{item.value}">{item.text}</option>
              {/each}
            </select>
          </label>
        </div>
      </div>
      <div class="tag">
        <div class="m-tag">
          <label>
            <select name="tag" bind:value="{tag}">
              {#each tagList as item}
                <option value="{item.value}">{item.text}</option>
              {/each}
            </select>
          </label>
        </div>
      </div>
    </div>
  </form>
</div>