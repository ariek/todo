<script>
  import Input from './Input.svelte';
  import Select from './Select.svelte';
  import { priorityList, dueDateList, statusList, tagList, dateToString } from '../script/config.js'
  import { filteringCondition } from '../script/stores.js';
  import { tasks } from '../script/tasks.js'

  let title = ''
  let date = {
    value: '',
    text: dateToString('')
  }
  let priority = priorityList[3]
  let tag = tagList[0]

  const onSubmitForm = (e) => {
    if($filteringCondition.tag.value != tag.value){
      $filteringCondition.tag = tagList[0]
    }
    if($filteringCondition.status.value != 'todo'){
      $filteringCondition.status = statusList[0]
    }
    if($filteringCondition.dueDate.value >= date.value){
      $filteringCondition.dueDate = dueDateList[0]
    }
    localStorage.setItem('filteringConditionData',JSON.stringify($filteringCondition))
    tasks.add(title,tag,priority,date)
    title = ''

    setTimeout(() => {
      let element = document.querySelector('.l-content')
      element.scrollTo(0, element.scrollHeight)
    }, 1)
  }

  const onChangeDate = (e) => {
    date = {
      value: e.target.value,
      text: dateToString(e.target.value)
    }
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
        <Input type="date" name="date" data="{date}" onchange="{onChangeDate}" />
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