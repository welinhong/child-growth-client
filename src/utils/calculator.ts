export const getMonthsAfterBirth = (birthday: string) => {
  // 출생 후 지난 일
  const todayInSec = new Date().getTime()
  const dateStr = `${birthday.slice(0, 4)}-${birthday.slice(4, 6)}-${birthday.slice(6, 8)}`
  const birthdayInSecs = new Date(dateStr).getTime()

  const difference = todayInSec - birthdayInSecs
  const day = 1000 * 3600 * 24
  const diffInDays = Math.floor(difference / day)

  // 30으로 나누기
  return Math.floor(diffInDays / 30)
}

export const getRelativePercentile = (percentile: number) => {
  return percentile > 50 ? 100 - percentile : percentile
}
