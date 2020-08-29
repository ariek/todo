<script>
  import Header from './Header.svelte';
  import TaskList from './TaskList.svelte';
  import TaskInput from './TaskInput.svelte';
</script>
<div class="l-page" on:click="{() => {}}">
  <div class="l-topBar">
    <Header />
  </div>
  <div class="l-content">
    <TaskList />
  </div>
  <div class="l-bottomBar">
    <TaskInput />
  </div>
</div>