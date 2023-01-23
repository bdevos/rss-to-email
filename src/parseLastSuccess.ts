import dayjs from 'dayjs'

export const parseLastSuccess = (lastSuccess: string | undefined) => {
  if (!lastSuccess || lastSuccess.trim() === '') {
    return {
      from: dayjs().subtract(7, 'days'),
      initialRun: true,
    }
  }

  const parsed = dayjs(lastSuccess)

  if (parsed.isValid()) {
    return {
      from: parsed,
      initialRun: false,
    }
  }

  throw new Error(`Unknown lastSuccess value: ${lastSuccess}`)
}
