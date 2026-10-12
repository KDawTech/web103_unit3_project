export const getAllEvents = async () => {
  const response = await fetch('/api/events')
  const data = await response.json()
  if (!response.ok) throw new Error(data.error || 'Request failed')
  return data
}
