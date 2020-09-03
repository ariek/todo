<script>
  import Input from './Input.svelte';
  import Select from './Select.svelte';
  import moment from 'moment'
  import { priorityList, dateToString, dueDateList } from '../script/config.js';
  import { taskListData, filteringCondition, tagListData } from '../script/stores.js';
  import { tasks } from '../script/tasks.js'

  const onSubmitTitleForm = (e) => {
    tasks.save()
    e.target.title.blur()
  }

  const onChangeCheckBox = (e) => {
    let create = e.target.closest('.task').getAttribute('data-create')
    let key = e.target.name
    let value = e.target.checked
    tasks.update(create,key,value)
  }

  const onChangeInputText = (e) => {
    let create = e.target.closest('.task').getAttribute('data-create')
    let key = e.target.name
    let value = e.target.value
    if(key == 'date'){
      value = {
        value: e.target.value,
        text: dateToString(e.target.value)
      }
    }
    tasks.update(create,key,value)
  }

  const onChangeSelect = (e) => {
    let create = e.target.closest('.task').getAttribute('data-create')
    let key = e.target.name
    let value = e.target.value
    let select = e.target.closest('.m-select')
    value = {
      value: select.getAttribute('data-value'),
      text: select.getAttribute('data-text')
    }
    tasks.update(create,key,value)
  }

  //tasks.reset()
</script>
<div class="c-taskList" data-duedate="{$filteringCondition.dueDate.value}" data-status="{$filteringCondition.status.value}" data-tag="{$filteringCondition.tag.value}" data-sortorder="{$filteringCondition.sortOrder.value}">
  {#each $taskListData as item}
    {#if ($filteringCondition.status.value != 'removed' && !item.removed) || ($filteringCondition.status.value == 'removed' && item.removed)}
    {#if !($filteringCondition.dueDate.value == 'over' && !item.date.value) && $filteringCondition.dueDate.condition >= item.date.value}
    {#if $filteringCondition.status.value == '' || (!item.done && $filteringCondition.status.value == 'todo') || (item.done && $filteringCondition.status.value == 'done') || (item.removed && $filteringCondition.status.value == 'removed')}
    {#if $filteringCondition.tag.value == '' || item.tag.value == $filteringCondition.tag.value}
    <div class="task" data-create="{item.create}" data-priority="{item.priority.value}" data-done="{item.done}">
      <div class="main">
        <div class="done">
          <label><input type="checkbox" name="done" checked="{item.done}" on:change="{onChangeCheckBox}"><span>完了</span></label>
        </div>
        <div class="title">
          <form action="." autocomplete="off" on:submit|preventDefault="{onSubmitTitleForm}"><input type="text" name="title" bind:value="{item.title}" on:change="{tasks.save}" on:blur="{tasks.save}"></form>
        </div>
        <div class="close">
          <button type="button" on:click="{e => {
            document.activeElement.blur()
          }}">閉じる</button>
        </div>   
      </div>
      <div class="property" tabindex="0">
        <div class="remove">
          <label class="m-input -remove"><input type="checkbox" name="removed" checked="{item.removed}" on:change="{onChangeCheckBox}"><span class="m-input_text -remove">{#if item.removed}元に戻す{:else}削除{/if}</span></label>
        </div>
        <div class="date">
          <Input type="date" name="date" data="{item.date}" onchange="{onChangeInputText}" />
        </div>
        <div class="priority">
          <Select name="priority" list="{priorityList}" selected="{item.priority}" onblur="{onChangeSelect}" />
        </div>
        <div class="tag">
          <Select name="tag" list="{$tagListData}" selected="{item.tag}" onblur="{onChangeSelect}" />
        </div>
      </div>
    </div>
    {/if}
    {/if}
    {/if}
    {/if}
  {/each}
</div>

