<script>
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
      <div>
        <label class="m-select--dueDate" data-value="{dueDate.value}">
          <span>{dueDate.text}</span>
          <select name="dueDate" bind:value="{dueDate}">
            {#each dueDateList as item}
              <option value="{item}">{item.text}</option>
            {/each}
          </select>
        </label>
      </div>
    </div>
    <div class="status">
      <div>
        <label class="m-select--status" data-value="{status.value}">
          <span>{status.text}</span>
          <select name="status" bind:value="{status}">
            {#each statusList as item}
              <option value="{item}">{item.text}</option>
            {/each}
          </select>
        </label>
      </div>
    </div>
    <div class="tag">
      <div>
        <label class="m-select--tag" data-value="{tag.value}">
          <span>{tag.text}</span>
          <select name="tag" bind:value="{tag}">
            {#each tagList as item}
              <option value="{item}">{item.text}</option>
            {/each}
          </select>
        </label>
      </div>
    </div>
    <div class="sort">
      <div>
        <label for="sort" class="m-select--sort" data-value="{sortOrder.value}">
          <span>{sortOrder.text}</span>
          <select name="sort" bind:value="{sortOrder}" on:change="{sortTasks}" on:focus="{sortTasks}" on:blur="{sortTasks}">
            {#each sortOrderList as item}
              <option value="{item}">{item.text}</option>
            {/each}
          </select>
        </label>
      </div>
    </div>
  </div>
</div>