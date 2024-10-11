export type Response = {
  name: string
  id: number
}

export async function request(name: string): Promise<Response> {
  const handshake = await fetch(`https://pokeapi.co/api/v2/pokemon-habitat/${name}`)
  const data = await handshake.json()

  return data
}
