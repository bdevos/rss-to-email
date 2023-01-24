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

  // This might happen if the workflow ran into an error while determining the last successful run
  throw new Error(`Unknown lastSuccess value: ${lastSuccess}`)
}
