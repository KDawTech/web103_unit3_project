export const formatEventDate = (value) => {
  const date = new Date(value)
  return new Intl.DateTimeFormat('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
    hour: 'numeric',
    minute: '2-digit'
  }).format(date)
}

export const countdownText = (value) => {
  const diff = new Date(value).getTime() - Date.now()
  const abs = Math.abs(diff)

  const days = Math.floor(abs / 86400000)
  const hours = Math.floor((abs % 86400000) / 3600000)
  const minutes = Math.floor((abs % 3600000) / 60000)

  if (diff < 0) {
    if (days > 0) return `Ended ${days}d ago`
    if (hours > 0) return `Ended ${hours}h ago`
    return `Ended ${minutes}m ago`
  }

  if (days > 0) return `Starts in ${days}d ${hours}h`
  if (hours > 0) return `Starts in ${hours}h ${minutes}m`
  return `Starts in ${minutes}m`
}
