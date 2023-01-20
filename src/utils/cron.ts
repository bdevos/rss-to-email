import cronParser from 'cron-parser'

export const cronToEarliestDate = (cron?: string) => {
  if (!cron) {
    return
  }

  const parsedCron = cronParser.parseExpression(cron)

  if (!parsedCron.hasPrev() || !parsedCron.hasNext()) {
    return
  }

  const diff = Math.abs(parsedCron.prev().toDate().getTime() - parsedCron.next().toDate().getTime())

  return new Date(new Date().getTime() - diff)
}
