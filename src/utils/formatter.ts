const dateFormatter = new Intl.DateTimeFormat('en-US', {
  dateStyle: 'long',
  timeStyle: 'short',
})

export const formatDate = (date: string) => dateFormatter.format(new Date(date))
