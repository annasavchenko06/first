import type { List } from '~/shared/api'

export type ResponseData = List<{ name: string }>

export type RequestData = { offset: number; limit: number }

export async function request(offset: number, limit: number): Promise<ResponseData> {
  const handshake = await fetch(`https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`)
  const data = await handshake.json()

  return data
}
