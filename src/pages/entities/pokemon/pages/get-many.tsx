import { useEffect, useState } from 'react'

import * as api from '../api'

export default function Component() {
  const [pokemonApiResponse, setPokemonApiResponse] = useState<api.getMany.Response | null>(null)
  useEffect(() => void getData(), [])

  async function getData() {
    const data = await api.getMany.request()
    setPokemonApiResponse(data)
  }

  return (
    <ul>
      {pokemonApiResponse?.results?.map((item) => {
        return <li key={item.name}>{item.name}</li>
      })}
    </ul>
  )
}
