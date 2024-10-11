import type { List } from '~/shared/api'

export type ResponseData = List<{ name: string }>

export async function request(): Promise<ResponseData> {
  const handshake = await fetch(`https://pokeapi.co/api/v2/pokemon-habitat`)
  const data = await handshake.json()

  return data
}
