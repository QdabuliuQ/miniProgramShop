export const getTime = (time) => {
  let dateTime = new Date(time)
  let year = dateTime.getFullYear();  // 获取年份
  let mouth = dateTime.getMonth() + 1;  // 获取月份
  let day = dateTime.getDate();  // 获取日期
  return year + '-'+ mouth + '-' + day
}