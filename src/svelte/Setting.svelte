<script>
  import { defaultTag } from '../script/config.js'
  import { tagListData } from '../script/stores.js'
  import { tasks } from '../script/tasks.js'

  let tagList = JSON.parse(localStorage.getItem('tagListData')) || [defaultTag]
  
  let isOpen = false

  const addTag = (e) => {
    let value = new Date().getTime()
    let text = e.target.text.value
    tagList.push({
      value: value,
      text: text
    })
    saveTag()
    e.target.text.value = ''
  }
  const removeTag = (e) => {
    let value = Number(e.target.closest('.item').getAttribute('data-value'))
    tagList = tagList.filter(item => item.value != value)
    tasks.updateTag({value: value, text:''})
    saveTag()
  }
  const updateTag = (e) => {
    let value = Number(e.target.closest('.item').getAttribute('data-value'))
    let text = e.target.value || e.target.text.value
    tagList.forEach((item,i) => {
      if(item.value == value){
        tagList[i].text = text
        tasks.updateTag(tagList[i])
      }
    })    
    saveTag()
  }
  const saveTag = () => {
    localStorage.setItem('tagListData',JSON.stringify(tagList))
    tagListData.set(tagList)
  }
</script>
<div class="c-setting">
  {#if isOpen}
  <div class="content">
    <div class="header">設定</div>    
    <div class="tag">
      <h2>タグの編集</h2>
      <ul class="list">
        {#each $tagListData as tag}
          {#if tag.value != ''}
          <li class="item" data-value="{tag.value}">
            <form action="." autocomplete="off" on:submit|preventDefault="{updateTag}">
              <div class="text">
                <input type="text" name="text" value="{tag.text}"  on:change="{updateTag}">
              </div>
            </form>
            <div class="remove"><button type="button" on:click="{removeTag}" class="m-btn -remove">削除</button></div>
          </li>
          {/if}
        {/each}
      </ul>
      <div class="add">
        <form action="." autocomplete="off" on:submit|preventDefault="{addTag}">
          <div class="text">
            <input type="text" name="text" placeholder="タグを入力">
          </div>
          <div class="submit">
            <button type="submit" class="m-btn -add">追加</button>
          </div>
        </form>
      </div>
    </div>
  </div>
  {/if}
  <div class="nav">
    <button on:click="{() => isOpen = !isOpen}">設定</button>
  </div>
</div>