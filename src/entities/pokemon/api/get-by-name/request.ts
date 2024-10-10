import type { List } from '~/shared/api'

export type Response = List<{ name: string }>

export async function request(name: string): Promise<Response> {
  const handshake = await fetch(`https://pokeapi.co/api/v2/pokemon:${name}`)
  const data = await handshake.json()

  return data
}
