import dayjs, { Dayjs } from 'dayjs'

export const parseIntro = (initialRun: boolean, itemCount: number, from: Dayjs) => {
  if (initialRun) {
    return `First edition with ${itemCount} updates`
  }

  const hours = dayjs().diff(from, 'hours')
  const days = Math.floor(hours / 24)

  if (days === 1) {
    return `${itemCount} updates since yesterday`
  } else if (days > 0) {
    return `${itemCount} updates in the last ${days} days`
  } else if (hours === 1) {
    return `${itemCount} updates in the last hour`
  }
  return `${itemCount} updates in the last ${hours} hours`
}
