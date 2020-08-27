import moment from 'moment'

export const dayList =  ['日','月','火','水','木','金','土']

export const priorityList = [
  {value: 1, text: '優先順 1'},
  {value: 2, text: '優先順 2'},
  {value: 3, text: '優先順 3'},
  {value: 4, text: '優先順 4'}
]

export const dueDateList = [
  {value: '', text: '期間'},
  {value: 'today', text: '今日まで'},
  {value: 'thisweek', text: '今週まで'},
  {value: 'thisweek', text: '今月まで'},
  {value: 'thisyear', text: '今年まで'},
  {value: 'over', text: '期限切れ'},
]

export const statusList = [
  {value: '', text: '状態'},
  {value: 'todo', text: '未完了'},
  {value: 'done', text: '完了済み'},
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
  let thisYear = moment().format('YYYY')
  let d = moment(dateStr)
  let year = d.format('YYYY')
  let date = (thisYear != year) ? d.format('YYYY/M/D') : d.format('M/D')
  let day = dayList[d.format('e')]
  return (dateStr) ? date + '(' + day + ')' : '未定'
}