export type Response = {
  name: string
  order: number
  id: number
  height: number
  weight: number
  sprites: {
    front_default: string
  }
}

export async function request(name: string): Promise<Response> {
  const handshake = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`)
  const data = await handshake.json()

  return data
}
