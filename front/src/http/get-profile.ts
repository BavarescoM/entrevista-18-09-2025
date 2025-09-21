import { api } from './api-client'
interface GetProfileResponse {  
  id: string
  name: string | null
  email: string  
}

export async function getProfile() {
  const result = await api.get('me').json<GetProfileResponse>()
  return result
}
