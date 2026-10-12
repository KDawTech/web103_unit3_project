const request = async (url) => {
  const response = await fetch(url)
  const data = await response.json()
  if (!response.ok) throw new Error(data.error || 'Request failed')
  return data
}

export const getAllLocations = () => request('/api/locations')
export const getLocation = (id) => request(`/api/locations/${id}`)
export const getLocationEvents = (id) => request(`/api/locations/${id}/events`)
