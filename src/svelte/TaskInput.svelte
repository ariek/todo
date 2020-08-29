<script>
  import Input from './Input.svelte';
  import Select from './Select.svelte';
  import { priorityList, tagList, dateToString } from '../script/config.js'
  import { tasks } from '../script/tasks.js'

  let title = ''
  let date = {
    value: '',
    text: dateToString('')
  }
  let priority = priorityList[3]
  let tag = tagList[0]

  const onSubmitForm = (e) => {
    tasks.add(title,tag,priority,date)
    title = ''
  }

  const onChangeDate = () => {
    date.text = dateToString(date.value)
  }

</script>
<div class="c-taskInput{title ? ' is-active' : ''}" tabindex="0">
  <form action="." autocomplete="off" on:submit|preventDefault="{onSubmitForm}">
    <div class="title">
      <div class="titleInner"><input type="text" name="title" bind:value="{title}" placeholder="やることを入力"></div>
    </div>
    <div class="submit">
      <button type="submit" class="add">+</button>
    </div>
    <div class="property">
      <div class="date">
        <Input type="date" name="date" bind:data="{date}" onchange="{onChangeDate}" />
      </div>
      <div class="priority">
        <Select name="priority" list="{priorityList}" bind:selected="{priority}" />
      </div>
      <div class="tag">
        <Select name="tag" list="{tagList}" bind:selected="{tag}" />
      </div>
    </div>
  </form>
</div>