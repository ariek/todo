<script>
  import Header from './Header.svelte';
  import TaskList from './TaskList.svelte';
  import TaskInput from './TaskInput.svelte';
  import Setting from './Setting.svelte';
</script>
<div class="l-page is-large" on:click="{() => {}}">
  <div class="l-topBar">
    <Header />
  </div>
  <div class="l-content">
    <TaskList />
  </div>
  <div class="l-bottomBar">
    <TaskInput />
  </div>
  <div class="l-dialog">
    <Setting />
  </div>
</div>