<script>
  export let name = ''
  export let list = []
  export let selected = {}
  export let onchange = () => {}
  export let onfocus = () => {}
  export let onblur = () => {}
</script>
<label class="m-select -{name}" data-value="{selected.value}">
  <span class="m-select_text -{name}">{selected.text}</span>
  <select name="{name}" bind:value="{selected}" on:change="{onchange}" on:focus="{onfocus}" on:blur="{onblur}">
    {#each list as item}
      <option value="{item}">{item.text}</option>
    {/each}
  </select>
</label>