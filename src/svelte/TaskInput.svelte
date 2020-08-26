<script>
  import moment from 'moment'
  import { priorityList, tagList } from '../script/config.js'
  import { tasks } from '../script/tasks.js'

  let title = ''
  let date = moment().format('YYYY-MM-DD')
  let priority = 3
  let tag = ''

  let isFocused = false

  const onSubmitForm = (e) => {
    tasks.add(title,tag,priority,date)
    e.target.title.value = ''
  }

</script>
<div class="c-taskInput{(isFocused) ? ' is-focused' : ''}" tabindex="0">
  <form on:submit|preventDefault="{onSubmitForm}">
    <div class="property">
      <div class="schedule">
        <div class="m-schedule">
          <label>
            <input type="date" name="date" bind:value="{date}" pattern="[0-9]{4}-[0-9]{2}-[0-9]{2}" on:focus="{() => {isFocused = true}}"  on:blur="{() => {isFocused = false}}">
          </label>
        </div>
      </div>
      <div class="priority">
        <div class="m-priority" data-value="{priority}">
          <label>
            <select name="priority" bind:value="{priority}" on:focus="{() => {isFocused = true}}"  on:blur="{() => {isFocused = false}}">
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
            <select name="tag" bind:value="{tag}" on:focus="{() => {isFocused = true}}"  on:blur="{() => {isFocused = false}}">
              {#each tagList as item}
                <option value="{item.value}">{item.text}</option>
              {/each}
            </select>
          </label>
        </div>
      </div>
    </div>
    <div class="title">
      <div class="titleInner"><input type="text" name="title" bind:value="{title}" placeholder="やることを入力" on:focus="{() => {isFocused = true}}"  on:blur="{() => {isFocused = false}}"></div>
    </div>
    <div class="submit">
      <button type="submit" class="add">+</button>
    </div>
  </form>
</div>