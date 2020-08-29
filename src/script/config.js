import moment from 'moment'

export const dayList =  ['日','月','火','水','木','金','土']

export const priorityList = [
  {value: 1, text: '優先順 1'},
  {value: 2, text: '優先順 2'},
  {value: 3, text: '優先順 3'},
  {value: 4, text: '優先順 4'}
]

export let dueDateList = [
  {value: '', text: '期間', condition: '9999-99-99'},
  {value: 'today', text: '今日中', condition: moment().format('YYYY-MM-DD')},
  {value: 'tomorrow', text: '明日中', condition: moment().add(1, 'days').format('YYYY-MM-DD')},
  {value: 'thisweek', text: '今週中', condition: moment().startOf('week').add(1, 'week').format('YYYY-MM-DD')},
  {value: 'thismonth', text: '今月中', condition: moment().startOf('month').add(1, 'months').add(-1, 'days').format('YYYY-MM-DD')},
  {value: 'thisyear', text: '今年中', condition: moment().startOf('year').add(1, 'years').add(-1, 'days').format('YYYY-MM-DD')},
  {value: 'over', text: '期限切れ', condition: moment().add(-1, 'days').format('YYYY-MM-DD')},
]

export const statusList = [
  {value: '', text: '状態'},
  {value: 'todo', text: '未完了'},
  {value: 'done', text: '完了済み'},
  {value: 'removed', text: '削除済み'},
]

export const tagList = [
  {value: '', text: 'タグ'},
  {value: '1', text: '仕事'},
  {value: '2', text: '生活'},
  {value: '3', text: '趣味'},
  {value: '4', text: 'メモ'}
]

export const sortOrderList = [
  {value: '', text: '並べ替え'},
  {value: 'date', text: '日付順'},
  {value: 'priority', text: '優先順'},
  {value: 'tag', text: 'タグ順'},
  {value: 'title', text: '名前順'},
]

/**
 * dateToString(dateStr)
 * @param {String} dateStr 'YYYY-MM-DD'
 * @return {String} 'YYYY/M/D(e)','M/D(e)','未定'
 */
export const dateToString = (dateStr = '') => {
  let returnStr = '未定'
  let thisYear = moment().format('YYYY')
  let d = moment(dateStr)
  let year = d.format('YYYY')
  let date = (thisYear != year) ? d.format('YYYY/M/D') : d.format('M/D')
  let day = dayList[d.format('e')]
  if(d.format('YYYY/M/D') == moment().format('YYYY/M/D')){
    returnStr = '今日'
  } else if(d.format('YYYY/M/D') == moment().add(1,'days').format('YYYY/M/D')){
    returnStr = '明日'
  } else if(dateStr) {
    returnStr = date + '(' + day + ')'
  }

  return returnStr
}