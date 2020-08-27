<script>
  export let name = ''
  export let type = ''
  export let data = {}
  export let onchange = () => {}
  export let onfocus = () => {}
  export let onblur = () => {}
</script>
{#if type == 'date'}
<label class="m-input -{name}">
  <span class="m-input_text -{name}">{data.text}</span>
  <input type="date" name="{name}" bind:value="{data.value}" pattern="[0-9]{4}-[0-9]{2}-[0-9]{2}" on:change="{onchange}" on:focus="{onfocus}" on:blur="{onblur}">
</label>
{:else if type == 'text'}
<label class="m-input -{name}">
  <span class="m-input_text -{name}">{data.text}</span>
  <input type="text" name="{name}" bind:value="{data.value}" on:change="{onchange}" on:focus="{onfocus}" on:blur="{onblur}">
</label>
{/if}